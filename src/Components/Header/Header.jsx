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
  padding-block: .9rem;
`


const Logo = styled.h1`
  color: ${({theme}) => theme.mainColor};
  font-size: clamp(16px, 22px, 25px);
  cursor: pointer;
  user-select: none;
`


const CurrencyContainer = styled.div`

  select, option {
    padding: .5rem;
    border: none;
    outline: none;
    color: ${({theme}) => theme.mainColor};
    background-color: ${({theme}) => theme.mainBg};
    font-weight: bolder;
  }

`


