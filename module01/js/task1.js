'use strict';
function myFunction1() {
  const ADMIN_PASSWORD = 'm4ng0h4ckz';
  let message;
  let auth = prompt('Введите пароль');
  if (auth === null) {
    message = 'Отменено пользователем!';
  } else {
    if (auth === ADMIN_PASSWORD) {
      message = 'Добро пожалвоать!';
    } else {
      message = 'Доступ запрещен, неверный пароль!';
    }
  }

  alert(message);
}
