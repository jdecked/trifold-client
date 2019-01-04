// @flow strict
import {
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Mesh,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Color,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Group,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  PDBLoader,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  BoxBufferGeometry,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  IcosahedronBufferGeometry,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Vector3,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  MeshPhongMaterial,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Scene
} from 'three-full';

export default class ProteinGroup {
  group: Group;

  offset: Vector3;

  loader: PDBLoader;

  constructor(scene: Scene, pathToMolecule: string) {
    this.group = new Group();
    this.offset = new Vector3();
    this.loader = new PDBLoader();

    this.loadMolecule(pathToMolecule);

    scene.add(this.group);
  }

  loadMolecule(url: string) {
    while (this.group.children.length > 0) {
      const object = this.group.children[0];
      object.parent.remove(object);
    }

    this.loader.load(url, pdb => {
      const { geometryAtoms, geometryBonds } = pdb;
      geometryAtoms.computeBoundingBox();
      geometryAtoms.boundingBox.getCenter(this.offset).negate();
      geometryAtoms.translate(this.offset.x, this.offset.y, this.offset.z);
      geometryBonds.translate(this.offset.x, this.offset.y, this.offset.z);

      let positions = geometryAtoms.getAttribute('position');
      const atomColors = geometryAtoms.getAttribute('color');

      for (let i = 0; i < positions.count; i += 1) {
        const sphereGeometry = new IcosahedronBufferGeometry(1, 2);
        const position = new Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i)
        );
        const color = new Color(
          atomColors.getX(i),
          atomColors.getY(i),
          atomColors.getZ(i)
        );

        const material = new MeshPhongMaterial({ color });
        const object = new Mesh(sphereGeometry, material);
        object.position.copy(position);
        object.position.multiplyScalar(75);
        object.scale.multiplyScalar(25);
        this.group.add(object);
      }

      positions = geometryBonds.getAttribute('position');

      for (let i = 0; i < positions.count; i += 2) {
        const boxGeometry = new BoxBufferGeometry(1, 1, 1);
        const start = new Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i)
        );
        const end = new Vector3(
          positions.getX(i + 1),
          positions.getY(i + 1),
          positions.getZ(i + 1)
        );

        start.multiplyScalar(75);
        end.multiplyScalar(75);

        const object = new Mesh(boxGeometry, new MeshPhongMaterial(0xffffff));
        object.position.copy(start);
        object.position.lerp(end, 0.5);
        object.scale.set(5, 5, start.distanceTo(end));
        object.lookAt(end);
        this.group.add(object);
      }
    });
  }
}
