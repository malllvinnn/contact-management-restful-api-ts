import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateAddressRequest } from "../model/address-model";
import { AddressService } from "../service/address-service";

export class AddressController {

  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = req.params.contactId;

      const response = await AddressService.create(req.user!, request);

      res.status(201).json({
        success: true,
        message: "Address Created successfully",
        data: response,
      });
    } catch (error) {
      next(error)
    }
  }

}