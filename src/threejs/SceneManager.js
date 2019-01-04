// @flow strict
import {
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Scene,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Clock,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  Color,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  WebGLRenderer,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  PerspectiveCamera,
  // $FlowFixMe: No type annotations inside third-party lib three-full
  TrackballControls
} from 'three-full';
import type { Store } from 'redux';
import { updateScore } from '../actions';
import ProteinGroup from './subjects/ProteinGroup';
import GeneralLights from './GeneralLights';
import colors from '../utils/colors';
import store from '../store';
import type { State, Action } from '../types';

type ScreenDimensions = {
  width: number,
  height: number
};

export default class SceneManager {
  lights: GeneralLights;

  protein: ProteinGroup;

  canvas: HTMLCanvasElement;

  store: Store<State, Action>;

  camera: PerspectiveCamera;

  renderer: WebGLRenderer;

  scene: Scene;

  controls: TrackballControls;

  screenDimensions: ScreenDimensions;

  clock: Clock;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.store = store;
    this.clock = new Clock();

    this.screenDimensions = {
      width: this.canvas.width,
      height: this.canvas.height
    };

    this.buildScene();
    this.buildRender(this.screenDimensions);
    this.buildCamera(this.screenDimensions);
    this.buildTrackpadControls();
    this.createSceneSubjects();
  }

  onWindowResize() {
    const { width, height } = this.canvas;

    this.screenDimensions.width = width;
    this.screenDimensions.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  update() {
    this.controls.update();
    const rotation = [
      this.camera.rotation.x,
      this.camera.rotation.y,
      this.camera.rotation.z
    ];
    const rotationSum = rotation.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    store.dispatch(updateScore(Math.round(Math.abs(rotationSum * 11))));

    this.renderer.render(this.scene, this.camera);
  }

  buildTrackpadControls() {
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.minDistance = 500;
    this.controls.maxDistance = 2000;
  }

  buildScene() {
    this.scene = new Scene();
    this.scene.background = new Color(colors.gray);
  }

  buildRender({ width, height }: ScreenDimensions) {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this.renderer.setPixelRatio(DPR);
    this.renderer.setSize(width, height);

    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
  }

  buildCamera({ width, height }: ScreenDimensions) {
    const aspectRatio = width / height;
    const fieldOfView = 70;
    const nearPlane = 1;
    const farPlane = 5000;

    this.camera = new PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    this.camera.position.z = 1000;
  }

  createSceneSubjects() {
    this.lights = new GeneralLights(this.scene);
    this.protein = new ProteinGroup(this.scene, 'molecules/caffeine.pdb');
  }
}
