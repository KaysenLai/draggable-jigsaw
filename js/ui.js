const firstGame = document.querySelector('.firstGame');
const secondGame = document.querySelector('.secondGame');
const thirdGame = document.querySelector('.thirdGame');
const hint = document.querySelector('.hint');
const save = document.querySelector('.save');
const startGameBtn = document.querySelector('.startGame');

// 存储当前游戏名称
sessionStorage.setItem('curGame', 'firstGame');
// 分别存储三个游戏的游戏数据
sessionStorage.setItem('firstGameData', '');
sessionStorage.setItem('secondGameData', '');
sessionStorage.setItem('thirdGameData', '');
// 分别存储三个游戏的游戏时间
sessionStorage.setItem('firstGameTime', '0');
sessionStorage.setItem('secondGameTime', '0');
sessionStorage.setItem('thirdGameTime', '0');

firstGame.addEventListener('click', () => {
  switchGame('firstGame');
});

secondGame.addEventListener('click', () => {
  switchGame('secondGame');
});

thirdGame.addEventListener('click', () => {
  switchGame('thirdGame');
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

firstGame.classList.add('select');

// 初始游戏时间为0
let curGameTime = 0;
// 定时器
let timer;


/*切换游戏*/
function switchGame(ele) {
  clearInterval(timer);
  let saveClass = sessionStorage.getItem('curGame');
  if (ele == saveClass) {
    return;
  } else {
    // 保存当前游戏的数据
    saveGame();
    // 点击元素上色
    let clickEle = document.querySelector('.' + ele);
    clickEle.classList.add('select');

    // 同时需要重新渲染画布，这里请自行补充

    // 之前元素褪色
    let saveEle = document.querySelector('.' + saveClass);
    saveEle.classList.remove('select');
    // 更新sessionStorage中的游戏
    sessionStorage.setItem('curGame', ele);
    // 展示开始按钮
    startGameBtn.classList.remove('hidden');
  }
}

/*开始游戏*/
function startGame() {
  // 获取游戏名称
  let curGame = sessionStorage.getItem('curGame');
  startGameBtn.classList.add('hidden');
  console.log('当前游戏名称为:' + curGame);
  // 获取游戏时长, 以秒来存储时间，页面上最后会以分秒的形式进行呈现
  curGameTime = parseInt(sessionStorage.getItem(curGame + 'Time'));
  console.log('之前的游戏时长为:' + curGameTime);
  timer = setInterval(() => {
    console.log('开始计时');
    curGameTime++;
    console.log(timeTransform(curGameTime));
  }, 1000);

  // 此时画布内的碎片才能可以拖动,可以跟在后面写
}

/*游戏提示*/
function gameHint() {
  // 弹窗示例--看看哪里可用，做了两种
  alertBySweet('第一种弹窗~');
}

/*保存当前游戏*/
function saveGame() {
  let curGame = sessionStorage.getItem('curGame');
  console.log('当前游戏用时：' + curGameTime);
  // 弹窗示例--看看哪里可用
  alertWithButtonBySweet('第二种弹窗~');
  // 保存当前游戏数据,在sessionStorage中以得到的curGame和Data组合得出 要存储当前游戏数据的 游戏名称

  // 保存当前游戏时间
  sessionStorage.setItem(curGame + 'Time', curGameTime);
}

/*弹窗封装*/
function alertBySweet(text) {
  const alertDialog = document.querySelector('.alertDivOne');
  const alertBtn = document.querySelectorAll('.alert-btn')[0];
  alertBtn.innerHTML = text;
  alertDialog.classList.remove('hidden');
  alertDialog.classList.add('show');
  setTimeout(() => {
    closeAlert('alertDivOne');
  }, 2000);
}

/*带确定按钮的弹窗*/
function alertWithButtonBySweet(text) {
  const alertDiv = document.querySelector('.alertDivTwo');
  alertDiv.classList.remove('hidden');
  alertDiv.classList.add('show');
  const alertText = document.querySelector('.dialogText');
  const alertButton = document.querySelector('.confirmButton');

  alertText.innerHTML = text;
  alertButton.addEventListener('click', () => {
    closeAlert('alertDivTwo');
  });
}

/*移除弹窗*/
function closeAlert(ele) {
  const alertDialog = document.querySelector('.' + ele);
  alertDialog.classList.remove('show');
  alertDialog.classList.add('hidden');
}

/*秒转换为分钟+秒*/
function timeTransform(time) {
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

  return showMin + ':' + showSecond;
}
