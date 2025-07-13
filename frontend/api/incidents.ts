const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getIncidents = async (token: string) => {
  const res = await fetch(`${BASE_URL}/incidents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch incidents");

  return res.json();
};

export const createIncident = async (token: string, incident: { type: string; description: string }) => {
  const res = await fetch(`${BASE_URL}/incidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(incident),
  });

  if (!res.ok) throw new Error("Failed to create incident");
  return res.json();
};

export const summarizeIncident = async (token: string, incidentId: number) => {
  const res = await fetch(`${BASE_URL}/incidents/${incidentId}/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to summarize incident");
  return res.json();
};
