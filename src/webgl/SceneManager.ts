import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AssetLoader } from "./AssetLoader";
import { Pane } from 'tweakpane';

export class SceneManager {
  assetLoader: AssetLoader
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  gui: Pane;

  width: number;
  height: number;

  objects: THREE.Object3D[] = [];

  updateObjectCallback: Function = () => {};

  constructor(canvas: HTMLCanvasElement, assetLoader: AssetLoader, width: number, height: number) {
    this.width = width;
    this.height = height;
    canvas.width = this.width;
    canvas.height = this.height;

    this.assetLoader = assetLoader;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.gui = new Pane();
  }

  addGltf(gltfUrl: string): void {
    this.assetLoader.gltfLoader.load(gltfUrl, gltf => {
      const mesh = gltf.scene.children[0]
      this.scene.add(mesh);
      return mesh;
    });
  }

  addDirectionLight(position: THREE.Vector3, color: THREE.Color, intensity: number): THREE.Object3D {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.copy(position);
    this.scene.add(directionalLight);
    return directionalLight;
  }

  render(): void {
    this.controls.update();
    this.updateObjectCallback();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}