import request from "supertest";
import app from "../src/app";

describe("POST /incidents/:id/summarize", () => {
  it("should summarize an incident", async () => {
    // First create an incident
    const createRes = await request(app)
      .post("/incidents")
      .set("Authorization", "Bearer valid-token")
      .send({ type: "fall", description: "Patient fell near kitchen" });

    const incidentId = createRes.body.id;

    const summarizeRes = await request(app)
      .post(`/incidents/${incidentId}/summarize`)
      .set("Authorization", "Bearer valid-token");

    expect(summarizeRes.statusCode).toBe(200);
    expect(summarizeRes.body).toHaveProperty("summary", "Mocked summary.");
  });
});
