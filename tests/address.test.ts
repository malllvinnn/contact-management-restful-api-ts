import { describe, it } from "@jest/globals";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { v4 as uuidv4 } from 'uuid';

describe("POST /api/contacts/:contactId/addresses", (): void => {
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
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        street: "Jalan Tantaman nomer 2",
        city: "Dalke",
        province: "Jawa Tengah",
        country: "Indonesia",
        postal_code: "51352"
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Address Created successfully");
    expect(response.body.data.street).toBe("Jalan Tantaman nomer 2");
    expect(response.body.data.city).toBe("Dalke");
    expect(response.body.data.province).toBe("Jawa Tengah");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("51352");
  })

  it("should rejected when create address if bad request or validation error", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        street: "Jalan Tantaman nomer 2",
        city: "Dalke",
        province: "Jawa Tengah",
        country: "",
        postal_code: ""
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation Error");
    expect(response.body.errors).toBeDefined();
  })

  it("should rejected when create address if unauthorization", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", `invalid`)
      .send({
        street: "Jalan Tantaman nomer 2",
        city: "Dalke",
        province: "Jawa Tengah",
        country: "Indonesia",
        postal_code: "51352"
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeDefined();
  })

  it("should rejected when create address if contact not found", async () => {
    const isNotContactId = uuidv4()
    const response = await supertest(web)
      .post(`/api/contacts/${isNotContactId}/addresses`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        street: "Jalan Tantaman nomer 2",
        city: "Dalke",
        province: "Jawa Tengah",
        country: "Indonesia",
        postal_code: "51352"
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Contact not found");
    expect(response.body.errors).toBeDefined();
  })
})