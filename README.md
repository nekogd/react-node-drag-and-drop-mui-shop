# To start

Make sure both applications work on your local machine.
Launch both `clientside` and `serverside`.

## 1. Client Side: Standard CRA App

1. Navigate to folder `clientside`
2. `yarn install` or `npm install`. I recommend `yarn` because `yarn.lock` file is on repo.
3. `yarn start`
4. Navigate to `localhost:3000` in your browser

## 2. Server Side

1. Navigate to folder `serverside`
2. `yarn install`
3. `yarn dev`

This will start a backend on port localhost:8080.
If you edit ports, make sure to adapt file `clientside/services/axiosInstance.js` to provide new API baseUrl.

This could come from `.env` file but for hackathon purpose the current one is acceptable.
