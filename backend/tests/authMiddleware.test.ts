import request from "supertest";
import app from "../src/app";
import { verifyToken } from "../src/config/firebase";

jest.mock("../src/config/firebase", () => ({
  verifyToken: jest.fn(),
}));

describe("Auth Middleware", () => {
  it("should reject request with invalid token", async () => {
    (verifyToken as jest.Mock).mockRejectedValue(new Error("Invalid token"));

    const res = await request(app)
      .post("/incidents")
      .set("Authorization", "Bearer invalid-token")
      .send({ type: "fall", description: "Some desc" });

    expect(res.statusCode).toBe(401);
  });

  it("should allow request with valid token", async () => {
    (verifyToken as jest.Mock).mockResolvedValue({ uid: "testUser" });

    const res = await request(app)
      .post("/incidents")
      .set("Authorization", "Bearer valid-token")
      .send({ type: "fall", description: "Some desc" });

    expect(res.statusCode).toBe(201);
  });
});
