import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './style.css';

import MenuBar from '../../components/MenuBar';
import { CartContext } from '../../contexts';

import data from '../../products.js';
import Rodape from '../../components/Rodape';

function Pokemon() {
    const params = useParams();
    const id = params.id;
    
    const [pokemonData, setPokemonData] = useState({});
    const [pokemonInfos, setPokemonInfos] = useState({});
    const [qtd, setQtd] = useState(1);

    const {addToCart} = useContext(CartContext);

    //chamada a api
    useEffect(() => {
        // api.get('/produtos', {

        // }).then(response => {
        //     setPokemonsData(response.data);
        // })

        setPokemonData(data.pokemons);
    }, [])

    useEffect(() => {
        console.log(pokemonData);
        if(!pokemonData.length > 0) {
            return;
        }
        else {
            const pokemon = pokemonData.find(x => x.id == id);
            setPokemonInfos(pokemon);
        }
    }, [pokemonData])

    useEffect(() => {
    }, [qtd])

    function handleAddToCart() {
        const valor = pokemonInfos.preco * qtd;

        const cartInfos = {
            id: pokemonInfos.id,
            nome: pokemonInfos.nome,
            imagem: pokemonInfos.imagem,
            precoTotal: valor,
            qtd
        }

        addToCart(cartInfos);
    }

    return(
        <div id="pokemon-page">
            <MenuBar></MenuBar>

            <div id="container">
                <div id="pokemon-container">
                    <div id="imagem">
                        <img src={pokemonInfos.imagem} alt="" />
                    </div>

                    <div id="infos">
                        <h2>{pokemonInfos.nome}</h2>
                        <span>{pokemonInfos.descricao}</span>

                        <div id="price">
                            <span>Preço: R$ {pokemonInfos.preco}</span>
                            <span>Estado: Em Estoque</span>
                            <span>Qtd: <input type="number" min="1" name="" id="" onChange={(e) => setQtd(e.target.value)}/></span>
                            <button onClick={handleAddToCart}>
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>

                <Link to={`/catalogo`} className="goBackLink">
                    <button id="goBack">
                        Voltar
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Pokemon;