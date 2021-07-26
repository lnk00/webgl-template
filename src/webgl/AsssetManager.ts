import SuzanaModel from '../assets/models/suzana.gltf?url';

export interface Asset {
  name: string;
  type: AssetType;
  url: string;
  urls?: string[];
}

export enum AssetType {
  MESH,
  TEXTURE,
  CUBEMAP,
}

export const AssetsRepository: Asset[] = [
  {
    name: 'Suzanne',
    type: AssetType.MESH,
    url: SuzanaModel,
  },
  {
    name: 'Cubemap',
    type: AssetType.CUBEMAP,
    url: '',
    urls: [
      'src/assets/cubemaps/basic/px.jpg',
      'src/assets/cubemaps/basic/nx.jpg',
      'src/assets/cubemaps/basic/py.jpg',
      'src/assets/cubemaps/basic/ny.jpg',
      'src/assets/cubemaps/basic/pz.jpg',
      'src/assets/cubemaps/basic/nz.jpg',
    ],
  },
];
