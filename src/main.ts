import './style.css';
import * as THREE from 'three';
import { SceneManager } from './webgl/SceneManager';
import { AssetLoader } from './webgl/AssetLoader';
import { AssetsRepository } from './webgl/AsssetManager';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const canvas = document.querySelector('.webgl')! as HTMLCanvasElement;
const sceneManager = new SceneManager(canvas, new AssetLoader(), window.innerWidth, window.innerHeight);
sceneManager.onAssetsLoaded(onLoaded);
sceneManager.onAssetsLoading(onLoading);
sceneManager.loadAssets(AssetsRepository);

function onLoading() {
  return;
}

function onLoaded() {
  const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
  directionalLight.position.set(2, 2, 2);
  sceneManager.scene.add(directionalLight);
  const guiLightFolder = sceneManager.gui.addFolder({ title: 'Light' });
  guiLightFolder.addInput(directionalLight, 'intensity', { min: 0, max: 10, step: 0.001 });
  guiLightFolder.addInput(directionalLight.position, 'x', { label: 'posX', min: -5, max: 5, step: 0.001 });
  guiLightFolder.addInput(directionalLight.position, 'y', { label: 'posY', min: -5, max: 5, step: 0.001 });
  guiLightFolder.addInput(directionalLight.position, 'z', { label: 'posZ', min: -5, max: 5, step: 0.001 });

  const cubeMesh = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
      color: 'white',
      envMap: sceneManager.getCubeMapByName('Cubemap'),
      envMapIntensity: 5,
    })
  );
  sceneManager.scene.add(cubeMesh);
}
