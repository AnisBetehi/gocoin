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
    console.log(priceHistory);

    console.log(coin);
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
                return <h4 onClick={() => setTimePeriod(period)}>{period}</h4>
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
                    <h4>{coin.websiteUrl.replace(/^https?:\/\//, '')}</h4>
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
  padding-block: 50px;
  gap: 2px;
  
  > img {
    width: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: tranlsate(-50%, -50%);
  }
`

const CoinHead = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
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
  gap: 20px;
  img {
    width: 50px;
  }

  > div {
    h1 {
      font-size: 2rem;
    }

    h4, svg {
      color: ${({change}) => change > 0 ? 'limegreen' : 'red'};
    }

    svg {
      font-size: 20px;
      font-weight: bolder;
      margin-right: 5px;
    }
  }
`

const CoinInfo = styled.div`
  display: flex;
  gap: 50px;

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
    padding: 2rem;
    background-color: ${({theme}) => theme.headerBg};

    > p {
      font-size: 14px;
      color: white;
      line-height: 25px;
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
    gap: 10px;
    padding-block: 1rem;
    font-weight: bolder;
  


    > h3 {
      font-size: 25px;
    }

    > div:first-of-type {
      display: flex;
      gap: 5px;

      h5 {
        padding: 5px;
        font-size: 15px;
        border-radius: 2px;
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
    gap: 20px;
    margin-top: 20px;

    > div {
      display: flex;
      align-items: center;
      padding: 5px;
      gap: 10px;

      svg {
        font-size: 20px;
      }

      > div {
        h4 {
          font-size: 14px;
          color: white;
        }

        a {
          font-size: 20px;
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
    padding-inline: 20px;

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
  gap: 5px;

  h4 {
    padding: 5px;
    font-size: 14px;
    width: 55px;
    background-color: ${({theme}) => theme.mainBg};
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      filter: brightness(120%);
    }
  }
`