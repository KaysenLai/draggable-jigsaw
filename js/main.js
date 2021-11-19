import '../scss/main.scss';
import './ui.js';
import MyCanvas from './canvas';
import svgModel from './utils/svgLoader';
import { alertWithButtonsByXuKai, switchGame, defaultGame } from './ui.js';

export const myCanvas = new MyCanvas(document.getElementById('canvas'));

const level = localStorage.getItem('level');
const processData = localStorage.getItem(`level-${level}`);
if (processData) {
  alertWithButtonsByXuKai('您有未完成的游戏');
} else {
  defaultGame();
}

myCanvas.initGame(1);
// myCanvas.loadFromModel(svgModel);
myCanvas.draw();

document.querySelector('#win-data').addEventListener('click', () => {
  myCanvas.exportWin();
});
document.querySelector('#load-nearly-win').addEventListener('click', () => {
  myCanvas.initGame(11);
});
