import { Address, Contact } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ServiceUtils {
  
    static async checkContactMustExists(username: string, contactId: string,): Promise<Contact> {
      const contact = await prismaClient.contact.findUnique({
        where: {
          id: contactId,
          username: username
        }
      });
  
      if (!contact) {
        throw new ResponseError(404, "Contact not found")
      }
  
      return contact;
    }

    static async checkAddressMustExists(contactId: string, addressId: string): Promise<Address> {
      const address = await prismaClient.address.findFirst({
        where: {
          id: addressId,
          contact_id: contactId
        }
      });

      if (!address) {
        throw new ResponseError(404, "Address not found");
      };

      return address;
    }
}