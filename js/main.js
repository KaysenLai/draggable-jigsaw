import '../scss/main.scss';
import MyCanvas from './canvas';
import foxModel from './animalsModels/foxModel';

export const myCanvas = new MyCanvas(document.getElementById('canvas'));

myCanvas.loadFromModel(foxModel);
myCanvas.draw();
