import express from "express";
import { AdminController } from "../../controllers/admin.controller";

const adminRouter = express.Router();
adminRouter.post("/", AdminController.createAdmin);

adminRouter.get("/:id", AdminController.getAdmin);
adminRouter.put("/:id", AdminController.updateAdmin);
// adminRouter.delete('/:id', AdminController.deleteAdmin);
export default adminRouter;
