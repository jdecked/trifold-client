// @flow strict
// $FlowFixMe: No type annotations inside third-party lib three
import { DirectionalLight, Scene } from 'three';
import colors from '../utils/colors';

export default class GeneralLights {
  constructor(scene: Scene) {
    const light = new DirectionalLight(colors.white, 0.8);
    light.position.set(1, 1, 1);
    scene.add(light);

    const light2 = new DirectionalLight(colors.white, 0.5);
    light.position.set(-1, -1, 1);
    scene.add(light2);
  }
}
