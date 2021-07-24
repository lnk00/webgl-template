import './style.css'
import { SceneManager } from "./webgl/SceneManager";
import SuzanaModel from './assets/suzana.gltf?url';
import * as THREE from 'three';
import { AssetLoader } from "./webgl/AssetLoader";

const assetLoader = new AssetLoader()
const canvas = document.querySelector('.webgl')! as HTMLCanvasElement;
const sceneManager = new SceneManager(canvas, assetLoader, window.innerWidth, window.innerHeight);
sceneManager.render();

sceneManager.addDirectionLight(new THREE.Vector3(2, 2, 2), new THREE.Color(0xffffff), 3);
sceneManager.addGltf(SuzanaModel);