/* {}   [] */
'use strict';

const wrap = document.getElementById('character__list');
document.body.onload = addElement;

let res;
async function getCharacters (page) {
	const url = 'https://rickandmortyapi.com/api/character?page=' + page;
	const responce = await fetch(url);
	res = await responce.json();

	while (wrap.children.length > 1) {
        wrap.removeChild(wrap.lastChild);
 	}

	for(let user = 0; user < res.results.length; user++) {
		let newDiv = document.createElement(`div`);
		newDiv.classList.add('item__block');
		newDiv.innerHTML = `<div class="wrapper"><div class="wrapper__item"><p class="item__text">${res.results[user]?.id}</p><p class="item__text">${res.results[user]?.name}</p><p class="item__text">${res.results[user]?.status}</p></div><div class="wrapper__button"><button btn-name="delete" onClick="handleRecordAction(event)" id="btn">Delete</button></div></div>`;
		wrap.appendChild(newDiv);

		newDiv.onmouseover = function() {
			this.style.backgroundColor = "rgb(22, 0, 63)";
		 }
		 newDiv.onmouseout = function() {
			this.style.backgroundColor = "rgb(43, 0, 124)";
		 }
		 
		 const pGet = document.querySelector('.select__get');
	  
		 newDiv.addEventListener('click', (event) => {
		 event.preventDefault();
			
		 pGet.innerHTML = res.results[user].name;
		 pGet.classList.add('is-visible');
	  
		 let el = document.querySelectorAll('.item__block');
	  
		 for (let user = 0; user < el.length; user++) {
			if(el[user].classList.contains('toggle__border')) {
			   el[user].classList.remove('toggle__border');
			}  
		 }  
		 newDiv.classList.add('toggle__border');
		 })
		}
}

function addElement() {
	getCharacters(1);
	pageNum.innerHTML = current_page;
}
	  
const actionList = {
   delete: (element) => {
     element.remove();
   },
};

function handleRecordAction(event) {
   event.stopPropagation();
   const curentRecord = event.target;
   const action = event.target.getAttribute('btn-name');

   if (action in actionList) {
     actionList[action](curentRecord.parentElement.parentElement.parentElement);
   }
   document.querySelector('.select__get').classList.remove('is-visible');
}

const btnList = document.querySelector('.button__list');

let btnPrev = document.createElement(`button`);
btnPrev.classList.add('btn__prev');
btnPrev.innerText = `${String.fromCharCode(8249)} prev`;
btnList.appendChild(btnPrev);

let pageNum = document.createElement('p');
pageNum.classList.add('page');
pageNum.innerText = `00`;
btnList.appendChild(pageNum);

let btnNext = document.createElement(`button`);
btnNext.classList.add('btn__next');
btnNext.innerText = `next ${String.fromCharCode(8250)}`;
btnList.appendChild(btnNext);

btnNext.addEventListener('click', () => {
	if (current_page < 42) {
		getCharacters(current_page+=1);
		pageNum.innerHTML = current_page;
		console.log('test')
	}
})
btnPrev.addEventListener('click', () => {
	if (current_page > 1) {
		getCharacters(current_page-=1);
		pageNum.innerHTML = current_page;
		console.log('test')
	}
})

let current_page = 1;

let prevPage = function() {
	if(current_page > res.length) {
		current_page--;
	}
}
let nextPage = function() {
	if(current_page < res.lengt) {
		current_page++;
	} 
}