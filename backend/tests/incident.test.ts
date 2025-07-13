import request from "supertest";
import app from "../src/app";
import { verifyToken } from "../src/config/firebase";

jest.mock("../src/config/firebase", () => ({
  verifyToken: jest.fn(() => Promise.resolve({ uid: "testUser" })),
}));

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
