import { myCanvas } from './main';
import outputToFile from './utils/outputToFile';

const saveToLocalBtn = document.querySelector('#save-to-local');
const loadFromLocalBtn = document.querySelector('#load-from-local');
const saveToFileBtn = document.querySelector('#save-to-file');
const loadFromFileBtn = document.querySelector('#load-from-file');
const upload = document.querySelector('#upload-file');

// 保存到本地
saveToLocalBtn.addEventListener('click', () => {
  localStorage.setItem('progress', myCanvas.toString());
});

// 从本地加载
loadFromLocalBtn.addEventListener('click', () => {
  const processData = localStorage.getItem('progress');
  myCanvas
    .load(processData)
    .then((_) => {
      // TODO 成功提示
    })
    .catch((_) => {
      // TODO 出错提示
    });
});

// 保存到文件
saveToFileBtn.addEventListener('click', () => {
  const processData = localStorage.getItem('progress');

  outputToFile(
    processData,
    'text/plain',
    `${new Date()
      .toISOString()
      .replace(/\.(.*)+/, '')
      .replace('T', '')}-progress.codeing101`,
  );
});

// 从文件加载
loadFromFileBtn.addEventListener('click', () => {
  upload.click();
});

upload.addEventListener('change', () => {
  const file = upload.files[0];
  const testResult =file.name.match(/\.(.*?)$/)

  if (Array.isArray(testResult) && testResult[1] !== 'codeing101') {
    // TODO 出错提示
    return
  }

  const fr = new FileReader();
  fr.readAsText(file);

  fr.onload = (e) => {
    let processData = e.target.result;

    myCanvas
      .load(processData)
      .then((_) => {
        // TODO 成功提示
      })
      .catch((_) => {
        // TODO 出错提示
      });
  };
});
