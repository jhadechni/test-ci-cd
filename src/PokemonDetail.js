import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the pokemon data!", error);
      });
  }, [id]);

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Back to List</Link>
        {pokemon ? (
          <div className="card detail">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default PokemonDetail;

