import logoSvg from '../img/logo.svg';
import deerSvg from '../img/deer.svg';
import foxSvg from '../img/fox.svg';
import elephantSvg from '../img/elephant.svg';
import { myCanvas } from './main';

const firstGame = document.querySelector('.first-game');
const secondGame = document.querySelector('.second-game');
const thirdGame = document.querySelector('.third-game');
const hint = document.querySelector('.hint');
const save = document.querySelector('.save');
const logo = document.querySelector('.logo');
const startGameBtn = document.querySelector('.start-game-btn');
const cancelHintBtn = document.querySelector('.cancel-hint-btn');

logo.setAttribute('src', logoSvg);

// 分别存储三个游戏的游戏时间
localStorage.setItem('first-gameTime', '0');
localStorage.setItem('second-gameTime', '0');
localStorage.setItem('third-gameTime', '0');

firstGame.addEventListener('click', () => {
  switchGame('first-game');
  myCanvas.initGame(1);
});

secondGame.addEventListener('click', () => {
  switchGame('second-game');
  myCanvas.initGame(2);
});

thirdGame.addEventListener('click', () => {
  myCanvas.initGame(3);
  switchGame('third-game');
});

hint.addEventListener('click', () => {
  gameHint();
});

save.addEventListener('click', () => {
  saveGame();
});

startGameBtn.addEventListener('click', () => {
  startGame();
});

cancelHintBtn.addEventListener('click', () => {
  cancelHint();
});

// 默认是第一个游戏
export function defaultGame() {
  firstGame.classList.add('btn-select');
  // 存储当前游戏名称
  localStorage.setItem('curGame', 'first-game');
}

// 初始游戏时间为0
let curGameTime = 0;
// 定时器
let timer;

// alertBySweet('快点击start按钮开始游戏吧~');

/*切换游戏*/
export function switchGame(ele) {
  clearInterval(timer);
  const saveClass = localStorage.getItem('curGame');

  // 点击元素上色
  const clickEle = document.querySelector('.' + ele);
  if (!clickEle.classList.contains('btn-select')) {
    clickEle.classList.add('btn-select');
  }

  if (ele === saveClass) {
    return;
  }

  // 之前元素褪色
  const saveEle = document.querySelector('.' + saveClass);
  saveEle.classList.remove('btn-select');
  // 更新localStorage中的游戏
  localStorage.setItem('curGame', ele);
  // 展示开始按钮
  startGameBtn.classList.remove('hidden');
  calcTime();
}

/*开始游戏*/
function startGame() {
  startGameBtn.classList.add('hidden');
  calcTime();
  // 此时画布内的碎片才能可以拖动
  myCanvas.unFreeze();
}

/*计时函数*/
function calcTime() {
  // 获取游戏名称
  const curGame = localStorage.getItem('curGame');
  // 获取游戏时长, 以秒来存储时间，页面上最后会以分秒的形式进行呈现
  curGameTime = parseInt(localStorage.getItem(curGame + 'Time'));
  timer = setInterval(() => {
    curGameTime++;
    localStorage.setItem(curGame + 'Time', curGameTime);
  }, 1000);
}

/*游戏提示*/
function gameHint() {
  const level = myCanvas.getLevel();
  const modal = document.querySelector('.modal');
  const hintImg = document.querySelector('.hint-img');
  const body = document.querySelector('body');
  switch (level) {
    case 1:
      hintImg.src = foxSvg;
      break;
    case 2:
      hintImg.src = elephantSvg;
      break;
    case 3:
      hintImg.src = deerSvg;
      break;
  }
  modal.classList.remove('hidden');
  modal.classList.add('show');
  body.classList.add('hideOverFlow');
}

/*取消提示*/
function cancelHint() {
  const modal = document.querySelector('.modal');
  const body = document.querySelector('body');
  modal.classList.remove('show');
  modal.classList.add('hidden');
  body.classList.remove('hideOverFlow');
}

