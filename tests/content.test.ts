import { describe, expect, it } from "vitest";
import { audiences, systems, featuredSystems, searchReady } from "../src/content/work";
import { recognition } from "../src/content/recognition";
import { contact } from "../src/content/contact";
import { existsSync } from "node:fs";

const publicCopy = JSON.stringify({ audiences, systems, searchReady });

describe("public content safeguards", () => {
  it("keeps every system image and credential asset present", () => {
    for (const system of systems) {
      if (system.image) {
        expect(existsSync(`public${system.image}`)).toBe(true);
        expect(system.imageAlt?.length ?? 0).toBeGreaterThan(20);
      }
    }
    for (const item of recognition)
      if (item.documentUrl)
        expect(existsSync(`public${item.documentUrl}`)).toBe(true);
  });
  it("groups every system under a known audience with unique anchors", () => {
    const ids = audiences.map((a) => a.id);
    expect(ids).toEqual(["corporate", "businesses", "individuals"]);
    expect(new Set(systems.map((s) => s.slug)).size).toBe(systems.length);
    for (const system of systems) {
      expect(system.slug).toMatch(/^[a-z0-9-]+$/);
      expect(ids).toContain(system.audience);
      expect(system.points.length).toBeGreaterThan(0);
    }
    for (const id of ids)
      expect(systems.filter((s) => s.audience === id).length).toBeGreaterThan(0);
  });
  it("leads with the systems Takunda chose", () => {
    expect(featuredSystems.map((s) => s.slug)).toEqual(["payroll", "finance", "muripi"]);
    for (const system of featuredSystems) expect(system.image).toBeDefined();
  });
  it("publishes no project links and no confidential client names", () => {
    expect(publicCopy).not.toMatch(/https?:\/\/|vercel\.app/i);
    expect(publicCopy).not.toMatch(
      /kianga|pmrc|precise|ethical holdings|first capital|praz|benike|bushkin|nature'?s nest|cake fairy/i,
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
    expect(award?.description).toContain("Recorded in my professional portfolio");
    expect(award?.description).not.toMatch(/Svika|4\.93|300/);
    expect(award?.url).toBeUndefined();
  });
  it("uses a direct public email and downloadable public CV without dashes or private data", () => {
    expect(contact.email).toBe("takmaswi@gmail.com");
    expect(contact.cvUrl).toBe("/Takunda-Maswi-CV.pdf");
    expect(existsSync(`public${contact.cvUrl}`)).toBe(true);
    expect(JSON.stringify({ publicCopy, recognition, contact })).not.toMatch(
      /[–—]|date of birth|national id|residential address/i,
    );
  });
});
