import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import { useData } from '../../context/dataContext';
import usePriceHistoryApi from '../../hooks/usePriceHistoryApi';
import useSingleCoinApi from '../../hooks/useSingleCoinApi';
import Loader from '../../images/Loader.gif';
import PriceChart from './PriceChart';
import { numberWithCommas } from '../../context/dataContext';
import {AiOutlineFall, AiOutlineRise} from 'react-icons/ai';
import {FaExternalLinkAlt} from 'react-icons/fa';

const CoinDetail = () => {
    const {id} = useParams();
    const {timePeriod, setTimePeriod} = useData();
    const [coin] = useSingleCoinApi(id, timePeriod);
    const [priceHistory] = usePriceHistoryApi(id, timePeriod);

  return (
    <CointDetailContainer>
      {coin && priceHistory?.length > 0 ? <>
      <CoinHead>
        <CoinTitle change={coin.change}>
            <img src={coin.iconUrl} alt="" />
            <div>
              <h5>{coin.name}</h5>
              <h1>${numberWithCommas(Number(coin.price).toFixed(2))}</h1>
              <h4>{coin.change > 0 ? <AiOutlineRise /> : <AiOutlineFall />}{coin.change}%</h4>
            </div>
        </CoinTitle>
        <CoinInfo>
          <div>
            <h5>Market cap</h5>
            <h4>${numberWithCommas(Number(coin.marketCap).toFixed(2))}</h4>
          </div>
          <div>
            <h5>Vol 24H</h5>
            <h4>${numberWithCommas(Number(coin['24hVolume']).toFixed(2))}</h4>
          </div>
          <div>
            <h5>Circulating supply</h5>
            <h4>{numberWithCommas(parseInt(coin.supply.circulating))}</h4>
          </div>
          <div>
            <h5>All Time High</h5>
            <h4>${numberWithCommas(Number(coin.allTimeHigh.price).toFixed(2))}</h4>
          </div>
        </CoinInfo>
      </CoinHead>
      <CoinBody>
          <ChartContainer>
          <div>
            <h4>{coin.name} price chart</h4>
            <Periods>
              {['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'].map(period => {
                return <h4 key={period} onClick={() => setTimePeriod(period)}>{period}</h4>
              })}
            </Periods>
          </div>
          <PriceChart id={id} priceHistory={priceHistory} />
        </ChartContainer>    
        <BasicInfo>
          <h3>Basic Info</h3>
          <div>
            <h5>Rank #{coin.rank}</h5>
            <h5>Mineable</h5>
          </div>
          <Links>
              <div>
                  <FaExternalLinkAlt />
                  <div>
                    <a target='_blank' href={coin.websiteUrl}>Website</a>
                    <h4>{coin.websiteUrl ? coin.websiteUrl.replace(/^https?:\/\//, '') : 'No website'}</h4>
                  </div>
              </div>

              <div>
                  <FaExternalLinkAlt />
                  <div>
                    <a target='_blank' href={`https://blockchain.info`}>Explorer</a>
                    <h4>blockchain.info</h4>
                  </div>
              </div>
          </Links>
        </BasicInfo> 
        <p>{coin.description ? coin.description.replace(/<\/?[^>]+(>|$)/g, "") : 'No Description available'}</p>  
      </CoinBody>
      </>
      : <img src={Loader} />
      }
    </CointDetailContainer>
  )
}

export default CoinDetail;


const CointDetailContainer = styled.section`
  width: 100vw;
  display: flex;
  min-height: 100vh;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-block: 3.1em;
  gap: .2em;
  font-size: 1rem;
  
  > img {
    width: 2.4em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

const CoinHead = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em;
  background-color: ${({theme}) => theme.headerBg};

  @media(max-width: 1000px) {
    flex-direction: column;
    gap: 30px;
    align-items: flex-start;
    padding-inline: 1.5rem;
  }
`

const CoinTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1em;
  img {
    width: 3.1em;
  }

  > div {
    h1 {
      font-size: 2em;
    }

    h4, svg {
      color: ${({change}) => change > 0 ? 'limegreen' : 'red'};
    }

    svg {
      font-size: 1.1em;
      font-weight: bolder;
      margin-right: .4em;
    }
  }
`

const CoinInfo = styled.div`
  display: flex;
  gap: 3.1em;

  > div {
    > h5 {
      color: ${({theme}) => theme.mainColor};
    }
  }

  @media(max-width: 800px) {
    flex-direction: column;
    gap: 20px;
  }
`

const CoinBody = styled.div`
    width: 90%;
    padding: 2em;
    background-color: ${({theme}) => theme.headerBg};

    > p {
      font-size: .9em;
      color: white;
      line-height: 1.5em;
      font-weight: 500;
    }

    @media(max-width: 1000px) {
      flex-direction: column;
      padding-inline: 1rem;
      
    }
`

const BasicInfo = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .6em;
    padding-block: 1em;
    font-weight: bolder;
  


    > h3 {
      font-size: 1.5em;
    }

    > div:first-of-type {
      display: flex;
      gap: .4em;

      h5 {
        padding: .4em;
        font-size: .95em;
        border-radius: .2em;
        background: gray;
      }

      h5:first-child {
        background: limegreen;
      }
    }

    @media(max-width: 1000px) {
      width: 100%;
      align-items: flex-start;
      gap: 20px;
    }
`

const Links = styled.div`

    display: flex;
    flex-direction: column;
    gap: 1.1em;
    margin-top: 1.1em;

    > div {
      display: flex;
      align-items: center;
      padding: ,4em;
      gap: .6em;

      svg {
        font-size: 1.1em;
      }

      > div {
        h4 {
          font-size: 1.1em;
          color: white;
        }

        a {
          font-size: 1.1em;
          text-decoration: none;
          color: ${({theme}) => theme.mainColor};
        }
      }
    }

    @media(max-width: 1000px) {
      gap: 30px;
    }
`

const ChartContainer = styled.div`
  width: 70%;
  float: right;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    padding-inline: 1.1em;

    @media(max-width: 1000px) {
      flex-direction: column;
      gap: 20px;

    }
  }

  @media(max-width: 1000px) {
    width: 100%;
    margin-block: 50px;
  }

`

const Periods = styled.div`
  display: flex;
  gap: .4em;

  h4 {
    padding: .4em;
    font-size: .9em;
    width: 3.4em;
    background-color: ${({theme}) => theme.mainBg};
    text-align: center;
    border-radius: .2em;
    cursor: pointer;
    user-select: none;

    &:hover {
      filter: brightness(120%);
    }
  }
`