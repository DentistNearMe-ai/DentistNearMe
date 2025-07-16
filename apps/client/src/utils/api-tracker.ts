// src/utils/api-tracker.ts
interface ApiCallRecord {
  timestamp: number;
  type: 'autocomplete_init' | 'place_changed' | 'script_load' | 'suggestion_request';
  details?: any;
}

class ApiTracker {
  private calls: ApiCallRecord[] = [];
  private listeners: ((stats: ApiStats) => void)[] = [];

  // Track an API call
  trackCall(type: ApiCallRecord['type'], details?: any) {
    const record: ApiCallRecord = {
      timestamp: Date.now(),
      type,
      details
    };
    
    this.calls.push(record);
    console.log(`📊 API Call: ${type}`, details);
    
    // Notify listeners
    this.notifyListeners();
    
    // Store in localStorage for persistence
    this.saveToStorage();
  }

  // Get statistics
  getStats(): ApiStats {
    const now = Date.now();
    const lastHour = now - (60 * 60 * 1000);
    const today = now - (24 * 60 * 60 * 1000);

    const callsLastHour = this.calls.filter(call => call.timestamp > lastHour);
    const callsToday = this.calls.filter(call => call.timestamp > today);

    const byType = this.calls.reduce((acc, call) => {
      acc[call.type] = (acc[call.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.calls.length,
      lastHour: callsLastHour.length,
      today: callsToday.length,
      byType,
      lastCall: this.calls[this.calls.length - 1]?.timestamp || 0,
      avgPerHour: callsToday.length / 24
    };
  }

  // Get detailed call history
  getCallHistory(limit = 50): ApiCallRecord[] {
    return this.calls.slice(-limit).reverse();
  }

  // Subscribe to stats updates
  subscribe(callback: (stats: ApiStats) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Clear all tracking data
  clear() {
    this.calls = [];
    this.notifyListeners();
    localStorage.removeItem('google_places_api_calls');
  }

  // Export data
  exportData() {
    return {
      calls: this.calls,
      stats: this.getStats(),
      exportedAt: Date.now()
    };
  }

  private notifyListeners() {
    const stats = this.getStats();
    this.listeners.forEach(callback => callback(stats));
  }

  private saveToStorage() {
    try {
      // Keep only last 1000 calls to prevent storage bloat
      const recentCalls = this.calls.slice(-1000);
      localStorage.setItem('google_places_api_calls', JSON.stringify(recentCalls));
    } catch (error) {
      console.warn('Failed to save API call data to localStorage:', error);
    }
  }

  // Load from storage on init
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('google_places_api_calls');
      if (stored) {
        this.calls = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load API call data from localStorage:', error);
    }
  }
}

interface ApiStats {
  total: number;
  lastHour: number;
  today: number;
  byType: Record<string, number>;
  lastCall: number;
  avgPerHour: number;
}

// Global tracker instance
export const apiTracker = new ApiTracker();

// Load existing data on import
if (typeof window !== 'undefined') {
  apiTracker.loadFromStorage();
}

// Helper hook for Qwik components
export const useApiTracker = () => {
  return {
    track: apiTracker.trackCall.bind(apiTracker),
    getStats: apiTracker.getStats.bind(apiTracker),
    getHistory: apiTracker.getCallHistory.bind(apiTracker),
    subscribe: apiTracker.subscribe.bind(apiTracker),
    clear: apiTracker.clear.bind(apiTracker),
    export: apiTracker.exportData.bind(apiTracker)
  };
};