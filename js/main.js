import '../scss/main.scss';
import './ui.js';
import MyCanvas from './canvas';
import foxModel from './animalsModels/foxModel';

export const myCanvas = new MyCanvas(document.getElementById('canvas'));
// myCanvas.initGame(1);
myCanvas.loadFromModel(foxModel);
myCanvas.draw();

document.querySelector('#win-data').addEventListener('click', () => {
  myCanvas.exportWin();
});
document.querySelector('#load-nearly-win').addEventListener('click', () => {
  myCanvas.initGame(11);
});
