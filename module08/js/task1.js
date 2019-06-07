('use strict');

import quizData from './quiz-data.js';

// Добавляет заголовок теста в начало списка вопросов
const title = document.createElement('h2');
title.textContent = quizData.title; //title: 'Тест на базовый уровень JavaScript.',
const body = document.querySelector('body');
body.prepend(title);
//==========================

// Добавляет блоки вопросов

const questArray = Object.values(quizData.questions); //массив с вариантами ответов
const button = document.querySelector('button');
const arrayRightAnswers = []; //массив правильных ответов

//Добавляем разметку с вариантами ответов
questArray.forEach((copyOfQestion, idx) => {
  const answers = copyOfQestion.choices.reduce(
    (acc, currentItem, index) =>
      acc +
      '<li>' +
      '<label>' +
      '<input type="radio" name="' +
      idx +
      '" value="' +
      index +
      '" />' +
      currentItem +
      '</label >' +
      '</li>',
    '<!--Answers list --> ',
  );

  //=============
  const htmlStringOfSection = `<section><h3>${idx + 1}.${
    copyOfQestion.question
  }</h3><ol> ${answers}</ol></section>`;
  button.insertAdjacentHTML('beforebegin', htmlStringOfSection);
  //Добавляем текст вопросов
  const qestionTitle = document.createElement('h3');
  qestionTitle.textContent = idx + 1 + `. ` + copyOfQestion.question;

  arrayRightAnswers.push(copyOfQestion.answer); // Наполняем массив правильных ответов
});

//Оформление
body.classList.add('wrapper');
document
  .querySelectorAll('section')
  .forEach(sectionItem => sectionItem.classList.add('wrapper'));
//Убираем нумерацию списка
document
  .querySelectorAll('li')
  .forEach(liItem => liItem.classList.add('list-item'));
//добавляем стиль кнопке "проверить"
button.classList.add('button-style');
//Делаем кнопку "проверить" неактивной
button.setAttribute('disabled', 'disabled');

//Функционал создания массива с ответами пользователя и активации кнопки "проверить"
const qestForm = document.querySelector('form');
qestForm.addEventListener('change', handleSubmitRadio);
const userAnswers = {}; //объект с ответами тестируемого
function handleSubmitRadio(event) {
  const indexOfQestion = event.target.name;
  const userAnswer = event.target.value;
  userAnswers[indexOfQestion] = userAnswer;
  const userAnswersArray = Object.values(userAnswers);
  //Активация кнопки
  if (userAnswersArray.length === arrayRightAnswers.length) {
    button.removeAttribute('disabled', 'disabled');
  }
  return userAnswersArray;
}

//Функционал оценки прохождения теста
qestForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  let score = 0;
  for (let i = 0; i < arrayRightAnswers.length; i += 1) {
    if (arrayRightAnswers[i] === Number(handleSubmitRadio(event)[i])) {
      score += 100 / arrayRightAnswers.length;
    }
  }
  if (Math.round(score) >= 80) {
    confirm(
      `Your score is ${Math.round(
        score,
      )} % 'Test passed!!! Congratulations!!!'`,
    );
  } else {
    confirm(
      `Your score is ${Math.round(
        score,
      )} % Test not passed!!! To successfully pass the test you need to score 80% or more. Try again.`,
    );
  }
}
