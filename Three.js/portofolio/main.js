import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
  },
};
gui.add(world.plane, 'width', 1, 20).onChange(generatePlane);
gui.add(world.plane, 'height', 1, 20).onChange(generatePlane);
gui.add(world.plane, 'widthSegments', 1, 20).onChange(generatePlane);
gui.add(world.plane, 'heightSegments', 1, 20).onChange(generatePlane);

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  const { array } = planeMesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const z = array[i + 2];
    array[i + 2] = z + Math.random();
  }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);

const backlight = new THREE.DirectionalLight(0xffffff, 1);
backlight.position.set(0, 0, -1);

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// scene.add(boxMesh);
scene.add(planeMesh);
scene.add(light);
scene.add(backlight);
new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // boxMesh.rotation.x += 0.01;
  // boxMesh.rotation.y += 0.01;
  // planeMesh.rotation.x += 0.01;
}

animate();
