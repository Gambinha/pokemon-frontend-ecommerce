import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";

import MenuBar from "../../components/MenuBar";
import { CartContext } from "../../contexts";

import data from "../../products.js";
import api from "../../services/api";
import Rodape from "../../components/Rodape";

function Catalogo() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [pokemonName, setPokemonName] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    //buscar da api
    api.get('/produtos', {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8; application/json'
    }).then(response => {
      console.log(response.data);
        setPokemons(response.data);
        setFilteredPokemons(response.data);
    })

    // setPokemons(data.pokemons);
    // setFilteredPokemons(data.pokemons);
  }, []);

  useEffect(() => {
    if (pokemonName != null) {
      let pokemons_array = pokemons;
      let filtered = pokemons_array.filter((pokemon) => {
        return pokemon.nome.indexOf(pokemonName) !== -1;
      });

      setFilteredPokemons(filtered);
    }
  }, [pokemonName]);

  useEffect(() => {
    if(typeof type != 'undefined') {
        let type_number;
        
        if(type == "Todos"){
            type_number = 0;
        }
        else if (type == "Elétrico") {
            type_number = 1;
        } else if (type == "Planta") {
            type_number = 2;
        } else if (type == "Água") {
            type_number = 3;
        } else if (type == "Normal") {
            type_number = 4;
        } else if (type == "Outros") {
            type_number = 5;
        }
    
        let pokemons_array = pokemons;
        let filtered = pokemons_array.filter((pokemon) => {
            if(type_number > 0) {
                return pokemon.tipo == type_number;   
            }
            else {
                return pokemon;
            }
        });
    
        setFilteredPokemons(filtered);
    }
  }, [type]);

  return (
    <div id="catalogo-page">
      <MenuBar></MenuBar>

      <div id="catalogo-container">
        <div id="filter">
          <h2>Catálogo</h2>

          <div id="search">
            <input
              type="text"
              name=""
              id=""
              placeholder="Pesquisar Pokemon"
              onChange={(e) => setPokemonName(e.target.value)}
            />

            <select id="pokeType" onChange={(e) => setType(e.target.value)}>
              <option>Todos</option>
              <option>Elétrico</option>
              <option>Planta</option>
              <option>Água</option>
              <option>Normal</option>
              <option>Outros</option>
              {/* //tipo 1 == eletrico
                          //tipo 2 == Planta
                            //tipo 3 == Agua
                            //tipo 4 == normal
                            //tipo 5 == outro */}
            </select>
          </div>
        </div>

        <div id="products-container">
          {filteredPokemons.map((pokemon) => {
            return (
              <div className="product" key={pokemon.id}>
                <div className="image">
                  <img src={pokemon.imagem} alt="" />
                </div>
                <h2>{pokemon.nome}</h2>
                <span>R$ {pokemon.preco}</span>

                <Link to={`/pokemon/${pokemon.id}`}>
                  <button>Visitar Pokemon</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Rodape></Rodape>
    </div>
  );
}

export default Catalogo;
