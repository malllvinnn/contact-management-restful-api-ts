import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, toAddressResponse, UpdateAddressRequest } from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ServiceUtils } from "./service-utils";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const createRequest = Validation.validate(AddressValidation.CREATE, request);
    await ServiceUtils.checkContactMustExists(user.username, request.contact_id);

    const address = await prismaClient.address.create({
      data: createRequest
    });

    return toAddressResponse(address);
  }

  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);
    await ServiceUtils.checkContactMustExists(user.username, request.contact_id);
    const address = await ServiceUtils.checkAddressMustExists(getRequest.contact_id, getRequest.id);

    return toAddressResponse(address);
  }

  static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    const updateRequest = Validation.validate(AddressValidation.UPDATE, request);
    await ServiceUtils.checkContactMustExists(user.username, request.contact_id);
    await ServiceUtils.checkAddressMustExists(updateRequest.contact_id, updateRequest.id);

    const address = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id
      },
      data: updateRequest
    })

    return toAddressResponse(address);
    
  }

  static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
    const removeRequest = Validation.validate(AddressValidation.REMOVE, request);
    await ServiceUtils.checkContactMustExists(user.username, request.contact_id);
    await ServiceUtils.checkAddressMustExists(removeRequest.contact_id, removeRequest.id);

    const address = await prismaClient.address.delete({
      where: {
        id: removeRequest.id
      }
    })

    return toAddressResponse(address);
  }

  static async list(user: User, contactId: string): Promise<Array<AddressResponse>> {
    await ServiceUtils.checkContactMustExists(user.username, contactId);

    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: contactId
      }
    });

    return addresses.map((address) => toAddressResponse(address));
  }

}