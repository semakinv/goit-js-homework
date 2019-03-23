'use strict';
function myFunction2() {
  let credits = 23580;
  let pricePerDroid = 3000;
  //let quantyty = 3;
  let quantyty = 5;
  //let quantyty = 8;
  //let quantyty = 12;
  let totalPrice = quantyty * pricePerDroid;
  if (totalPrice > credits) {
    console.log('Недостаточно средств на счету!');
  } else {
    console.log(
      `Вы купили ${quantyty} дроидов, на счету осталось ${credits -
        totalPrice} кредитов.`,
    );
  }
}
