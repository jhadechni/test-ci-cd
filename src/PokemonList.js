import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    fetchData(`${backendUrl}/pokemon?offset=0&limit=20`);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      const detailedPokemons = await Promise.all(
        response.data.results.map(pokemon => axios.get(pokemon.url))
      );
      setPokemons(detailedPokemons.map(p => p.data));
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleNextPage = () => {
    if (nextUrl) {
      fetchData(nextUrl);
    }
  };

  const handlePrevPage = () => {
    if (prevUrl) {
      fetchData(prevUrl);
    }
  };

  return (
    <div className="App">
        <h1 style={{color : "white", fontSize : 100}}>Pokémon Collection</h1>
      <div className="cards-container">
        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={!prevUrl}>Previous</button>
        <button onClick={handleNextPage} disabled={!nextUrl}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;


