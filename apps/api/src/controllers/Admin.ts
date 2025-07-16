import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services/admin.service";
import logger from "../config/logger.config";
import { IAdmin } from "../models";

export class AdminController {
  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const adminData: Partial<IAdmin> = req.body;
      const admin = await AdminService.createAdmin(adminData);
      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: admin,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
      // next(error);
    }
  }
  static async loginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await AdminService.loginAdmin(
        req.body.email,
        req.body.password
      );
      res.status(201).json({
        success: true,
        message: "logged in successfully",
        token: token,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
      // next(error);
    }
  }
  static async getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await AdminService.getAdminById(req.params.id);
      res.status(200).json({
        success: true,

        data: admin,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
      // next(error);
    }
  }
}
