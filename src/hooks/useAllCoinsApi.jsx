import {useState, useEffect} from 'react';
import axios from "axios";

const useAllCoinsApi = (tier, timePeriod) => {
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(false);
  const [globalStats, setGlobalStats] = useState();

  const fetchCoinsData = async () => {
    setLoading(true);
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod,
          tiers: tier,
          orderBy: 'marketCap',
          orderDirection: 'desc',
          limit: '50',
          offset: '0'
        },
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': 'bc552b06eemsh3c08d6579da7c34p1bb76cjsn719c951e8508'
        }
      };
      
      const {data: {data}} = await axios.request(options);
      
      setCoins(data.coins);
      setGlobalStats(data.stats);
      setLoading(false);
      console.log(data.coins);
    }

    useEffect(() => {
      fetchCoinsData()
    }, [tier, timePeriod]);
    

    return [coins, globalStats, loading];
  
}

export default useAllCoinsApi;