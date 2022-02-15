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
    border-radius: 3px;
    display: flex;
    align-items: center;
    background-color: white;
    padding-inline: .5rem;

    @media(max-width: 900px) {
      width: 50%;
    }
`

const SearchInput = styled.input`
    outline: none;
    border: none;
    padding: .5rem;
    background: transparent;
    flex: 2;
`