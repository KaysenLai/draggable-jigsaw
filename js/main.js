import '../scss/main.scss';
import MyCanvas from './canvas';
import Shape from './shape';

const myCanvas = new MyCanvas(document.getElementById('canvas'));

const points = [
  { x: 0, y: 0 },
  { x: 200, y: 0 },
  { x: 100, y: 100 },
];
const center = { x: 100, y: 40 };

const shape1 = new Shape(points, center);
myCanvas.addShape(shape1);
myCanvas.draw();
