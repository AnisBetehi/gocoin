import React, {useState, useContext} from "react";
import useAllCoinsApi from "../hooks/useAllCoinsApi";

const DataContext = React.createContext();


export const useData = () => {
    return useContext(DataContext);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const DataContextProvider = ({children}) => {

    const [tier, setTier] = useState(1);
    const [timePeriod, setTimePeriod] = useState('24h');
    const [coins, globalStats, loading] = useAllCoinsApi(tier, timePeriod);
    

  return (
    <DataContext.Provider value={{tier, setTier, coins, globalStats, loading, timePeriod, setTimePeriod}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider