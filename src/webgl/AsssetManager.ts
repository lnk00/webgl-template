import SuzanaModel from './../assets/suzana.gltf?url';

export interface Asset {
  name: string;
  type: string;
  url: string;
}

export const AssetsRepository: Asset[] = [
  {
    name: 'Suzanne',
    type: 'Mesh',
    url: SuzanaModel
  }
]