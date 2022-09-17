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

		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',

		'е': 'e',    'ё': 'yo',   'ж': 'zh',   'з': 'z',    'и': 'i',

		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',

		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',

		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',

		'ш': 'sh',   'щ': 'sch',  'ь': '\'',   'ы': 'y',    'ъ': '',

		'э': 'e',    'ю': 'yu',   'я': 'ya',


		'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',

		'Е': 'E',    'Ё': 'Yo',   'Ж': 'Zh',   'З': 'Z',    'И': 'I',

		'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',

		'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',

		'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',

		'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '\'',   'Ы': 'Y',    'Ъ': '',

		'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'

	};

  let result = str.split('');
  result = result.map(x => translit[x] !== undefined ? x = translit[x] : x);
  return result.join('');  
}
