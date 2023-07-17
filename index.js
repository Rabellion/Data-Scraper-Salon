const axios = require('axios');
const cheerio = require('cheerio');
const {Client} = require('@googlemaps/google-maps-services-js');

const client = new Client({
  key: process.env.GOOGLE_MAPS_API_KEY,
});

const url = 'https://www.google.com/search?q=salons+near+me';

axios.get(url).then((response) => {
  const $ = cheerio.load(response.data);

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

  const salons = getSalons();

  // Use the Google Maps API to get the latitude and longitude of each salon
  for (const salon of salons) {
    const request = client.places.nearbySearch({
      location: {lat: salon.latitude, lng: salon.longitude},
      radius: 1000,
    });

    request.then((response) => {
      console.log(response.results);
    });
  }
});