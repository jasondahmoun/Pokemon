import React, { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PokemonContext } from '../../contexts/PokemonContext';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('PokemonList doit être utilisé à l’intérieur d’un PokemonContext');
  }

  const { pokemons, fetchPokemons } = context;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPokemons()
      .catch(() => {
        setError('Impossible de récupérer la liste des Pokémons.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchPokemons]);

  if (loading) {
    return <p className="loading">⏳ Chargement des Pokémons...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!pokemons || pokemons.length === 0) {
    return <p className="error">Aucun Pokémon trouvé.</p>;
  }

  return (
    <div className="pokemon-list-container">
      <h1 className="title">LISTE DES POKÉMONS</h1>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => {
          const primaryType = pokemon.types?.[0]?.type?.name || 'inconnu';

          return (
            <li key={pokemon.name} className="pokemon-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'pokemon-link active' : 'pokemon-link'
                }
                to={`/pokemon/${pokemon.name}`}
              >
                <div className="pokemon-header">
                  <span className="pokemon-name">{pokemon.name.toUpperCase()}</span>
                  <span className="pokemon-type">{primaryType.toLowerCase()}</span>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonList;
