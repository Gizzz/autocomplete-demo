/**
 * Target API server (Google Places API) doesn't suppor CORS, so we need a proxy.
 */

import * as express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

import logResponse from './logResponse';

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
        .send(result.data);

      logResponse(`success`, result, forwardedUrlWithKey);
    })
    .catch((error) => {
      res
        .status(error.response.status)
        .send(error.response.statusText);

      logResponse(`error`, error, forwardedUrlWithKey);
    });
});

app.set('port', (process.env.PORT || 9000));
app.listen(app.get('port'), () => {
  console.log('Google Places API - proxy is running on port', app.get('port'));
  console.log(`=================================================\n`);
});
