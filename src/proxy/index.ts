/**
 * Target API server (Google Places API) doesn't suppor CORS, so we need a proxy.
 */

import * as express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();

app.get('/proxy*', (req, res) => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  // tslint:disable-next-line:max-line-length
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=5000&type=restaurant&keyword=cruise&key=${key}`;

  axios.get(url)
    .then((result) => {
      res.send(result.data);

      console.log(`Request succeeded. Data: \n`);
      console.log(result.data);
      console.log(`\n/**************************/\n\n`);
    })
    .catch((error) => {
      res
        .status(error.response.status)
        .send(error.response.statusText);

      console.log(`Request failed. Error: \n`);
      console.log(error);
      console.log(`\n/**************************/\n\n`);
    });
});

// app settings and bootstrap

app.set('port', (process.env.PORT || 9000));

app.listen(app.get('port'), () => {
  console.log('Google Places API - proxy is running on port', app.get('port'));
});
