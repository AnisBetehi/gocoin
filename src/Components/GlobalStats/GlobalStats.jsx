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
    padding-inline: 3em;
    width: 100vw;
    padding-block: 2.4em;
    gap: 2em;
    font-size: 1rem;




    > div {
        display: flex;
        gap: 2.35em;
        font-size: .9em;

        h4 {
            color: ${({theme}) => theme.secondaryColor};

            > span {
                color: ${({theme}) => theme.mainColor};
                padding-left: .6em;
                
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

    
  @media(min-width: 1700px) {
    font-size: 1.3rem;
  }

  @media(min-width: 2000px) {
    font-size: 1.7rem;
  }

  @media(min-width: 3000px) {
    font-size: 2.5rem;
  }

  @media(min-width: 5000px) {
    font-size: 3rem;
  }
`

