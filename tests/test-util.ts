import { Address, User } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt"

export class UserTest {

  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "malvin_test"
      }
    })
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "malvin_test",
        name: "Malfin",
        password: await bcrypt.hash("rahasia123", 10),
        jti: "id_jwt"
      }
    })
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "malvin_test"
      }
    })

    // ini cuma agar code ngga error aja...formalitas aslinya ngga perlu
    if (!user) {
      throw new Error("User is not found")
    }

    return user
  }
}

export class ContactTest {

  static async deleteAll() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "malvin_test"
      }
    })
  }

  static async create() {
    await prismaClient.contact.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        phone: "085555555555",
        username: "malvin_test"
      }
    })
  }

  static async get() {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "malvin_test"
      }
    })

    if(!contact) {
      throw new Error("Contact is not found")
    }

    return contact;
  }
}

export class AddressTest {

  static async deleteAll() {
    await prismaClient.address.deleteMany({
      where: {
        contact: {
          username: "malvin_test"
        }
      }
    })
  }

  static async create() {
    const contact = await ContactTest.get();
    await prismaClient.address.create({
      data: {
        contact_id: contact.id,
        street: "Jalan Kemana Aja",
        city: "Pondke",
        province: "Jawa Tengah",
        country: "Indonesia",
        postal_code: "56821"
      }
    })
  }

  static async get(): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        contact: {
          username: "malvin_test"
        }
      }
    })

    if(!address) {
      throw new Error("Address not found")
    }

    return address;
  }

}