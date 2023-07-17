const express = require('express');
const cheerio = require('cheerio');
const app = express();
const client = require('./index.js');
const getSalons = () => {
  const salons = [];

  $('.srg .g').each((i, elem) => {
    const salon = {
      name: $(elem).find('.r a').text(),
      address: $(elem).find('.adr').text(),
      phone: $(elem).find('.phone').text(),
    };

    salons.push(salon);
  });

  return salons;
};
app.get('/', (req, res) => {
  const salons = getSalons();

  res.render('index.html', { salons });
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});