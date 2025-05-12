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
        jti: "JWT-UUID-Format-Example"
      }
    })
  }
}