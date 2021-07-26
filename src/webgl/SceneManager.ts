import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AssetLoader } from './AssetLoader';
import { Pane } from 'tweakpane';
import { Asset, AssetType } from './AsssetManager';

export class SceneManager {
  assetLoader: AssetLoader;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  gui: Pane;

  width: number;
  height: number;

  meshes: THREE.Mesh[] = [];
  textures: THREE.Texture[] = [];
  cubeMaps: THREE.CubeTexture[] = [];

  clock: THREE.Clock;
  elapsedTime: number;

  updateObjectCallback = (): void => {
    return;
  };

  constructor(canvas: HTMLCanvasElement, assetLoader: AssetLoader, width: number, height: number) {
    this.width = width;
    this.height = height;
    canvas.width = this.width;
    canvas.height = this.height;

    this.assetLoader = assetLoader;

    this.clock = new THREE.Clock();
    this.elapsedTime = this.clock.getElapsedTime();

    this.setupScene();
    this.setupCamera();
    this.setupRenderer(canvas);
    this.setupGui();
    this.setupControls();
    this.setupResize();

    this.render();
  }

  setupScene(): void {
    this.scene = new THREE.Scene();
  }

  setupCamera(): void {
    this.camera = new THREE.PerspectiveCamera(65, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 3);
  }

  setupRenderer(canvas: HTMLCanvasElement): void {
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 2;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  setupGui(): void {
    this.gui = new Pane();
    const rendererGuiFolder = this.gui.addFolder({ title: 'Renderer' });
    rendererGuiFolder.addInput(this.renderer, 'toneMappingExposure', {
      label: 'toneMapExpo',
      min: 0,
      max: 10,
      step: 0.001,
    });
    const cameraFolder = this.gui.addFolder({ title: 'Camera' });
    cameraFolder.addInput(this.camera, 'fov', { min: 55, max: 75, step: 1 }).on('change', () => {
      this.camera.updateProjectionMatrix();
    });
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
    assets.forEach((asset) => {
      if (asset.type === AssetType.MESH && asset.url.endsWith('.gltf')) {
        this.assetLoader.gltfLoader.load(asset.url, (gltf) => {
          gltf.scene.children.forEach((child) => {
            if (child.type === 'Mesh') {
              child.name = asset.name;
              this.meshes.push(child as THREE.Mesh);
            }
          });
        });
      } else if (asset.type === AssetType.TEXTURE && asset.url.endsWith('.png')) {
        this.assetLoader.textureLoader.load(asset.url, (texture) => {
          texture.name = asset.name;
          this.textures.push(texture);
        });
      } else if (asset.type === AssetType.CUBEMAP && asset.urls) {
        const envTexture = this.assetLoader.cubeMapLoader.load(asset.urls);
        envTexture.name = asset.name;
        this.cubeMaps.push(envTexture);
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
    return this.meshes.find((mesh) => mesh.name === name);
  }

  getTextureByName(name: string): THREE.Texture | undefined {
    return this.textures.find((texture) => texture.name === name);
  }

  getCubeMapByName(name: string): THREE.CubeTexture | undefined {
    return this.cubeMaps.find((texture) => texture.name === name);
  }

  render(): void {
    this.elapsedTime = this.clock.getElapsedTime();
    this.controls.update();
    this.updateObjectCallback();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
