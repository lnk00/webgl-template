import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class AssetLoader {
  loadingManager: THREE.LoadingManager;
  gltfLoader: GLTFLoader;
  textureLoader: THREE.TextureLoader;

  constructor() {
    this.loadingManager = new THREE.LoadingManager(
      () => { console.log('Loading ended.') },
      (_url, loaded, total) => { console.log(`Loading... : ${loaded}/${total}`, ) },
      (url) => {console.log('Error loading: ', url)}
    );
    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
  }
}