import "./style.css";

import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new Three.WebGL1Renderer({
  canvas: document.querySelector("#three-scene"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new Three.TorusKnotGeometry(10, 3, 100, 16);
const material = new Three.MeshStandardMaterial({
  color: 0x666666,
});
const torusKnot = new Three.Mesh(geometry, material);

scene.add(torusKnot);

const pointLightBlue = new Three.PointLight(0x0071fe, 2);
const pointLightPink = new Three.PointLight(0xe93b81, 2);
const ambientLight = new Three.AmbientLight(0xffffff, 0.3);
pointLightBlue.position.set(10, 10, 15);
pointLightPink.position.set(-10, -10, 15);

scene.add(pointLightBlue, pointLightPink, ambientLight);

const lightHelperBlue = new Three.PointLightHelper(pointLightBlue);
const lightHelperPink = new Three.PointLightHelper(pointLightPink);
const gridHelper = new Three.GridHelper(200, 50);
scene.add(lightHelperBlue, lightHelperPink, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => {
  requestAnimationFrame(animate);

  controls.update();

  torusKnot.rotateOnAxis(new Three.Vector3(1, 0, 0), 0.09);

  renderer.render(scene, camera);
};

animate();
