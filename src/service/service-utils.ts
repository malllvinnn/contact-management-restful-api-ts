import { Contact } from "@prisma/client";
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
}