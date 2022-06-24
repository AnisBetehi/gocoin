import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/dataContext';

const Header = () => {

  const navigate = useNavigate();

  const {tier, setTier, setTimePeriod} = useData();

  const changeTier = (e) => {
    setTier(e.target.value);
    setTimePeriod('24h');
    navigate('/');
  }

  return (
    <HeaderContainer>
        <Logo onClick={() => navigate('/')}>
            GOCOIN
        </Logo>
        <CurrencyContainer>
        <select value={tier} onChange={changeTier} name="currency" id="currency">
          <option value={1}>TIER 1</option>
          <option value={2}>TIER 2</option>
          <option value={3}>TIER 3</option>
        </select>
        </CurrencyContainer>
    </HeaderContainer>
  )
};

export default Header;


const HeaderContainer = styled.header`
  width: 100vw;
  background: ${({theme}) => theme.headerBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 7vw;
  padding-block: .9em;
  font-size: 1rem;

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


const Logo = styled.h1`
  color: ${({theme}) => theme.mainColor};
  font-size: clamp(1em, 1.3em, 1.5em);
  cursor: pointer;
  user-select: none;
`


const CurrencyContainer = styled.div`

  select, option {
    padding: .5em;
    border: none;
    outline: none;
    color: ${({theme}) => theme.mainColor};
    background-color: ${({theme}) => theme.mainBg};
    font-weight: bolder;
    font-size: .85em;
  }

`


