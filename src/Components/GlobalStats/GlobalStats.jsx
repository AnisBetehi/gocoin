import React from 'react';
import { useData } from '../../context/dataContext';
import styled from 'styled-components';
import { numberWithCommas } from '../../context/dataContext';



const GlobalStats = () => {

    const {globalStats} = useData();

  return (
    <GlobalStatsContainer>
     {globalStats && <>
            <div>
                <h4>Cryptocurrencies: <span>{numberWithCommas(globalStats.totalCoins)}</span></h4>
                <h4>Markets: <span>{numberWithCommas(globalStats.totalMarkets)}</span></h4>
            </div>
            <div>
                <h4>Market cap: <span>${numberWithCommas(globalStats.totalMarketCap)}</span></h4>
                <h4>Volume 24H: <span>${numberWithCommas(globalStats.total24hVolume)}</span></h4>
            </div>
            <div>
                <h4>Total exchanges: <span>{globalStats.totalExchanges}</span></h4>
            </div>
    </>    
    }
    </GlobalStatsContainer>
  )
}

export default GlobalStats;


const GlobalStatsContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 3rem;
    width: 100vw;
    padding-block: 40px;
    gap: 2rem;


    > div {
        display: flex;
        gap: 40px;
        font-size: 14px;

        h4 {
            color: ${({theme}) => theme.secondaryColor};

            > span {
                color: ${({theme}) => theme.mainColor};
                padding-left: 10px;
                
            }
        }
    }


    @media(max-width: 700px) {
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;

        > div {
            width: 100%;
            gap: 20px;
            flex-direction: column;
            text-align: center;
        }

        > div:nth-child(2) {
            
        }
    }
`

