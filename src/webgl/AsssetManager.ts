import SuzanaModel from './../assets/suzana.gltf?url';

export interface Asset {
  name: string;
  type: string;
  url: string;
  urls?: string[];
}

export const AssetsRepository: Asset[] = [
  {
    name: 'Suzanne',
    type: 'Mesh',
    url: SuzanaModel,
  },
  {
    name: 'GoldAlbedo',
    type: 'Texture',
    url: '/src/assets/gold/gold_albedo.png',
  },
  {
    name: 'GoldAO',
    type: 'Texture',
    url: '/src/assets/gold/gold_ao.png',
  },
  {
    name: 'GoldHeight',
    type: 'Texture',
    url: '/src/assets/gold/gold_height.png',
  },
  {
    name: 'GoldMetallic',
    type: 'Texture',
    url: '/src/assets/gold/gold_metallic.png',
  },
  {
    name: 'GoldNormal',
    type: 'Texture',
    url: '/src/assets/gold/gold_normal.png',
  },
  {
    name: 'GoldRoughness',
    type: 'Texture',
    url: '/src/assets/gold/gold_roughness.png',
  },
  {
    name: 'EnvMap',
    type: 'EnvMap',
    url: '',
    urls: [
      '/src/assets/envMap/px.png',
      '/src/assets/envMap/nx.png',
      '/src/assets/envMap/py.png',
      '/src/assets/envMap/ny.png',
      '/src/assets/envMap/pz.png',
      '/src/assets/envMap/nz.png',
    ],
  },
];
