import '../scss/main.scss';
import MyCanvas from './canvas';
import Shape from './shape';

export const myCanvas = new MyCanvas(document.getElementById('canvas'));

const points = [
  { x: 300, y: 100 },
  { x: 200, y: 0 },
  { x: 100, y: 100 },
];
const center = { x: 100, y: 40 };

const shape1 = new Shape(points, center, 1);
const shape2 = new Shape(
  [
    { x: 100, y: 100 },
    { x: 300, y: 100 },
    { x: 200, y: 200 },
  ],
  { x: 200, y: 140 },
  2,
);
const shape3 = new Shape(
  [
    { x: 500, y: 100 },
    { x: 500, y: 300 },
    { x: 600, y: 200 },
  ],
  { x: 550, y: 240 },
  3,
);
myCanvas.addShape(shape1);
myCanvas.addShape(shape2);
myCanvas.addShape(shape3);
myCanvas.draw();
