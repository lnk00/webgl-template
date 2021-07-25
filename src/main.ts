import './style.css'
import { SceneManager } from "./webgl/SceneManager";
import SuzanaModel from './assets/suzana.gltf?url';
import * as THREE from 'three';
import { AssetLoader } from "./webgl/AssetLoader";

const assetLoader = new AssetLoader()
assetLoader.addEventListener('loaded', (event) => {
  const target = (event.currentTarget as AssetLoader);
  console.log(`Loaded: ${target.loaded}/${target.total}`);
})
assetLoader.addEventListener('progress', (event) => {
  const target = (event.currentTarget as AssetLoader);
  console.log(`Loading... ${target.loaded}/${target.total}`);
})

const canvas = document.querySelector('.webgl')! as HTMLCanvasElement;
const sceneManager = new SceneManager(canvas, assetLoader, window.innerWidth, window.innerHeight);
sceneManager.loadAssets([SuzanaModel]);

const directionalLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 3);
directionalLight.position.set(2, 2, 2)
sceneManager.scene.add(directionalLight);

sceneManager.assetLoader.gltfLoader.load(SuzanaModel, gltf => {
  const mesh = gltf.scene.children[0]
  sceneManager.scene.add(mesh);
  return mesh;
});