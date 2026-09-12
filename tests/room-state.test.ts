import { describe, expect, it } from "vitest";
import { roomState } from "../src/scripts/room-state";

describe("room choreography", () => {
  it("clamps restored or overscrolled positions to the authored scene", () => {
    expect(roomState(-1)).toEqual(roomState(0));
    expect(roomState(2)).toEqual(roomState(1));
    expect(roomState(Number.NaN)).toEqual(roomState(0));
  });
  it("clears the portrait before the installation receives content", () => {
    expect(roomState(0).portraitOpacity).toBe(1);
    expect(roomState(0.55).portraitOpacity).toBe(0);
    expect(roomState(0.55).display).toBe(1);
    expect(roomState(0.55).opening).toBe(1);
  });
  it("keeps the photographic person frontal while visible", () => {
    for (let p = 0; p <= 1; p += 0.01) {
      const state = roomState(p);
      if (state.portraitOpacity > 0) expect(state.cameraX).toBe(0);
    }
  });
  it("reverses exactly without accumulated transform drift", () => {
    const before = roomState(0.32);
    roomState(0.95);
    expect(roomState(0.32)).toEqual(before);
    expect(roomState(1).ceilingY).toBeGreaterThan(roomState(0).ceilingY);
  });
  it("centers the mobile portrait and uses the same scene contract", () => {
    expect(roomState(0, true).portraitX).toBe(0);
    expect(roomState(0, false).portraitX).toBeGreaterThan(0);
  });
  it("provides one composed reduced-motion frame regardless of scroll", () => {
    expect(roomState(0, false, true)).toEqual(roomState(1, false, true));
    expect(roomState(0.5, false, true).portraitOpacity).toBe(1);
  });
});
