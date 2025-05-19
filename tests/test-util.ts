import { User } from "@prisma/client";
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
    if(!user) {
      throw new Error("User is not found")
    }

    return user
  }
}

export class ContactTest {

  static async deleteAll(){
    await prismaClient.contact.deleteMany({
      where: {
        username: "malvin_test"
      }
    })
  }
}