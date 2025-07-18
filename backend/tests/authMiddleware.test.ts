import request from "supertest";
import app from "../src/app";

describe("Auth Middleware", () => {
  it("should reject request with invalid token", async () => {
    const res = await request(app)
      .post("/incidents")
      .set("Authorization", "Bearer invalid-token")
      .send({ type: "fall", description: "Some desc" });

    expect(res.statusCode).toBe(401);
  });

  it("should allow request with valid token", async () => {
    const res = await request(app)
      .post("/incidents")
      .set("Authorization", "Bearer valid-token")
      .send({ type: "fall", description: "Some desc" });

    expect(res.statusCode).toBe(201);
  });
});
