import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { roomState } from "./room-state";

/** Geometry stays content-independent: the accessible project display is HTML. */
export async function mountRoom(host: HTMLElement): Promise<() => void> {
  const journey = host.closest<HTMLElement>(".room-journey");
  if (!journey) throw new Error("Room journey is missing");
  gsap.registerPlugin(ScrollTrigger);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e8e1d7");
  scene.fog = new THREE.Fog("#e8e1d7", 19, 43);
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 65);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentScene = new RoomEnvironment();
  const environment = pmrem.fromScene(environmentScene, 0.06);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.32;
  environmentScene.dispose();
  pmrem.dispose();

  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const material = <T extends THREE.Material>(value: T): T => {
    materials.add(value);
    return value;
  };
  const mesh = (
    geometry: THREE.BufferGeometry,
    surface: THREE.Material,
    parent: THREE.Object3D = scene,
  ) => {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, surface);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const block = (
    width: number,
    height: number,
    depth: number,
    surface: THREE.Material,
    parent: THREE.Object3D = scene,
    radius = 0.045,
  ) =>
    mesh(
      new RoundedBoxGeometry(width, height, depth, 3, radius),
      surface,
      parent,
    );
  // Small mineral variation, authored from a seeded field so repeat renders match.
  const mineralCanvas = document.createElement("canvas");
  mineralCanvas.width = 256;
  mineralCanvas.height = 256;
  const mineralContext = mineralCanvas.getContext("2d");
  if (mineralContext) {
    const pixels = mineralContext.createImageData(256, 256);
    let seed = 17;
    for (let y = 0; y < 256; y++)
      for (let x = 0; x < 256; x++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const vein = Math.sin(x * 0.035 + Math.sin(y * 0.043) * 2.4) * 6;
        const value = 204 + (seed / 4294967296 - 0.5) * 30 + vein;
        const i = (y * 256 + x) * 4;
        pixels.data[i] = value;
        pixels.data[i + 1] = value;
        pixels.data[i + 2] = value;
        pixels.data[i + 3] = 255;
      }
    mineralContext.putImageData(pixels, 0, 0);
  }
  const mineral = new THREE.CanvasTexture(mineralCanvas);
  mineral.wrapS = mineral.wrapT = THREE.RepeatWrapping;
  mineral.repeat.set(9, 9);
  textures.add(mineral);
  const limestone = material(
    new THREE.MeshStandardMaterial({
      color: "#c8bca8",
      roughness: 0.64,
      map: mineral,
      bumpMap: mineral,
      bumpScale: 0.025,
    }),
  );
  const lightStone = material(
    new THREE.MeshStandardMaterial({
      color: "#e1d7c6",
      roughness: 0.86,
      map: mineral,
      bumpMap: mineral,
      bumpScale: 0.018,
    }),
  );
  const oxblood = material(
    new THREE.MeshPhysicalMaterial({
      color: "#480a17",
      roughness: 0.34,
      metalness: 0.22,
      clearcoat: 0.48,
      clearcoatRoughness: 0.28,
      bumpMap: mineral,
      bumpScale: 0.008,
    }),
  );
  const darkRed = material(
    new THREE.MeshStandardMaterial({
      color: "#39101b",
      roughness: 0.42,
      metalness: 0.15,
    }),
  );
  const silver = material(
    new THREE.MeshStandardMaterial({
      color: "#b7b9b5",
      metalness: 0.92,
      roughness: 0.31,
    }),
  );
  const ink = material(
    new THREE.MeshStandardMaterial({ color: "#17191b", roughness: 0.56 }),
  );

  const floor = block(50, 0.25, 46, limestone);
  floor.position.set(0, -0.14, -8);
  const back = block(35, 15, 0.45, lightStone);
  back.position.set(0, 7.35, -4.5);
  const side = block(0.4, 12, 20, lightStone);
  side.position.set(-11, 5.9, -4);

  // A deep, machined surround with a real opening and bevelled inner returns.
  const portal = new THREE.Group();
  scene.add(portal);
  const contour = (
    path: THREE.Shape | THREE.Path,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) => {
    path.moveTo(x + r, y);
    path.lineTo(x + w - r, y);
    path.quadraticCurveTo(x + w, y, x + w, y + r);
    path.lineTo(x + w, y + h - r);
    path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    path.lineTo(x + r, y + h);
    path.quadraticCurveTo(x, y + h, x, y + h - r);
    path.lineTo(x, y + r);
    path.quadraticCurveTo(x, y, x + r, y);
  };
  const surround = new THREE.Shape();
  contour(surround, -2.2, 0, 4.4, 5.5, 0.3);
  const aperture = new THREE.Path();
  contour(aperture, -1.53, 0.45, 3.06, 4.48, 0.22);
  surround.holes.push(aperture);
  const portalGeometry = new THREE.ExtrudeGeometry(surround, {
    depth: 0.65,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.045,
    bevelThickness: 0.045,
    curveSegments: 20,
  });
  mesh(portalGeometry, oxblood, portal).position.z = -0.15;
  const sill = block(3.3, 0.08, 1.3, darkRed, portal);
  sill.position.set(0, 0.015, -0.1);
  const recessStone = material(
    new THREE.MeshStandardMaterial({
      color: "#504638",
      roughness: 0.9,
      map: mineral,
      bumpMap: mineral,
      bumpScale: 0.02,
    }),
  );
  const recessBack = block(4.25, 5.45, 0.2, recessStone, portal);
  recessBack.position.set(0, 2.73, -2.55);
  for (const x of [-1.7, 1.7]) {
    const reveal = block(0.24, 5.2, 2.7, recessStone, portal);
    reveal.position.set(x, 2.62, -1.25);
  }

  const leftLeaf = new THREE.Group();
  const rightLeaf = new THREE.Group();
  leftLeaf.position.set(-2.15, 0, 0);
  rightLeaf.position.set(2.15, 0, 0);
  portal.add(leftLeaf, rightLeaf);
  for (const [leaf, direction] of [
    [leftLeaf, -1],
    [rightLeaf, 1],
  ] as const) {
    const panel = block(1.1, 5.45, 0.3, oxblood, leaf, 0.09);
    panel.position.set(direction * 0.56, 2.75, 0.03);
    const inset = block(0.7, 4.65, 0.035, darkRed, leaf, 0.045);
    inset.position.set(direction * 0.57, 2.75, -0.14);
    for (const y of [0.82, 2.75, 4.65]) {
      const barrel = mesh(
        new THREE.CylinderGeometry(0.085, 0.085, 0.42, 24),
        silver,
        leaf,
      );
      barrel.position.set(0, y, 0.26);
      for (const offset of [-0.22, 0.22]) {
        const collar = mesh(
          new THREE.CylinderGeometry(0.103, 0.103, 0.045, 24),
          silver,
          leaf,
        );
        collar.position.set(0, y + offset, 0.26);
      }
      const plate = block(0.29, 0.26, 0.06, silver, leaf, 0.025);
      plate.position.set(direction * 0.13, y, 0.2);
    }
  }
  const ceiling = block(15, 0.28, 7, lightStone);
  ceiling.position.set(1.2, 5.6, -4);
  ceiling.castShadow = false;

  const installation = new THREE.Group();
  scene.add(installation);
  const base = block(5.8, 0.45, 2.2, limestone, installation, 0.08);
  base.position.set(0, 0.24, 0.1);
  const support = block(0.34, 1.7, 0.48, silver, installation);
  support.position.set(0, 1.25, -0.35);
  const display = block(5.35, 3.3, 0.2, ink, installation, 0.065);
  display.position.set(0, 3.1, -0.12);
  const displayBack = block(5.48, 3.43, 0.15, silver, installation, 0.065);
  displayBack.position.set(0, 3.1, -0.23);

  const ambient = new THREE.HemisphereLight("#fff4e4", "#706256", 0.85);
  scene.add(ambient);
  const key = new THREE.DirectionalLight("#fff3de", 2.7);
  key.position.set(-5, 9, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -12;
  key.shadow.camera.right = 12;
  key.shadow.camera.top = 12;
  key.shadow.camera.bottom = -5;
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0003;
  key.shadow.radius = 5;
  scene.add(key);
  const fill = new THREE.DirectionalLight("#cbd3de", 0.28);
  fill.position.set(7, 3, 4);
  scene.add(fill);

  // A broad baked contact pool grounds the cutout without a rectangular plane shadow.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const context = shadowCanvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, "rgba(25,16,14,0.5)");
    gradient.addColorStop(0.45, "rgba(25,16,14,0.22)");
    gradient.addColorStop(1, "rgba(25,16,14,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  textures.add(shadowTexture);
  const contactMaterial = material(
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    }),
  );
  const contact = mesh(new THREE.PlaneGeometry(3.2, 2.4), contactMaterial);
  contact.rotation.x = -Math.PI / 2;
  contact.position.set(2.2, 0.012, 1.2);
  contact.castShadow = false;
  contact.receiveShadow = false;

  let disposed = false;
  let tween: gsap.core.Tween | undefined;
  let observer: ResizeObserver | undefined;
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const timeline = { progress: 0 };
  let portrait:
    THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | undefined;
  const reducedMotion = () =>
    document.documentElement.dataset.motion === "reduced" ||
    (document.documentElement.dataset.motion !== "full" &&
      motionPreference.matches);
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    tween?.scrollTrigger?.kill();
    tween?.kill();
    observer?.disconnect();
    window.removeEventListener("motionchange", configureMotion);
    motionPreference.removeEventListener("change", configureMotion);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    for (const item of geometries) item.dispose();
    for (const item of materials) item.dispose();
    for (const item of textures) item.dispose();
    key.shadow.map?.dispose();
    environment.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    delete host.dataset.ready;
  };
  function contextLost(event: Event) {
    event.preventDefault();
    cleanup();
    host.dispatchEvent(
      new CustomEvent("roomerror", { detail: { reason: "contextlost" } }),
    );
  }
  function render() {
    if (disposed || !portrait) return;
    const mobile = host.clientWidth < 700;
    const state = roomState(timeline.progress, mobile, reducedMotion());
    camera.position.set(state.cameraX, mobile ? 3.3 : 2.8, state.cameraZ);
    camera.lookAt(0, mobile ? 3.1 : 2.65, 0);
    portal.position.set(
      (mobile ? 0 : 2.2) + state.opening * 6,
      0,
      -state.opening * 1.6,
    );
    portal.rotation.y = state.opening * -0.18;
    leftLeaf.rotation.y = 0.18 + state.opening * 1.55;
    rightLeaf.rotation.y = -0.23 - state.opening * 1.4;
    ceiling.position.y = state.ceilingY + 0.7;
    ceiling.rotation.z = -state.opening * 0.07;
    portrait.position.set(state.portraitX, 1.71, 1.1 - state.opening * 1.2);
    portrait.material.opacity = state.portraitOpacity;
    portrait.visible = state.portraitOpacity > 0;
    contact.position.x = state.portraitX;
    contact.position.z = 1.1 - state.opening * 1.2;
    contactMaterial.opacity = state.portraitOpacity;
    installation.visible = state.display > 0;
    display.visible = state.display < 0.95;
    displayBack.visible = state.display < 0.95;
    installation.scale.setScalar(mobile ? 0.66 : 1);
    installation.position.set(
      mobile ? 0 : 1.55,
      -3.7 * (1 - state.display),
      -1.4 * (1 - state.display),
    );
    key.intensity = 2.7 + state.warmth * 0.35;
    key.position.x = -5 + state.opening * 1.7;
    fill.intensity = 0.28 - state.warmth * 0.1;
    host.style.setProperty("--room-progress", String(state.progress));
    host.dispatchEvent(
      new CustomEvent("roomprogress", { detail: { progress: state.progress } }),
    );
    renderer.render(scene, camera);
  }
  function configureMotion() {
    tween?.scrollTrigger?.kill();
    tween?.kill();
    if (reducedMotion()) {
      render();
      return;
    }
    timeline.progress = 0;
    tween = gsap.to(timeline, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: journey,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
      onUpdate: render,
    });
    render();
  }
  try {
    const portraitTexture = await new THREE.TextureLoader().loadAsync(
      "/images/seated-cutout.webp",
    );
    textures.add(portraitTexture);
    portraitTexture.colorSpace = THREE.SRGBColorSpace;
    const portraitMaterial = material(
      new THREE.MeshBasicMaterial({
        map: portraitTexture,
        transparent: true,
        alphaTest: 0.015,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    const portraitGeometry = new THREE.PlaneGeometry((3.5 * 1086) / 1448, 3.5);
    geometries.add(portraitGeometry);
    portrait = new THREE.Mesh(portraitGeometry, portraitMaterial);
    scene.add(portrait);
    host.append(renderer.domElement);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    observer = new ResizeObserver(() => {
      if (disposed) return;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    });
    observer.observe(host);
    renderer.setSize(
      Math.max(1, host.clientWidth),
      Math.max(1, host.clientHeight),
      false,
    );
    camera.aspect = host.clientWidth / Math.max(1, host.clientHeight);
    camera.updateProjectionMatrix();
    window.addEventListener("motionchange", configureMotion);
    motionPreference.addEventListener("change", configureMotion);
    configureMotion();
    host.dataset.ready = "true";
    return cleanup;
  } catch (error) {
    cleanup();
    throw error;
  }
}
