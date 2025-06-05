import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PokeCxt } from './contexts/PokemonContext';
import PokemonList from './routes/pokemon-list/PokemonList';
import PokemonDetail from './routes/pokemon-detail/PokemonDetail';

const App: React.FC = () => (
  <PokeCxt>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/pokemon" />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
      </Routes>
    </Router>
  </PokeCxt>
);

export default App;
