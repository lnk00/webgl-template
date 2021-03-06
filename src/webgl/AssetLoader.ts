import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class AssetLoader extends EventTarget {
  loadingManager: THREE.LoadingManager;
  gltfLoader: GLTFLoader;
  textureLoader: THREE.TextureLoader;
  cubeMapLoader: THREE.CubeTextureLoader;

  loaded = 0;
  total = 0;

  constructor() {
    super();
    this.loadingManager = new THREE.LoadingManager(
      () => {
        console.log(`Loaded: ${this.loaded}/${this.total}`);
        this.dispatchEvent(new Event('loaded'));
      },
      (_url, loaded, total) => {
        this.loaded = loaded;
        this.total = total;
        console.log(`Loading... ${this.loaded}/${this.total}`);
        this.dispatchEvent(new Event('loading'));
      },
      (url) => {
        console.log('Error loading: ', url);
      }
    );
    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.cubeMapLoader = new THREE.CubeTextureLoader(this.loadingManager);
  }
}
