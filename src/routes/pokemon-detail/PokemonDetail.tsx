import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PokemonContext } from '../../contexts/PokemonContext';
import { PokemonType, PokemonCapability } from '../../types/Pokemon';
import './PokemonDetail.css';

const PokemonDetail: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName?: string }>();
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('PokemonDetail doit être utilisé à l’intérieur d’unPokemonContext');
  }

  const { selectPokemon, fetchPokemonDetails } = context;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonName) return;
    setLoading(true);
    setError(null);

    fetchPokemonDetails(pokemonName)
      .catch(() => {
        setError('Impossible de charger les détails du Pokémon.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pokemonName, fetchPokemonDetails]);

  if (loading) {
    return <p className="loading">Chargement...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!selectPokemon) {
    return <p className="error">Pokémon introuvable.</p>;
  }

  const spriteUrl = selectPokemon.sprites.front_default || '';
  const types = selectPokemon.types.map((t: PokemonType) => t.type.name);
  const abilities = selectPokemon.abilities.map((a: PokemonCapability) => a.ability.name);

  return (
    <div className="pokemon-detail-container">
      <h1 className="pokemon-name">{selectPokemon.name}</h1>

      {spriteUrl ? (
        <img
          className="pokemon-image"
          src={spriteUrl}
          alt={selectPokemon.name}
        />
      ) : (
        <div className="pokemon-image placeholder">Pas d’image</div>
      )}

      {types.length > 0 && (
        <div className="pokemon-section">
          <h2>Types</h2>
          <ul>
            {types.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      )}

      {abilities.length > 0 && (
        <div className="pokemon-section">
          <h2>Capacités</h2>
          <ul>
            {abilities.map((ability) => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
        </div>
      )}

      <Link className="back-link" to="/pokemon">
        ← Retour
      </Link>
    </div>
  );
};

export default PokemonDetail;
