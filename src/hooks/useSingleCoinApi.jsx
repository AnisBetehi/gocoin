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
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod},
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': 'bc552b06eemsh3c08d6579da7c34p1bb76cjsn719c951e8508'
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