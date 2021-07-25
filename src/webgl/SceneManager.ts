import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AssetLoader } from "./AssetLoader";
import { Pane } from 'tweakpane';
import {Asset} from "./AsssetManager";

export class SceneManager {
  assetLoader: AssetLoader
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  gui: Pane;

  width: number;
  height: number;

  meshes: THREE.Mesh[] = [];

  updateObjectCallback: Function = () => {};
  onLoaded: Function = () => {};

  constructor(canvas: HTMLCanvasElement, assetLoader: AssetLoader, width: number, height: number) {
    this.width = width;
    this.height = height;
    canvas.width = this.width;
    canvas.height = this.height;
    this.assetLoader = assetLoader;

    this.setupGui();
    this.setupScene();
    this.setupCamera();
    this.setupRenderer(canvas);
    this.setupControls();
    this.setupResize();

    this.render();
  }

  setupScene(): void {
    this.scene = new THREE.Scene();
  }

  setupCamera(): void {
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
  }

  setupRenderer(canvas: HTMLCanvasElement): void {
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  setupGui(): void {
    this.gui = new Pane();
  }

  setupResize(): void {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.width, this.height);
    });
  }

  loadAssets(assets: Asset[]): void {
    assets.forEach(asset => {
      if (asset.type === 'Mesh' && asset.url.endsWith('.gltf')) {
        this.assetLoader.gltfLoader.load(asset.url, gltf => {
          gltf.scene.children.forEach(child => {
            if (child.type === 'Mesh') {
              child.name = asset.name;
              this.meshes.push(child as THREE.Mesh);
            }
          })
        });
      }
    });
  }

  onAssetsLoaded(listener: EventListenerOrEventListenerObject): void {
    this.assetLoader.addEventListener('loaded', listener);
  }

  onAssetsLoading(listener: EventListenerOrEventListenerObject): void {
    this.assetLoader.addEventListener('loading', listener);
  }

  getMeshByName(name: string): THREE.Mesh | undefined {
    return this.meshes.find(mesh => mesh.name === name)
  }

  render(): void {
    this.controls.update();
    this.updateObjectCallback();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}