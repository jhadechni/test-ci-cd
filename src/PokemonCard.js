import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card">
      <div className="pokemon-card-content">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <p>HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
        <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      </div>
    </Link>
  );
}

export default PokemonCard;
