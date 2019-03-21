// @flow strict
import {
  Scene,
  Clock,
  Color,
  WebGLRenderer,
  PerspectiveCamera,
  TrackballControls
} from 'three-full';
import type { Store } from 'redux';
import { updateScore } from '../actions';
import AminoAcidGroup from './subjects/AminoAcidGroup';
import Planet from './subjects/Planet';
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

  protein: ?AminoAcidGroup;

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
    if (window.location.pathname === '/fold') {
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
    } else if (window.location.pathname === '/home') {
      this.controls.update();
      const timer = Date.now() * 0.00000000000001;
      this.planet.update(timer);
      this.renderer.render(this.scene, this.camera);
    }
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
    this.scene.background = new Color(colors.lightGray);
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
    const fieldOfView = 80;
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
    if (window.location.pathname === '/fold') {
      this.protein = new AminoAcidGroup(this.scene, 'molecules/chignolin.pdb');
    } else if (window.location.pathname === '/home') {
      this.planet = new Planet(this.scene);
    }
  }
}
