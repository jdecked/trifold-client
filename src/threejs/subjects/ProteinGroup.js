import {
  Mesh,
  Color,
  Group,
  PDBLoader,
  BoxBufferGeometry,
  IcosahedronBufferGeometry,
  Vector3,
  MeshPhongMaterial
} from 'three-full';

export default class ProteinGroup {
  constructor(scene, pathToMolecule) {
    this.group = new Group();
    this.offset = new Vector3();
    this.loader = new PDBLoader();

    this.loadMolecule(pathToMolecule);

    scene.add(this.group);
  }

  update(time) {
    this.group.rotation.x = time;
    this.group.rotation.y = time * 0.7;
  }

  loadMolecule(url) {
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
