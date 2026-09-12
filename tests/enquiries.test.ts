import { describe, expect, it } from "vitest";
import { enquiries, enquiryUrl, contact } from "../src/content/contact";

describe("direct enquiry routes", () => {
  it.each(Object.keys(enquiries) as (keyof typeof enquiries)[])("prefills an editable %s enquiry", (intent) => {
    const url = new URL(enquiryUrl(intent));
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe(contact.email);
    expect(url.searchParams.get("subject")).toBe(enquiries[intent].subject);
    expect(url.searchParams.get("body")).toBe(enquiries[intent].body);
  });
  it("preserves project context and encodes punctuation", () => {
    expect(new URL(enquiryUrl("project", "A & B?")).searchParams.get("body")).toContain("A & B?");
  });
});
