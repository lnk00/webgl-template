import './style.css'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as Tweakpane from 'tweakpane';

import SuzanaModel from './assets/suzana.gltf?url';

const gui = new Tweakpane.Pane();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const loadingManager = new THREE.LoadingManager();
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.load(SuzanaModel, gltf => {
  const mesh = gltf.scene.children[0]
  scene.add(mesh);
  gui.addInput(mesh.rotation, 'y', { min: 0, max: 10, step: 0.01 });
})

const canvas = document.querySelector('.webgl')! as HTMLCanvasElement;
canvas.height = sizes.height;
canvas.width = sizes.width;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 4;


const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const tick = () => {
  // Update control
  controls.update();

  // Render
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
