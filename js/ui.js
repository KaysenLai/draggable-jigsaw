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

// 初始让第一个元素上色
let initGame = document.querySelector('.firstGame');
initGame.style.backgroundColor = '#E73273';
// 初始游戏时间为0
let curGameTime = 0;
// 获取start按钮，在游戏切换时，触发游戏开始
let startGameBtn = document.querySelector('.startGame');
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
    clickEle.style.backgroundColor = '#E73273';

    // 同时需要重新渲染画布，这里请自行补充


    // 之前元素褪色
    let saveEle = document.querySelector('.' + saveClass);
    saveEle.style.backgroundColor = '#333333';
    // 更新sessionStorage中的游戏
    sessionStorage.setItem('curGame', ele);
    // 展示开始按钮
    startGameBtn.style.display = 'block';
  }
}

/*开始游戏*/
function startGame() {
  // 获取游戏名称
  let curGame = sessionStorage.getItem('curGame');
  startGameBtn.style.display = 'none';
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
function hint() {
  // 弹窗示例--看看哪里可用，做了两种
  alertBySweet('提示1次~');
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
  let alertDiv = document.createElement('div');
  let alertButton = document.createElement('button');
  alertButton.innerHTML = text;
  alertDiv.id = 'alertDiv';
  document.body.appendChild(alertDiv);
  alertDiv.appendChild(alertButton);
  let style = '#alertDiv{\n' +
    '            position: absolute;\n' +
    '            left: 0;\n' +
    '            right: 0;\n' +
    '            top: 0;\n' +
    '            bottom: 0;\n' +
    '            margin: auto;\n' +
    '        }\n' +
    '        #alertDiv button{\n' +
    '            position: absolute;\n' +
    '            left: 0;\n' +
    '            right: 0;\n' +
    '            top: 0;\n' +
    '            bottom: 0;\n' +
    '            margin: auto;\n' +
    '            height: 2rem;\n' +
    '            padding: 0 8px;\n' +
    '            background-color: black;\n' +
    '            opacity: 0.8;\n' +
    '            text-align: center;\n' +
    '            color: white;\n' +
    '            border: none;\n' +
    '            border-radius: 5px;\n' +
    '            animation:animate 1s;\n' +
    '        }\n' +
    '\n' +
    '        @keyframes animate{\n' +
    '            from{top:10%;opacity:0}\n' +
    '            to{top:0%;opacity:1}\n' +
    '        }';
  let styleNode = document.createElement('style');
  styleNode.id = 'alertStyle';
  styleNode.setAttribute('type', 'text/css');
  styleNode.innerHTML = style;
  document.body.appendChild(styleNode);
  setTimeout(closeAlert, 2000);
}

/*带确定按钮的弹窗*/
function alertWithButtonBySweet(text) {
  let alertDiv = document.createElement('div');
  let alertP = document.createElement('p');
  let buttonDiv = document.createElement('div');
  let alertButton = document.createElement('button');
  alertP.innerHTML = text;
  alertButton.innerHTML = '确定';
  alertDiv.id = 'alertDiv';
  buttonDiv.id = 'buttonDiv';
  alertButton.id = 'confirmButton';
  document.body.appendChild(alertDiv);
  alertDiv.appendChild(alertP);
  alertDiv.appendChild(buttonDiv);
  buttonDiv.appendChild(alertButton);
  alertButton.addEventListener('click', closeAlert);
  let pattern = new RegExp('[\u4E00-\u9FA5]+');// 中文字符
  let textLength = 0;
  // 需要分别统计中文和英文的长度，英文两个单词算一个
  for (let i = 0; i < text.length; i++) {
    if (pattern.test(text.charAt(i))) {
      textLength += 2;
    } else {
      textLength += 1;
    }
  }

  let height = 0;
  if (textLength % 36 != 0) {
    if ((textLength / 36) == 0) {
      height = (textLength / 36) * 1 + 5;
    } else {
      height = (textLength / 36) * 1 + 6;
    }
  } else {
    height = (textLength / 36) * 1 + 5;
  }
  let style = '#alertDiv {\n' +
    '            position: absolute;\n' +
    '            left: 0;\n' +
    '            right: 0;\n' +
    '            top: 0;\n' +
    '            bottom: 0;\n' +
    '            margin: auto;\n' +
    '            width: 300px;\n' +
    '            height: ' + height + 'rem;\n' +
    '            padding: 0.5rem;\n' +
    '            background-color: black;\n' +
    '            border-radius: 5px;\n' +
    '            opacity: 0.8;\n' +
    '            animation: animate 1s;\n' +
    '        }\n' +
    '\n' +
    '        #alertDiv p {\n' +
    '            word-break: break-word;\n' +
    '            line-height: 1rem;\n' +
    '            color: white;\n' +
    '            font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;\n' +
    '        }\n' +
    '\n' +
    '        #buttonDiv{\n' +
    '            position: relative;\n' +
    '            height: 3rem;\n' +
    '            width: 100%;\n' +
    '            text-align: right;\n' +
    '        }\n' +
    '\n' +
    '        #alertDiv button {\n' +
    '            height: 2rem;\n' +
    '            line-height: 2rem;\n' +
    '            padding: 0 1rem;\n' +
    '            background-color: #E73273;\n' +
    '            text-align: center;\n' +
    '            color: white;\n' +
    '            border: none;\n' +
    '            border-radius: 5px;\n' +
    '            outLine: none;\n' +
    '        }\n' +
    '\n' +
    '        @keyframes animate {\n' +
    '            from {\n' +
    '                top: 10%;\n' +
    '                opacity: 0\n' +
    '            }\n' +
    '            to {\n' +
    '                top: 0%;\n' +
    '                opacity: 1\n' +
    '            }\n' +
    '        }';
  let styleNode = document.createElement('style');
  styleNode.id = 'alertStyle';
  styleNode.setAttribute('type', 'text/css');
  styleNode.innerHTML = style;
  document.body.appendChild(styleNode);
}

/*移除弹窗*/
function closeAlert() {
  let alertDialog = document.getElementById('alertDiv');
  let alertStyle = document.getElementById('alertStyle');
  alertDialog.style.display = 'none';
  document.body.removeChild(alertDialog);
  document.body.removeChild(alertStyle);
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