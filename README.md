# GOCOIN
### [**GOCOIN**](https://gocoin.netlify.app) is a cryptocurency tracker web app, it gives you details about the top 50 currencies in the market.


## How to run the app
1. Download the code or clone the repository
```
  $ git clone https://github.com/AnisBetehi/gocoin.git
```
2. Cd into the app folder

3. Install all dependencies using [npm](https://www.npmjs.com/) by running either of these commands
```
  npm i
```
```
  npm install
```

4. After the installation is complete, you can run the command `npm start` to start the app on [https://localhost:5000](https://localhost:5000)

# What the app looks like

[![Untitled.png](https://i.postimg.cc/8C8mzx4r/Untitled.png)](https://postimg.cc/VJRC7G3Y)

[![Web-capture-25-2-2022-151650-gocoin-netlify-aspp.jpg](https://i.postimg.cc/85pWFG6s/Web-capture-25-2-2022-151650-gocoin-netlify-aspp.jpg)](https://postimg.cc/zLQ3M9p1)

# Features

- The app provides global stats at the top of the home page.

- The top 50 currencies in the market are displayed in a table along with their stats (market Cap, price, 24h volume, 24h change).

- You can check the top 50 currencies from each tier (from 1 to 3).

- You can change the time period to get the stats you want.

- You can search currencies by their name or symbol e.g: Bitcoin or BTC.

- If you click on a certain row it will take you to a detailed page about the currency.

- The Detailed page gives additional information such as:

  - A background / description of the currency.

  - The currency's official website.

  - The currency's circulating supply.

  - A price chart that displays the currency's price over the selected time period.

- Changing the tier or time period automatically clears the search field.

- While on the details page, changing the tier will redirect you to the home page.

  


## Dependencies
- [React router](https://reactrouter.com/)

- [Styled components](https://styled-components.com/)

- [Chartjs](https://www.chartjs.org/)

## API's used

- [Coinranking API](https://developers.coinranking.com/api/documentation)

- [Rapid api](https://rapidapi.com/)
