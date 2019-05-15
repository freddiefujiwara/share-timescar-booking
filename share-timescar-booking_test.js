Feature('Share timescar-booking');

Scenario('Booking for 6 hours pack', (I) => {
  //login
  I.amOnPage('https://share.timescar.jp/view/sp/reserve/input.jsp?scd='+process.env.TIMES_STATION);
  I.fillField('#cardNo1'   , process.env.TIMES_CARD_NO1);
  I.fillField('#cardNo2'   , process.env.TIMES_CARD_NO2);
  I.fillField('#tpPassword', process.env.TIMES_PASSWORD);
  I.click('#doLoginForTp');

  //reserve_page
  I.retry(10);
  I.see('予約登録','h2');
  I.retry(3);
  I.amOnPage('https://share.timescar.jp/view/sp/reserve/input.jsp?scd='+process.env.TIMES_STATION+'#reserve_page');
  I.selectOption('#carId'  , process.env.TIMES_CAR_ID);
  I.selectOption('#pack','６時間パック');

  //  calculate for 3 years after
  var date = new Date();
  date.setDate(date.getDate() + 7 * 3);
  var year  = String(date.getFullYear());
  var month = String(date.getMonth() + 1);
  var day   = String(date.getDate());
  if (month.length < 2) month = '0' + month;
  if (day.length < 2)   day   = '0' + day;
  I.selectOption('#dateStart',year + "-" + month + "-" + day + ' 00:00:00.0');

  I.selectOption('#hourStart','11');
  I.selectOption('#minuteStart','00');
  I.selectOption('#hourExtend','6');
  I.selectOption('#minuteExtend','00');
  I.click('#doCheck');

  //final confirmation
  I.click('#firstSubmitButton');
  I.click('#licenseAgreeButton');
});
