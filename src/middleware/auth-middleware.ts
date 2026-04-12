import { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";
import { ResponseError } from "../error/response-error";
import jwt from "jsonwebtoken"

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    // 1. Ambil token
    const authHeader = req.get("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ResponseError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    // 2. verify jwt
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    // 3. ambil user dari db username
    const user = await prismaClient.user.findUnique({
      where: {
        username: decode.sub
      }
    });
    
    // 4. check jti DB vs jti di token
    if(!user || user.jti !== decode.jti) {
      throw new ResponseError(401, "Unauthorized");
    }

    // 5. inject user ke req.user -> pass ke route
    req.user = user;
    next();
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      errors: [error]
    }).end();
  }
}