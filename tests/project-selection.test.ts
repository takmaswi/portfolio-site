import { describe, it, expect } from "vitest";
import {
  getProjectIndex,
  nextProjectIndex,
} from "../src/scripts/project-selection";
describe("project selection", () => {
  it("selects a known slug and defaults unknown slugs safely", () => {
    expect(getProjectIndex(["one", "two"], "two")).toBe(1);
    expect(getProjectIndex(["one", "two"], "other")).toBe(0);
  });
  it("wraps both directions without hardcoded project counts", () => {
    expect(nextProjectIndex(3, 1, 4)).toBe(0);
    expect(nextProjectIndex(0, -1, 4)).toBe(3);
    expect(nextProjectIndex(0, 1, 0)).toBe(-1);
    expect(nextProjectIndex(0, 1, 1)).toBe(0);
  });
  it("handles an empty collection", () =>
    expect(getProjectIndex([], null)).toBe(-1));
});
