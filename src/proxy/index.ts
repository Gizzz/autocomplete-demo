/**
 * Target API server (Google Places API) doesn't suppor CORS, so we need a proxy.
 */

import * as express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const key = process.env.GOOGLE_PLACES_API_KEY;
const serviceUrl = 'https://maps.googleapis.com';

const app = express();

app.get('/proxy*', (req, res) => {
  const urlToForward = req.url.substr('/proxy'.length);
  const forwardedUrlWithKey = serviceUrl + urlToForward + `&key=${key}`;

  axios.get(forwardedUrlWithKey)
    .then((result) => {
      res
        .status(result.status)
        .send(result.statusText);

      console.log(`Request succeeded.`);
      console.log(`Status: ${result.status} - ${result.statusText}`);
      console.log(`Url: ${forwardedUrlWithKey}`);
      // Long version:
      // console.log(`Data: \n${result.data}\n`);
      console.log(`/**************************/\n`);
    })
    .catch((error) => {
      res
        .status(error.response.status)
        .send(error.response.statusText);

      console.log(`Request failed.`);
      console.log(`Status: ${error.response.status} - ${error.response.statusText}`);
      console.log(`Url: ${forwardedUrlWithKey}`);
      // Long version:
      // console.log(error);
      console.log(`/**************************/\n`);
    });
});

// app settings and bootstrap

app.set('port', (process.env.PORT || 9000));

app.listen(app.get('port'), () => {
  console.log('Google Places API - proxy is running on port', app.get('port'));
  console.log(`=================================================\n`);
});
