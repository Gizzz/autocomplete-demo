/**
 * Target API server (Google Places API) doesn't suppor CORS, so we need a proxy.
 */

import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';

import * as dotenv from 'dotenv';
import * as circularJSON from 'circular-json';
import axios from 'axios';

import logResponse from './logResponse';

dotenv.config();

const key = process.env.GOOGLE_PLACES_API_KEY;
const serviceUrl = 'https://maps.googleapis.com';

const app = express();

// middlewares

app.use(compression());

app.use(
  express.static(
    path.resolve(__dirname, '../../dist'),
  ),
);

// routes

app.get('/proxy*', (req, res) => {
  const urlToForward = req.url.substr('/proxy'.length);
  const forwardedUrlWithKey = serviceUrl + urlToForward + `&key=${key}`;

  axios.get(forwardedUrlWithKey)
    .then((result) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(result.status).send(result.data);

      logResponse(`success`, result, forwardedUrlWithKey);
    })
    .catch((error) => {
      const serializedError = circularJSON.stringify(error);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(error.response.status).send(serializedError);

      logResponse(`error`, error, forwardedUrlWithKey);
    });
});

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../../dist/index.html'),
  );
});

// set port and start the proxy

app.set('port', (process.env.PORT || 9000));
app.listen(app.get('port'), () => {
  console.log('Google Places API - proxy is running on port', app.get('port'));
  console.log(`=================================================\n`);
});
