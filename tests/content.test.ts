import { describe, expect, it } from "vitest";
import { projects } from "../src/content/projects";
import { recognition } from "../src/content/recognition";
import { contact } from "../src/content/contact";
import { existsSync } from "node:fs";

describe("public content safeguards", () => {
  it("keeps every project and credential asset present", () => {
    for (const project of projects)
      expect(existsSync(`public${project.image}`)).toBe(true);
    for (const item of recognition)
      if (item.documentUrl)
        expect(existsSync(`public${item.documentUrl}`)).toBe(true);
  });
  it("keeps project routes unique and every case study bounded", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.boundary.length).toBeGreaterThan(30);
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.image).toMatch(/^\/images\/project-[a-z-]+\.webp$/);
    }
  });
  it("preserves material limitations in public case studies", () => {
    expect(projects.find((p) => p.slug === "muripi")?.boundary).toMatch(
      /physical|real-world/i,
    );
    expect(projects.find((p) => p.slug === "taku-cake")?.boundary).toMatch(
      /payment/i,
    );
    expect(projects.find((p) => p.slug === "bushkin")?.boundary).toMatch(
      /acceptance/i,
    );
  });
  it("publishes one verified professional certificate without unsupported wins", () => {
    expect(recognition[0].title).toBe("Google AI Professional Certificate");
    expect(recognition[0].url).toBe(
      "https://coursera.org/verify/professional-cert/FZSTEM28BXNS",
    );
  });
  it("includes the documented award without inventing a winning product or verification link", () => {
    const award = recognition.find((item) => item.title.includes("Hackathon"));
    expect(award).toBeDefined();
    expect(award?.description).toContain(
      "Recorded in my professional portfolio",
    );
    expect(award?.description).not.toMatch(/Svika|4\.93|300/);
    expect(award?.url).toBeUndefined();
  });
  it("uses a direct public email and downloadable public CV", () => {
    expect(contact.email).toBe("takmaswi@gmail.com");
    expect(contact.cvUrl).toBe("/Takunda-Maswi-CV.pdf");
    expect(existsSync(`public${contact.cvUrl}`)).toBe(true);
    expect(JSON.stringify({ projects, recognition, contact })).not.toMatch(
      /[\u2013\u2014]|date of birth|national id|residential address/i,
    );
  });
});
