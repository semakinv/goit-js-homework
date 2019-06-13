('use strict');
import galleryItems from '../gallery-items.js';

//Добавляем элементы

const ul = document.querySelector('ul.gallery');
galleryItems.forEach((items, idx) => {
  const htmlStringOfItem = `<li class="gallery__item"><a class="gallery__link" href="${
    items.original
  }"
        ><img class="gallery__image" src="${items.preview}"
            data-source="${items.original}"
            alt="${items.description}"
          /><span class="gallery__icon"><i class="material-icons">zoom_out_map</i></span></a></li>

`;
  ul.insertAdjacentHTML('afterbegin', htmlStringOfItem);
});

//Функционал открытия модального окна
const fullImageDiv = document.querySelector('div.lightbox');
ul.addEventListener('click', openFullImage);
function openFullImage(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    fullImageDiv.classList.add('is-open');
    const selectedImg = document.querySelector('img.lightbox___image');
    selectedImg.setAttribute('alt', event.target.alt);
    selectedImg.setAttribute('src', event.target.dataset.source);
  }
}

//Функционал закрытия модального окна
const closeFullImg = () => fullImageDiv.classList.remove('is-open');
//Функционал закрытия модального окна по нажатию на кнопку закрытия
const closeButton = document.querySelector('button.lightbox__button');
closeButton.addEventListener('click', closeFullImgByButton);
function closeFullImgByButton(event) {
  closeFullImg(event);
}

//Функционал закрытия модального окна по клику на пространство вне картинки
//(из задания не особо понятно, должно ли окно закрываться по клику на саму картинку, поэтому сделал только вне картинки)
const divOverlay = document.querySelector('div.lightbox__content');
divOverlay.addEventListener('click', closeFullImgByDivOverlay);

function closeFullImgByDivOverlay(event) {
  if (event.target === event.currentTarget) {
    closeFullImg(event);
  }
}
//Функционал закрытия модального окна по кнопке escape
document.querySelector('html').addEventListener('keydown', closeFullImgByEsc);
function closeFullImgByEsc(event) {
  if (event.code === 'Escape') {
    fullImageDiv.classList.remove('is-open');
    closeFullImg(event);
  }
}
