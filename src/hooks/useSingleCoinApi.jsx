import {useState, useEffect} from 'react';
import axios from "axios";


const useSingleCoinApi = (id, timePeriod) => {
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);


  const fetchCoinData = async () => {
    setLoading(true);
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
        params: {referenceCurrencyUuid: process.env.REACT_APP_API_ID, timePeriod},
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_API_KEY
        }
      };
      
      const {data: {data: {coin}}} = await axios.request(options);
      setCoin(coin);
      setLoading(false);
      
    }

    useEffect(() => {
     fetchCoinData();
    }, [id, timePeriod]);
    

    return [coin, loading];
  
}

export default useSingleCoinApi;