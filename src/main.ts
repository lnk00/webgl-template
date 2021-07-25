import './style.css';
import * as THREE from 'three';
import { SceneManager } from './webgl/SceneManager';
import { AssetLoader } from './webgl/AssetLoader';
import { AssetsRepository } from './webgl/AsssetManager';
import BasicVertexShader from './shaders/basic.vertex.glsl?raw';
import BasicFragmentShader from './shaders/basic.fragment.glsl?raw';

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
  const suzanne = sceneManager.getMeshByName('Suzanne');
  if (suzanne) {
    suzanne.material = new THREE.RawShaderMaterial({
      vertexShader: BasicVertexShader,
      fragmentShader: BasicFragmentShader,
      wireframe: true,
    });
    sceneManager.scene.add(suzanne);

    const suzanneFolder = sceneManager.gui.addFolder({
      title: 'Suzanne',
    });

    suzanneFolder.addInput(suzanne.rotation, 'x', { min: 0, max: 10, step: 0.001, label: 'rotationX' });
    suzanneFolder.addInput(suzanne.rotation, 'y', { min: 0, max: 10, step: 0.001, label: 'rotationY' });
    suzanneFolder.addInput(suzanne.rotation, 'z', { min: 0, max: 10, step: 0.001, label: 'rotationZ' });
  }
}
