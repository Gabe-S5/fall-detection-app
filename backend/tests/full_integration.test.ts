import request from "supertest";
import app from "../src/app";

describe("Full integration: login -> create -> summarize -> fetch", () => {
  let incidentId: string;

  it("logs in user and creates an incident, summarizes it, then fetches it", async () => {
    // 1. Login
    const loginRes = await request(app)
      .post("/auth/login")
      .set("Authorization", "Bearer valid-token")
      .send({ email: "test@example.com" });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.user.email).toBe("test@example.com");

    // 2. Create Incident
    const createRes = await request(app).post("/incidents").set("Authorization", "Bearer valid-token").send({
      type: "fall",
      description: "Patient slipped in hallway",
    });

    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    expect(createRes.body.type).toBe("fall");
    incidentId = createRes.body.id;

    // 3. Summarize Incident
    const summarizeRes = await request(app)
      .post(`/incidents/${incidentId}/summarize`)
      .set("Authorization", "Bearer valid-token");

    expect(summarizeRes.statusCode).toBe(200);
    expect(summarizeRes.body).toHaveProperty("summary");
    expect(summarizeRes.body.summary.length).toBeGreaterThan(0);

    // 4. Fetch Incident to verify summary saved
    const fetchRes = await request(app).get(`/incidents`).set("Authorization", "Bearer valid-token");

    expect(fetchRes.statusCode).toBe(200);
    expect(Array.isArray(fetchRes.body)).toBe(true);

    const incident = fetchRes.body.find((i: any) => i.id === incidentId);
    expect(incident).toBeDefined();
    expect(incident.summary).toBe(summarizeRes.body.summary);
  });
});
