import request from "supertest";
import app from "../src/app";

describe("POST /incidents", () => {
  it("should create a new incident", async () => {
    const res = await request(app).post("/incidents").set("Authorization", "Bearer valid-token").send({
      type: "fall",
      description: "Patient slipped in the hallway",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("type", "fall");
    expect(res.body).toHaveProperty("description", "Patient slipped in the hallway");
  });
});

describe("GET /incidents", () => {
  it("should return all incidents", async () => {
    const res = await request(app).get("/incidents").set("Authorization", "Bearer valid-token");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
