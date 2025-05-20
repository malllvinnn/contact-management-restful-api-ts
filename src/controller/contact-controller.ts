import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateContactRequest, UpdateContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";

export class ContactController {

  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const response = await ContactService.create(req.user!, request);
      res.status(201).json({
        success: true,
        message: "Contact Created successfully",
        data: response
      })
    } catch (error) {
    next(error)
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await ContactService.get(req.user!, id);
      res.status(200).json({
        success: true,
        message: "Contact Retrieved successfully",
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateContactRequest = req.body as UpdateContactRequest;
      request.id = req.params.id;
      
      const response = await ContactService.update(req.user!, request);
      res.status(200).json({
        success: true,
        message: "Contact Updated successfully",
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      await ContactService.remove(req.user!, id);
      res.status(200).json({
        success: true,
        message: "Contact Removed successfully",
        data: "OK"
      })
    } catch (error) {
      next(error)
    }
  }
}