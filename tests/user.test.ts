import supertest from "supertest"
import { web } from "../src/application/web"
import { describe, it } from "@jest/globals"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util"

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

    logger.debug(response);
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

    logger.debug(response);
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

    logger.debug(response);
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

    logger.debug(response);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation Error");
    expect(response.body.errors).toBeDefined()
  })
})