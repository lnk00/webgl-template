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
  const pointLight = new THREE.PointLight('white', 3);
  pointLight.position.set(2, 2, 2);
  sceneManager.scene.add(pointLight);

  const cubeMesh = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
      map: sceneManager.getTextureByName('GoldAlbedo'),
      roughnessMap: sceneManager.getTextureByName('GoldRoughness'),
      metalnessMap: sceneManager.getTextureByName('GoldMetallic'),
      aoMap: sceneManager.getTextureByName('GoldAO'),
      normalMap: sceneManager.getTextureByName('GoldNormal'),
      envMap: sceneManager.getEnvTextureByName('EnvMap'),
      toneMapped: true,
      envMapIntensity: 1,
      metalness: 1,
      roughness: 0.7,
      aoMapIntensity: 0.75,
    })
  );
  cubeMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(cubeMesh.geometry.attributes.uv.array, 2));
  sceneManager.scene.add(cubeMesh);

  sceneManager.updateObjectCallback = () => {
    cubeMesh.rotation.y = sceneManager.elapsedTime * 0.2;
    cubeMesh.rotation.z = sceneManager.elapsedTime * 0.5;
  };
}
