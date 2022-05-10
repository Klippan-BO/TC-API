/* eslint-disable no-unused-vars */
/* eslint-disable no-path-concat */
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const db = require('../index');

const API = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_KEY}`;
const dir = `${__dirname}/unsplash.json`;

const getPhotos = () => {
  axios.get(API, {
    params: {
      count: 30,
      query: 'nature',
    },
  })
    .then((response) => {
      console.log(response.data);
      const photoList = response.data.map((e) => ({ url: e.urls.regular, thumb: e.urls.thumb }));
      fs.writeFile(dir, JSON.stringify(photoList), (err) => {
        if (err) {
          console.log(err);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadToDb = () => {

};
