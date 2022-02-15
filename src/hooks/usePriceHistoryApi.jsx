import {useState, useEffect} from 'react';
import axios from "axios";


const usePriceHistoryApi = (id, timePeriod) => {
  const [priceHistory, setPriceHistory] = useState();
  const [loading, setLoading] = useState(false);


  const fetchPriceHistoryData = async () => {
    setLoading(true);
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod},
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': 'bc552b06eemsh3c08d6579da7c34p1bb76cjsn719c951e8508'
        }
      };
      
      const {data: {data: {history}}} = await axios.request(options);
      setPriceHistory(history);
      setLoading(false);
    }

    useEffect(() => {
     fetchPriceHistoryData();
    }, [id, timePeriod]);
    

    return [priceHistory, loading];
  
}

export default usePriceHistoryApi;