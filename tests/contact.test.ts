import { describe, expect, it } from "@jest/globals";
import { ContactTest, UserTest } from "./test-util";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("/api/contacts", (): void => {
  let token: string;

  beforeEach(async () => {
    await UserTest.create();

    const loginResponse = await supertest(web)
      .post("/api/users/login")
      .send({
        username: "malvin_test",
        password: "rahasia123"
      })

    token = loginResponse.body.data.token;
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "Jane",
        last_name: "Doe",
        email: "janedoe@example.com",
        phone: "085777777777"
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Contact Created successfully");
    expect(response.body.data.first_name).toBe("Jane");
    expect(response.body.data.last_name).toBe("Doe");
    expect(response.body.data.email).toBe("janedoe@example.com");
    expect(response.body.data.phone).toBe("085777777777");
  })

  it("should reject create new contact if Bad Request or Validation Error", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "",
        last_name: "",
        email: "janedoe",
        phone: ""
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation Error");
    expect(response.body.errors).toBeDefined();
  })
})