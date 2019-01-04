import SceneManager from './SceneManager';

export default containerElement => {
  function createCanvas(document, element) {
    const canvas = document.createElement('canvas');
    element.appendChild(canvas);
    return canvas;
  }

  const canvas = createCanvas(document, containerElement);
  const sceneManager = new SceneManager(canvas);

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
  }

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }

  function render() {
    requestAnimationFrame(render);
    sceneManager.update();
  }

  bindEventListeners();
  render();
};
