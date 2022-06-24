import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/dataContext';
import styled from 'styled-components';
import Loader from '../../images/Loader.gif';
import Searchbar from '../SearchBar/searchbar';
import { numberWithCommas } from '../../context/dataContext';

const CoinsTable = () => {

    const navigate = useNavigate();
    const {coins, tier, loading, timePeriod, setTimePeriod} = useData();
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setSearchInput('');
    }, [tier, timePeriod])
    

    const filteredList = (list) => {
        return list.filter(coin => coin.name.toLowerCase().includes(searchInput.toLowerCase()) || coin.symbol.toLowerCase().includes(searchInput.toLowerCase()));
    }

  return (
    <CoinsTableContainer>
        {loading ? <LoaderImg src={Loader} alt='loader' /> : 
        <> 
        <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} />
        <Table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Coin</th>
                    <th>Market Cap</th>
                    <th>Price</th>
                    <th>Volume 24h</th>
                    <th>Listed At</th>
                    <th>Change {timePeriod}</th>
                    <th>
                    <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} name="currency" id="currency">
                        <option value='3h'>3H</option>
                        <option value='24h'>24H</option>
                        <option value='7d'>7D</option>
                        <option value='30d'>30D</option>
                        <option value='3m'>3M</option>
                        <option value='1y'>1Y</option>
                        <option value='3y'>3Y</option>
                        <option value='5y'>5Y</option>
                    </select>
                    </th>
               </tr>
            </thead> 
            <tbody>
                {coins && filteredList(coins).length > 0 ? filteredList(coins).map(coin => {
                    return (
                        <tr key={coin.uuid} onClick={() => navigate(`/coins/${coin.uuid}`)}>
                            <td>{coin.rank}</td>
                            <td>
                                <img src={coin.iconUrl} alt={coin.symbol} />
                                <div>
                                    <h3>{coin.name}</h3>
                                    <h4>{coin.symbol}</h4>
                                </div>
                            </td>
                            <td>{coin.marketCap ? '$'+ numberWithCommas(coin.marketCap) : '#'}</td>
                            <td>{coin.price ? '$'+ numberWithCommas(Number(coin.price).toFixed(2)) : '#'}</td>
                            <td>{coin['24hVolume'] ? '$' + numberWithCommas(coin['24hVolume']) : '#'}</td>
                            <td>{coin.listedAt ? coin.listedAt : '#'}</td>
                            <Change change={coin.change ? coin.change : null}>{coin.change ? coin.change + '%' : '#'}</Change>
                            <td>#</td>
                        </tr>
                    )
                }) : <tr><td  colSpan='100%'>No Results found..</td></tr>}
            </tbody>    
        </Table>
        </>}
    </CoinsTableContainer>
  )
}

export default CoinsTable;


const CoinsTableContainer = styled.div`
    position: relative;
    width: 80%;
    margin: 0 auto;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1em;
    font-size: 1rem;

    @media(max-width: 1000px) {
        width: 100vw;
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

const LoaderImg = styled.img`
    position: absolute;
    width: 2.5em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`


const Table = styled.table`
    width: 100%;

    thead {
        background-color: ${({theme}) => theme.headerBg};
        color: white;
        padding: 1em;

        th {
            padding-inline: .3em;
        }

    }


    tr {
        background: ${({theme}) => theme.headerBg};
    }

    tbody tr {
        cursor: pointer;
        transition: .2s ease;

        td {
            padding-block: 1em;
        }
    }

    tbody tr:hover {
        filter: brightness(120%);
    }



    td:nth-child(2) {
        display: flex;
        text-align: left;
        gap: .95em;
        padding-left: 1.1em;

        img {
            width: 2.4em;
            object-fit: cover;


            @media(max-width: 700px) {
                width: 20px;
            }
        }
    }

    th {
        color: ${({theme}) => theme.mainColor};
    }

    th, td {
        padding-block: .7em;
        font-size: .9em;
        text-align: center;
        font-weight: bolder;

        h4 {
            margin-top: .4em;
        }

        h3 {
            color: ${({theme}) => theme.mainColor};
        }
        > select {
            padding: .2em .4em;
            background-color: ${({theme}) => theme.mainBg};
            color: ${({theme}) => theme.mainColor};
            border: none;
            outline: none;
            font-weight: bolder;
            font-size: 1em;
        }
    }

    td:not(:nth-child(7)) {
        color: white;
    }

    @media(max-width: 800px) {
        thead th, tbody td {
            font-size: 12px;

            > select, option {
                font-size: 12px;
            }
        }

        thead th:nth-child(6), tbody td:nth-child(6), thead th:nth-child(3), tbody td:nth-child(3), thead th:nth-child(1):not(:only-child), tbody td:nth-child(1):not(:only-child) {
            display: none;
        }
    }
`

const Change = styled.td`
    color: ${({change}) => change > 0 ? 'limegreen' : 'red'};
`



