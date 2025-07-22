// apps/api/src/routers/v1/admin.router.ts
import express from "express";
import { AdminController } from "../../controllers/admin.controller";
import { DoctorController } from "../../controllers/doctor.controller";
import { ClinicController } from "../../controllers/clinic.controller";

const adminRouter = express.Router();

// Admin Authentication
adminRouter.post("/", AdminController.createAdmin);
adminRouter.post("/login", AdminController.loginAdmin);
adminRouter.get("/:id", AdminController.getAdmin);
adminRouter.put("/:id", AdminController.updateAdmin);

// Doctor Management (Admin only)
adminRouter.post("/doctors", DoctorController.createDoctor);
adminRouter.get("/doctors", DoctorController.getDoctors);
adminRouter.get("/doctors/stats", DoctorController.getDoctorStats);
adminRouter.get("/doctors/search", DoctorController.searchDoctors);
adminRouter.get("/doctors/:id", DoctorController.getDoctor);
adminRouter.put("/doctors/:id", DoctorController.updateDoctor);
adminRouter.patch("/doctors/:id/status", DoctorController.updateDoctorStatus);
adminRouter.patch("/doctors/:id/verify", DoctorController.verifyDoctor);
adminRouter.delete("/doctors/:id", DoctorController.deleteDoctor);
adminRouter.patch("/doctors/bulk-update", DoctorController.bulkUpdateDoctors);

// Clinic Management (Admin only)
adminRouter.post("/clinics", ClinicController.createClinic);
adminRouter.get("/clinics", ClinicController.getClinics);
adminRouter.get("/clinics/stats", ClinicController.getClinicStats);
adminRouter.get("/clinics/with-doctors", ClinicController.getClinicsWithDoctors);
adminRouter.get("/clinics/search", ClinicController.searchClinics);
adminRouter.get("/clinics/:id", ClinicController.getClinic);
adminRouter.put("/clinics/:id", ClinicController.updateClinic);
adminRouter.delete("/clinics/:id", ClinicController.deleteClinic);
adminRouter.patch("/clinics/bulk-update", ClinicController.bulkUpdateClinics);

export default adminRouter;