/*保存当前游戏*/
function saveGame() {
  // 弹窗示例--看看哪里可用
  alertBySweet('游戏数据已保存~');
}

/*弹窗封装*/
export function alertBySweet(text) {
  const alertDialog = document.querySelector('.alert-one');
  const alertBtn = document.querySelectorAll('.alert-btn')[0];
  alertBtn.innerHTML = text;
  alertDialog.classList.remove('hidden');
  alertDialog.classList.add('show');
  setTimeout(() => {
    closeAlert('alert-one');
  }, 2000);
}

/*带确定按钮的弹窗*/
export function alertWithButtonBySweet(text) {
  const alertDiv = document.querySelector('.alert-two');
  alertDiv.classList.remove('hidden');
  alertDiv.classList.add('show');
  const alertText = document.querySelector('.alert-text');
  const alertButton = document.querySelector('.confirm-button');

  alertText.innerHTML = text;
  alertButton.addEventListener('click', () => {
    closeAlert('alert-two');
  });
}

/*带加载、删除和取消按钮的弹窗*/
export function alertWithButtonsByXuKai(text) {
  const alertDiv = document.querySelector('.alert-three');
  alertDiv.classList.remove('hidden');
  alertDiv.classList.add('show');
  const alertText = document.querySelector('.alert-three .alert-text');
  const loadButton = document.querySelector('.load-button');
  const deleteButton = document.querySelector('.delete-button');
  const cancelButton = document.querySelector('.cancel-button');
  startGameBtn.classList.add('hidden');

  alertText.innerHTML = text;
  const level = localStorage.getItem('level');
  const processData = localStorage.getItem(`level-${level}`);
  loadButton.addEventListener('click', () => {
    myCanvas
      .loadFromString(processData)
      .then((_) => {
        const level = localStorage.getItem('level');
        switch (level) {
          case '1':
            // 存储当前游戏名称
            localStorage.setItem('curGame', 'first-game');
            switchGame('first-game');
            break;
          case '2':
            // 存储当前游戏名称
            localStorage.setItem('curGame', 'second-game');
            switchGame('second-game');
            break;
          case '3':
            // 存储当前游戏名称
            localStorage.setItem('curGame', 'third-game');
            switchGame('third-game');
            break;
        }
        if (!startGameBtn.classList.contains('hidden')) {
          startGameBtn.classList.add('hidden');
        }
        calcTime();
        // 此时画布内的碎片才能可以拖动
        myCanvas.unFreeze();
      })
      .catch((_) => {
        // TODO 出错提示
        alertBySweet('加载失败，请刷新重试~');
        console.log('失败');
      });
    closeAlert('alert-three');
  });
  deleteButton.addEventListener('click', () => {
    localStorage.removeItem('level');
    localStorage.removeItem(`level-${level}`);
    closeAlert('alert-three');
    defaultGame();
    startGameBtn.classList.remove('hidden');
  });
  cancelButton.addEventListener('click', () => {
    closeAlert('alert-three');
    defaultGame();
    startGameBtn.classList.remove('hidden');
  });
}

/*移除弹窗*/
function closeAlert(ele) {
  const alertDialog = document.querySelector('.' + ele);
  alertDialog.classList.remove('show');
  alertDialog.classList.add('hidden');
}

/*秒转换为分钟+秒*/
export function timeTransform(time) {
  // 分秒的格式为00:00，不足两位的用0占位
  // 分钟
  let minute = Math.floor(time / 60);
  // 秒
  let second = Math.floor(time % 60);
  // 页面上展示的分钟
  let showMin = '00';
  // 页面上展示的秒
  let showSecond = '00';
  if (minute > 0 && minute < 10) {
    showMin = '0' + minute;
  } else {
    showMin = minute;
  }
  if (second > 0 && second < 10) {
    showSecond = '0' + second;
  } else {
    showSecond = second;
  }

  return showMin + '分' + showSecond + '秒';
}
