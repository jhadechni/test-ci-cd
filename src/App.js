import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [characters, setCharacters] = useState([]);
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    axios.get(`${backendUrl}?page=${page}`)
      .then(response => {
        setCharacters(response.data.results);
        setPageInfo(response.data.info);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleNextPage = () => {
    if (pageInfo.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo.prev) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a test for CI/CD digital ocean with github actions by jhadechni.
        </p>
        <p>
        Api used {backendUrl}
        </p>
      </header>
      <h1 style={{color:"white"}}>Rick and Morty Characters</h1>
      <div className="cards-container">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={!pageInfo.prev}>Previous</button>
        <button onClick={handleNextPage} disabled={!pageInfo.next}>Next</button>
      </div>
    </div>
  );
}

function CharacterCard({ character }) {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
    </div>
  );
}

export default App;


