// @flow strict
import {
  Group,
  Mesh,
  MeshPhongMaterial,
  MeshLambertMaterial,
  TextureLoader,
  TorusBufferGeometry,
  TetrahedronBufferGeometry,
  Scene
} from 'three';

export default class Planet {
  group: Group;

  constructor(scene: Scene) {
    this.group = new Group();
    this.loadPlanet();
    scene.add(this.group);
  }

  update(rotation: number) {
    this.group.rotateY(rotation);
    this.group.rotateZ(rotation * 0.5);
  }

  loadPlanet() {
    const planetGeometry = new TorusBufferGeometry(10, 3, 64, 100);
    const planetTexture = new TextureLoader().load(
      'textures/leaves_acacia.png'
    );
    const planetMaterial = new MeshPhongMaterial({
      map: planetTexture
    });
    const planet = new Mesh(planetGeometry, planetMaterial);
    planet.scale.set(30, 30, 30);
    planet.rotateX(-1);
    this.group.add(planet);

    const arrowGeometry = new TetrahedronBufferGeometry();
    const arrowMaterial = new MeshLambertMaterial({
      color: '#ff0000'
    });
    const arrow = new Mesh(arrowGeometry, arrowMaterial);
    arrow.scale.set(50, 50, 50);
    arrow.position.set(-50, 280, -180);
    arrow.rotateZ(-1);
    this.group.add(arrow);
  }
}
