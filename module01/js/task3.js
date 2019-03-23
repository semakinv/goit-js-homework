function myFunction3() {
  const country = 'Южная Америка ';
  switch (country) {
    case 'Индия':
      console.log(`Доставка в ${country} будет стоить 100 кредитов`);
      break;

    case 'Южная Америка':
      console.log(`Доставка в ${country} будет стоить 250 кредитов`);
      break;

    case 'Австралия':
      console.log(`Доставка в ${country} будет стоить 170 кредитов`);
      break;

    case 'Индия':
      console.log(`Доставка в ${country} будет стоить 80 кредитов`);
      break;
    case 'Ямайка':
      console.log(`Доставка в ${country} будет стоить 120 кредитов`);
      break;

    default:
      console.log('В вашей стране доставка не доступна');
  }
}
