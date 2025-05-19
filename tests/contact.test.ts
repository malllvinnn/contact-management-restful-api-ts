import { describe, expect, it } from "@jest/globals";
import { ContactTest, UserTest } from "./test-util";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", (): void => {
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

describe("GET /api/contacts/:id", (): void => {
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

    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Contact Retrieved successfully");
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.first_name).toBe("John");
    expect(response.body.data.last_name).toBe("Doe");
    expect(response.body.data.email).toBe("johndoe@example.com");
    expect(response.body.data.phone).toBe("085555555555");
  })

  it("should reject get contact if contact not found", async () => {
    const response = await supertest(web)
      .get(`/api/contacts/invalid-id`)
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Contact not found");
    expect(response.body.errors).toBeDefined();
  })

  it("should reject get contact if unauthorized or token invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("Authorization", `invalid`);

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeDefined();
  })
})

describe("PUT /api/contact/:id", (): void => {
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

    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "Budi",
        last_name: "Sudarsono",
        email: "budisudar@example.com",
        phone: "088888888888"
      })

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Contact Updated successfully");
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.first_name).toBe("Budi");
    expect(response.body.data.last_name).toBe("Sudarsono");
    expect(response.body.data.email).toBe("budisudar@example.com");
    expect(response.body.data.phone).toBe("088888888888");
  })

  it("should rejected to update contact if Bad Request or Validation Error ", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "",
        last_name: "",
        email: "budisudarexamplecom",
        phone: ""
      })

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation Error");
    expect(response.body.errors).toBeDefined()
  })

  it("should rejected to update contact if Unauthorized", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("Authorization", `invalid`)
      .send({
        first_name: "Budi",
        last_name: "Sudarsono",
        email: "budisudar@example.com",
        phone: "088888888888"
      })

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeDefined()
  })
})