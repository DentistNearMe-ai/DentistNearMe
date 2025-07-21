import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dentist Search Results | DentalCare+',
  description: 'Browse verified dentists in your area that match your preferences.',
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Perfect Dentists for You</h1>
        {/* Add your dentist results component here */}
        <div className="text-center text-gray-600">
          <p>Dentist results will be displayed here based on questionnaire responses.</p>
        </div>
      </div>
    </div>
  );
}