import request from "supertest";
import app from "../src/app";
import { User } from "../src/models/user";

describe("POST /auth/login", () => {
  it("creates a new user if not existing", async () => {
    const res = await request(app).post("/auth/login").set("Authorization", "Bearer valid-token").send({
      email: "test@example.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test@example.com");

    const user = await User.findOne({ where: { email: "test@example.com" } });
    expect(user).not.toBeNull();
  });

  it("returns existing user if already in DB", async () => {
    const res = await request(app).post("/auth/login").set("Authorization", "Bearer valid-token").send({
      email: "test@example.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("rejects invalid token", async () => {
    const res = await request(app).post("/auth/login").set("Authorization", "Bearer invalid-token").send({
      email: "test@example.com",
    });

    expect(res.statusCode).toBe(401);
  });
});
