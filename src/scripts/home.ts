import gsap from "gsap";
import { getProjectIndex } from "./project-selection";
const stage = document.querySelector<HTMLElement>(".room-stage");
const host = document.querySelector<HTMLElement>("#room-canvas");
const installation = document.querySelector<HTMLElement>(".work-installation");
const panels = Array.from(
  document.querySelectorAll<HTMLElement>("[data-project]"),
);
const selectors = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-select-project]"),
);
const slugs = panels.map((panel) => panel.dataset.project ?? "");
function selectProject(index: number, updateUrl = false) {
  if (index < 0) return;
  const next = panels[index];
  if (!next) return;
  panels.forEach((panel, i) => {
    panel.hidden = i !== index;
    panel
      .querySelectorAll("a")
      .forEach((a) => (a.tabIndex = i === index ? 0 : -1));
  });
  selectors.forEach((button, i) =>
    button.setAttribute("aria-pressed", String(i === index)),
  );
  if (document.documentElement.dataset.motion !== "reduced")
    gsap.fromTo(
      next,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", overwrite: true },
    );
  const live = document.getElementById("project-announcement");
  if (live)
    live.textContent = `Showing ${selectors[index]?.textContent ?? slugs[index]}`;
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("project", slugs[index]);
    history.pushState({}, "", url);
  }
}
selectors.forEach((button, index) =>
  button.addEventListener("click", () => selectProject(index, true)),
);
window.addEventListener("popstate", () =>
  selectProject(
    getProjectIndex(slugs, new URLSearchParams(location.search).get("project")),
  ),
);
selectProject(
  getProjectIndex(slugs, new URLSearchParams(location.search).get("project")),
);
function accessibleStage(work: boolean, heroHidden = work) {
  installation?.toggleAttribute("inert", !work);
  installation?.setAttribute("aria-hidden", String(!work));
  const staticMode =
    document.documentElement.dataset.motion === "reduced" ||
    stage?.classList.contains("fallback-mode");
  document
    .querySelector(".hero-copy")
    ?.toggleAttribute("inert", heroHidden && !staticMode);
}
let roomRequested = false;
function applyMode() {
  const reduced = document.documentElement.dataset.motion === "reduced";
  stage?.classList.toggle("is-reduced", reduced);
  if (reduced) accessibleStage(true);
  else {
    accessibleStage(false);
    void loadRoom();
  }
}
applyMode();
window.addEventListener("motionchange", applyMode);
host?.addEventListener("roomprogress", (event) => {
  const { progress } = (event as CustomEvent<{ progress: number }>).detail;
  stage?.style.setProperty("--progress", String(progress));
  stage?.classList.toggle("is-photo", progress < 0.13);
  stage?.classList.toggle("is-work", progress > 0.55);
  stage?.classList.toggle("is-opening", progress > 0.13 && progress <= 0.55);
  const curtain = document.querySelector<HTMLElement>(".portal-curtain");
  const sweep = Math.min(1, Math.max(0, (progress - 0.065) / 0.13));
  if (curtain) curtain.style.transform = `translateX(${110 - sweep * 220}%)`;
  if (document.documentElement.dataset.motion !== "reduced")
    accessibleStage(progress > 0.55, progress > 0.13);
});
async function loadRoom() {
  if (!host || roomRequested) return;
  roomRequested = true;
  await import("./room")
    .then(({ mountRoom }) => mountRoom(host))
    .then((cleanup) => {
      stage?.classList.add("has-room");
      window.addEventListener("pagehide", (event) => {
        if (!event.persisted) cleanup();
      });
    })
    .catch(() => {
      stage?.classList.add("fallback-mode");
      accessibleStage(true);
    });
}
if (host) {
  host.addEventListener("roomerror", () => {
    stage?.classList.add("fallback-mode");
    accessibleStage(true);
  });
}
