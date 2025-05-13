import bcrypt from "bcrypt";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid"
import { User } from "@prisma/client";

export class UserService {

  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request)

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username
      }
    })

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(409, "Username already exists")
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

    const user = await prismaClient.user.create({
      data: registerRequest
    })

    return toUserResponse(user)
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request)

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username
      }
    })

    if (!user) {
      throw new ResponseError(401, "Invalid username or password")
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
      throw new ResponseError(401, "Invalid username or password")
    }

    const newJti = uuid()

    const token = jwt.sign(
      {
        username: user.username,
        name: user.name
      },
      process.env.JWT_SECRET || "secret",
      {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRES || "1h",
        issuer: "BELAJAR-TS-RESTFUL-API",
        subject: user.username,
        audience: "BELAJAR-TS-CONTACT-MG",
        jwtid: newJti,
      } as jwt.SignOptions)

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username
      },
      data: {
        jti: newJti
      }
    })

    const response = toUserResponse(user);
    response.token = token;
    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }
}