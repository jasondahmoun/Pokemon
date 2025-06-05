import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Pokemon } from '../types/Pokemon';


export const PokemonContext = createContext<PokeCxtType | undefined>(undefined);

export const PokeCxt: React.FC<PokeCxtProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectPokemon, setselectedPokemon] = useState<Pokemon | null>(null);

  const fetchPokemons = useCallback(async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await res.json();

      const detailPokemons: Pokemon[] = await Promise.all(
        data.results.map(async (p: { name: string }) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
          return await res.json();
        })
      );

      setPokemons(detailPokemons);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }, []);

  const fetchPokemonDetails = useCallback(async (name: string) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) {
        setselectedPokemon(null);
        return;
      }
      const data = await res.json();
      setselectedPokemon(data);
    } catch (error) {
      console.error('Erreur :', error);
      setselectedPokemon(null);
    }
  }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemons, selectPokemon, fetchPokemons, fetchPokemonDetails }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

interface PokeCxtType {
  pokemons: Pokemon[];
  selectPokemon: Pokemon | null;
  fetchPokemons: () => Promise<void>;
  fetchPokemonDetails: (name: string) => Promise<void>;
}

interface PokeCxtProps {
  children: ReactNode;
}