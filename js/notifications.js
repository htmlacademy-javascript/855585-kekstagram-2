import {isEscapeKey} from './util.js';

const bodyElement = document.body;
const fragmentElement = document.createDocumentFragment();
const templateErrorElement = bodyElement.querySelector('#error').content.querySelector('.error');
const errorElement = templateErrorElement.cloneNode(true);
const errorButtonElement = errorElement.querySelector('.error__button');
const errorBlockElement = errorElement.querySelector('.error__inner');

const templateSuccessElement = bodyElement.querySelector('#success').content.querySelector('.success');
const successElement = templateSuccessElement.cloneNode(true);
const successButtonElement = successElement.querySelector('.success__button');
const successBlockElement = successElement.querySelector('.success__inner');

const showDataError = (error) => {
  fragmentElement.appendChild(error);
  bodyElement.append(fragmentElement);
};

// Функция для удаления сообщения
const closeMessageBox = (element) => {
  if (element) {
    element.remove(); // Удаляем элемент
  }
};

// Обработчик закрытия окна сообщения по клику
const onClickCloseMessage = (element) => {
  closeMessageBox(element);
};

// Обработчик закрытия окна сообщения по Esc
const onEscCloseMessage = (evt, element) => {
  if(isEscapeKey(evt)) {
    closeMessageBox(element);
  }
};

// Обработчик закрытия окна сообщения по нажатию на оверлэй
const onOverlayClick = (evt, messageBlock, element) => {
  if(!messageBlock.contains(evt.target)) {
    closeMessageBox(element);
  }
};

//Показ сообщения об ошибке отправки данных
const showError = () => {
  fragmentElement.appendChild(errorElement);
  bodyElement.append(fragmentElement);
  errorButtonElement.addEventListener('click', () => onClickCloseMessage(errorElement));
  document.addEventListener('keydown', (evt) => onEscCloseMessage(evt, errorElement));
  document.addEventListener('click', (evt) => onOverlayClick(evt, errorBlockElement, errorElement));
};

//Показ сообщения об успехе отправки данных
const showSuccess = () => {
  fragmentElement.appendChild(successElement);
  bodyElement.append(fragmentElement);
  successButtonElement.addEventListener('click', () => onClickCloseMessage(successElement));
  document.addEventListener('keydown', (evt) => onEscCloseMessage(evt, successElement));
  document.addEventListener('click', (evt) => onOverlayClick(evt, successBlockElement, successElement));
};

export {showDataError, showError, showSuccess};
