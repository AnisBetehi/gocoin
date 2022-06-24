import React from 'react';
import styled from 'styled-components';
import {BsSearch} from 'react-icons/bs';

const Searchbar = ({searchInput, setSearchInput}) => {
  return (
    <SearchbarContainer>
        <BsSearch />
        <SearchInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='search currencies' />
    </SearchbarContainer>
  )
}

export default Searchbar;


const SearchbarContainer = styled.div`
    width: 50%;
    overflow: hidden;
    border-radius: .2em;
    display: flex;
    align-items: center;
    background-color: white;
    padding-inline: .5em;
    font-size: 1rem;

    > svg {
      font-size: 1.1em;
    }

    @media(max-width: 900px) {
      width: 50%;
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

const SearchInput = styled.input`
    outline: none;
    border: none;
    padding: .5em;
    background: transparent;
    font-size: .85em;
    flex: 2;
`