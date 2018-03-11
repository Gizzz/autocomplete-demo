# autocomplete-demo

Tech demo of autocomplete (client for Google Places API).  
Live version: https://powerful-savannah-11659.herokuapp.com/
  
The idea was to create Google-like autocomplete experience. This app is made for educational purposes and non-commercial, so please don't sue me Google 🙏😅  
The app uses [Google Places API (Web Service)](https://developers.google.com/places/web-service/intro) to get data from.  It doesn't support CORS and can't be accessed directly from client, so I wrote tiny proxy server to overcome this limitation.

## Features

- typescript for type safety
- proxy server to overcome lack of CORS support by target API server
- input debouncing to prevent server overloading
- stale requests cancellation to make result sets ordering independent from network delays
- autocomplete suggestions selection form keyboard (arrow navigation, select on enter)
- loading of more search results on demand
- responsive web desing (360px and larger widht devices)

## Tech Stack

- Typescript
- React 16
- SASS, BEM
- Webpack 3
- Node 8.x, Express 4.x

## Local Development

Install dependencies:

```
npm install
```

### development scripts

- `proxy` - start proxy server (backend side)
- `dev` - start webpack dev server (frontend side)
- `lint` - lint scripts with ts-lint

### build scripts

- `build-dev` - create dev build (unoptimized, fast build time)
- `build-prod` - create production build (optimized, slow build time)
- `publish` - publish master branch to production stage
- `heroku-postbuild` - build assets on production stage (runs automatically on prod-stage site)
- `start` - start production server (runs automatically on prod-stage site)
