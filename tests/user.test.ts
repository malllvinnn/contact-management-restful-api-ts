import supertest from "supertest"
import { web } from "../src/application/web"
import { describe, expect, it } from "@jest/globals"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util"
import bcrypt from "bcrypt"

describe("POST /api/users", (): void => {
  afterEach(async () => {
    await UserTest.delete();
  })

  it("should reject register new user if request is validation error", async (): Promise<void> => {
    const response = await supertest(web)
      .post("/api/users")
      .send({
        username: "",
        name: "",
        password: ""
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe("Validation Error")
    expect(response.body.errors).toBeDefined();
  })

  it("should reject register new user if request is conflict", async (): Promise<void> => {
    const newUser = {
      username: "malvin_test",
      name: "Malfin",
      password: "REDACTED"
    }

    await supertest(web)
      .post("/api/users")
      .send(newUser)
      .expect(201);

    const response = await supertest(web)
      .post("/api/users")
      .send(newUser);

    logger.debug(response.body);
    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Username already exists");
    expect(response.body.errors).toBeDefined()
  })

  it("should register new user", async (): Promise<void> => {
    const response = await supertest(web)
      .post("/api/users")
      .send({
        username: "malvin_test",
        name: "Malfin",
        password: "REDACTED"
      })

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User Created successfully");
    expect(response.body.data.username).toBe("malvin_test");
    expect(response.body.data.name).toBe("Malfin");
  })
})

describe("POST /api/users/login", (): void => {

  beforeEach(async () => {
    await UserTest.create();
  })

  afterEach(async () => {
    await UserTest.delete();
  })

  it("should be able to login", async () => {
    const response = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      })

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User Login successfully");
    expect(response.body.data.username).toBe("malvin_test");
    expect(response.body.data.name).toBe("Malfin");
    expect(response.body.data.token).toBeDefined();
  })

  it("should reject login user if username is Invalid", async () => {
    const response = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "invalid",
        password: "rahasia123"
      })

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid username or password");
    expect(response.body.errors).toBeDefined()
  })

  it("should reject login user if password is Invalid", async () => {
    const response = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "invalid"
      })

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid username or password");
    expect(response.body.errors).toBeDefined()
  })

  it("should reject login user if request is validation error", async () => {
    const response = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "",
        password: ""
      })

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation Error");
    expect(response.body.errors).toBeDefined()
  })
})

describe("GET /api/users/current", (): void => {

  beforeEach(async () => {
    await UserTest.create();
  })

  afterEach(async () => {
    await UserTest.delete();
  })

  it("should be able to get user", async () => {
    // login dulu + dapatkan token
    const loginResponse = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      });

    const token = loginResponse.body.data.token;
    expect(token).toBeDefined();

    // call keamaan route pakai token
    const response = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User Retrieved successfully");
    expect(response.body.data.username).toBe("malvin_test");
    expect(response.body.data.name).toBe("Malfin");
  })

  it("should reject get user if token is invalid", async () => {
    // login dulu + dapatkan token
    const loginResponse = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      });

    // call keamaan route pakai token
    const response = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "Bearer invalid");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeDefined();
  })

})

describe("PATCH /api/users/current", (): void => {
  beforeEach(async () => {
    await UserTest.create();
  })

  afterEach(async () => {
    await UserTest.delete();
  })

  it("should reject update user if request is invalid", async () => {
    // login dulu + dapatkan token
    const loginResponse = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      });

    const token = loginResponse.body.data.token;
    expect(token).toBeDefined();

    const response = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        password: ""
      })

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation Error");
    expect(response.body.errors).toBeDefined();
  })

  it("should reject update user if request not logged", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "invalid")
      .send({
        name: "Yudi",
        password: "rahasia666"
      })

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeDefined();
  })

  it("should be able to update user name", async () => {
    // login dulu + dapatkan token
    const loginResponse = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      });

    const token = loginResponse.body.data.token;
    expect(token).toBeDefined();

    const response = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Yulia Zuma",
      })

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User Updated successfully");
    expect(response.body.data.name).toBe("Yulia Zuma")
  })

  it("should be able to update user password", async () => {
    // login dulu + dapatkan token
    const loginResponse = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      });

    const token = loginResponse.body.data.token;
    expect(token).toBeDefined();

    const response = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", `Bearer ${token}`)
      .send({
        password: "Selalu666",
      })

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User Updated successfully");

    const user = await UserTest.get();
    expect(await bcrypt.compare("Selalu666", user.password)).toBe(true);
  })
})

describe("DELETE /api/users/current", (): void => {
  beforeEach(async () => {
    await UserTest.create();
  })

  afterEach(async () => {
    await UserTest.delete();
  })

  it("should be able to logout user", async () => {
    // login dulu + dapatkan token
    const loginResponse = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      });

    const token = loginResponse.body.data.token;
    expect(token).toBeDefined();

    const response = await supertest(web)
      .delete("/api/users/current")
      .set("Authorization", `Bearer ${token}`)

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User Logout successfully");
    expect(response.body.data).toBe("OK");
  })

  it("should reject logout user if token not defined or invalid", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("Authorization", "Bearer invalid")

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeDefined();
  })
})