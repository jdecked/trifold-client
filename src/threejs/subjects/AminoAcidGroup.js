// @flow strict
import {
  Mesh,
  Color,
  Group,
  BoxBufferGeometry,
  IcosahedronBufferGeometry,
  Vector3,
  MeshPhongMaterial,
  Scene
} from 'three-full';
import ExtendedPDBLoader from '../loaders/ExtendedPDBLoader';

export default class AminoAcidGroup {
  group: Group;

  offset: Vector3;

  loader: ExtendedPDBLoader;

  constructor(scene: Scene, pathToMolecule: string, bondColor: number) {
    this.group = new Group();
    this.offset = new Vector3();
    this.loader = new ExtendedPDBLoader();

    this.loadMolecule(pathToMolecule, bondColor);

    scene.add(this.group);
  }

  loadMolecule(url: string) {
    while (this.group.children.length > 0) {
      const object = this.group.children[0];
      object.parent.remove(object);
    }

    this.loader.load(url, pdb => {
      const {
        geometryAtoms,
        geometryCovalentBonds,
        geometryHydrogenBonds,
        json
      } = pdb;
      geometryAtoms.computeBoundingBox();
      geometryAtoms.boundingBox.getCenter(this.offset).negate();
      geometryAtoms.translate(this.offset.x, this.offset.y, this.offset.z);
      geometryCovalentBonds.translate(
        this.offset.x,
        this.offset.y,
        this.offset.z
      );
      geometryHydrogenBonds.translate(
        this.offset.x,
        this.offset.y,
        this.offset.z
      );

      const atomPositions = geometryAtoms.getAttribute('position');
      const atomColors = geometryAtoms.getAttribute('color');

      for (let i = 0; i < atomPositions.count; i += 1) {
        const { element } = json.atoms[i];
        if (element !== 'C' && element !== 'H') {
          const sphereGeometry = new IcosahedronBufferGeometry(0.6, 1);
          const position = new Vector3(
            atomPositions.getX(i),
            atomPositions.getY(i),
            atomPositions.getZ(i)
          );
          const color = new Color(
            atomColors.getX(i),
            atomColors.getY(i),
            atomColors.getZ(i)
          );

          const material = new MeshPhongMaterial({
            color,
            emissiveIntensity: 0.5,
            reflectivity: 0.1
          });
          const object = new Mesh(sphereGeometry, material);
          object.position.copy(position);
          object.position.multiplyScalar(75);
          object.scale.multiplyScalar(25);
          this.group.add(object);
        }
      }

      const covalentBondPositions = geometryCovalentBonds.getAttribute(
        'position'
      );

      for (let i = 0; i < covalentBondPositions.count; i += 2) {
        const start = new Vector3(
          covalentBondPositions.getX(i),
          covalentBondPositions.getY(i),
          covalentBondPositions.getZ(i)
        );
        const end = new Vector3(
          covalentBondPositions.getX(i + 1),
          covalentBondPositions.getY(i + 1),
          covalentBondPositions.getZ(i + 1)
        );
        const boxGeometry = new BoxBufferGeometry(1.6, 1.6, 1.07);

        start.multiplyScalar(75);
        end.multiplyScalar(75);

        const object = new Mesh(
          boxGeometry,
          new MeshPhongMaterial({
            color: '#C2F866',
            emissiveIntensity: 0.5,
            reflectivity: 0.1
          })
        );
        object.position.copy(start);
        object.position.lerp(end, 0.5);
        object.scale.set(10, 10, start.distanceTo(end));
        object.lookAt(end);
        this.group.add(object);
      }

      const hydrogenBondPositions = geometryHydrogenBonds.getAttribute(
        'position'
      );

      for (let i = 0; i < hydrogenBondPositions.count; i += 2) {
        const start = new Vector3(
          hydrogenBondPositions.getX(i),
          hydrogenBondPositions.getY(i),
          hydrogenBondPositions.getZ(i)
        );
        const end = new Vector3(
          hydrogenBondPositions.getX(i + 1),
          hydrogenBondPositions.getY(i + 1),
          hydrogenBondPositions.getZ(i + 1)
        );
        const boxGeometry = new BoxBufferGeometry(1.6, 1.6, 1.07);

        start.multiplyScalar(75);
        end.multiplyScalar(75);

        const object = new Mesh(
          boxGeometry,
          new MeshPhongMaterial({
            color: '#ff0000',
            emissiveIntensity: 0.5,
            reflectivity: 0.1
          })
        );
        object.position.copy(start);
        object.position.lerp(end, 0.5);
        object.scale.set(10, 10, start.distanceTo(end));
        object.lookAt(end);
        this.group.add(object);
      }
    });
  }
}
