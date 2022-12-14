let dictionary = document.querySelector('.dictionary');
let lineList = dictionary.querySelectorAll('.line');
let firstLine = lineList[0];

let inputText = document.getElementById('input-text');
inputText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    lineAdder();
  }
});

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {
  lineAdder();
});

let allCleanButton = document.getElementById('cleaner');
allCleanButton.addEventListener('click', () => {
  allClean();
});



function allClean() {
  if (lineList.length > 1) {
    for (let i = lineList.length - 1; i > 0; i--) {
      lineList[i].remove();
    }
    ordersUpdate();
  }
}

function lineAdder() {
  if (inputText.value.length > 0) {
    let cloneFirstLine = firstLine.cloneNode(true);
    let translitBlock = cloneFirstLine.querySelector('.translit');
    let cleanButtom = document.createElement('img');
    cleanButtom.src = 'icons/icon.svg';
    cleanButtom.alt = 'clean-icon';
    cleanButtom.addEventListener('click', (event) => {
      event.target.closest('.line').remove();
      ordersUpdate();
    });
    translitBlock.appendChild(cleanButtom);
    cloneFirstLine.querySelector('.origin p').innerText = cutter(inputText.value, cloneFirstLine, 'origin');
    cloneFirstLine.querySelector('.translit p').innerText = cutter(transliter(inputText.value), cloneFirstLine, 'translit');
    dictionary.appendChild(cloneFirstLine);
    ordersUpdate();
  }
}

function ordersUpdate() {
  inputText.value = '';
  lineList = dictionary.querySelectorAll('.line');
  let orderList = document.querySelectorAll('.order');
  for (let i = 1; i < orderList.length; i++) {
    orderList[i].innerText = `${i + 1}`;
  }
}

function cutter(str, element, type) {
  if (str.length > 7) {
    let fullTextBlock;
    if (type === 'origin') {      
      fullTextBlock = element.querySelector('.origin .text');
    } else if (type === 'translit') {
      fullTextBlock = element.querySelector('.translit .text');
    }
    let fullText = document.createElement('p');
    fullText.className = 'prompt';
    fullText.innerText = str;
    if (str.length > 150) {
      fullText.style.overflowY = 'scroll';
    }
    fullTextBlock.appendChild(fullText);
    str = `${str.slice(0, 7)}...`;
  }
  return str;
}

function transliter(str) {	

	let translit = {

		'??': 'a',    '??': 'b',    '??': 'v',    '??': 'g',    '??': 'd',

		'??': 'e',    '??': 'yo',   '??': 'zh',   '??': 'z',    '??': 'i',

		'??': 'y',    '??': 'k',    '??': 'l',    '??': 'm',    '??': 'n',

		'??': 'o',    '??': 'p',    '??': 'r',    '??': 's',    '??': 't',

		'??': 'u',    '??': 'f',    '??': 'h',    '??': 'c',    '??': 'ch',

		'??': 'sh',   '??': 'sch',  '??': '\'',   '??': 'y',    '??': '',

		'??': 'e',    '??': 'yu',   '??': 'ya',


		'??': 'A',    '??': 'B',    '??': 'V',    '??': 'G',    '??': 'D',

		'??': 'E',    '??': 'Yo',   '??': 'Zh',   '??': 'Z',    '??': 'I',

		'??': 'Y',    '??': 'K',    '??': 'L',    '??': 'M',    '??': 'N',

		'??': 'O',    '??': 'P',    '??': 'R',    '??': 'S',    '??': 'T',

		'??': 'U',    '??': 'F',    '??': 'H',    '??': 'C',    '??': 'Ch',

		'??': 'Sh',   '??': 'Sch',  '??': '\'',   '??': 'Y',    '??': '',

		'??': 'E',    '??': 'Yu',   '??': 'Ya'

	};

  let result = str.split('');
  result = result.map(x => translit[x] !== undefined ? x = translit[x] : x);
  return result.join('');  
}
