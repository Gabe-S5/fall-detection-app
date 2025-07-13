import { Request, Response } from "express";
import { Incident } from "../models/incident";
import { openai } from "../config/openai";

export const createIncident = async (req: Request, res: Response) => {
  try {
    const { type, description } = req.body;
    const userId = (req as any).user.uid;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const incident = await Incident.create({ userId, type, description });
    res.status(201).json(incident);
  } catch (error) {
    console.error("Sequelize error in createIncident:", error);
    res.status(500).json({ error: "Failed to create incident" });
  }
};

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const incidents = await Incident.findAll({ where: { userId } });
    res.json(incidents);
  } catch (error) {
    console.error("Sequelize error in getIncidents:", error);
    res.status(500).json({ error: "Failed to get incidents" });
  }
};

export const summarizeIncident = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const incident = await Incident.findByPk(id);
    if (!incident) return res.status(404).json({ message: "Incident not found" });

    if (!incident.description) return res.status(400).json({ message: "Incident description is required" });

    let summary: string;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes incident reports for a senior care home.",
          },
          {
            role: "user",
            content: `Please summarize the following incident: ${incident.description}`,
          },
        ],
        temperature: 0.5,
      });

      summary = response.choices[0]?.message?.content?.trim() || "No summary generated.";
    } catch (error: any) {
      if (error.code === "insufficient_quota") {
        console.warn("OpenAI quota exceeded. Using fallback summary.");
        summary = "Summary could not be generated due to quota limits.";
      } else {
        console.error("OpenAI API error:", error);
        return res.status(500).json({ message: "OpenAI error", error });
      }
    }

    incident.summary = summary;
    await incident.save();
    res.json({ summary });
  } catch (error) {
    console.error("Sequelize error in summarizeIncident:", error);
    res.status(500).json({ error: "Server error" });
  }
};
