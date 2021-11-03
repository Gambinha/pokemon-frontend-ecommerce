import {createContext, useState} from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    function addToCart(product_array) {
        let pos;
        let price = totalPrice;
        price += product_array.precoTotal;

        let newCart = cart;
        newCart.map((cart, index) => {
            if(cart.id == product_array.id) {
                pos = index;
            }

            return;
        });

        const findPokemon = newCart.find((x, index) => x.id == product_array.id);

        if(findPokemon) {
            let qtdInicial = Number(findPokemon.qtd);
            
            findPokemon.qtd = qtdInicial + Number(product_array.qtd);
            findPokemon.precoTotal += product_array.precoTotal;
        }
        else {
            setCart([...cart, product_array]);
            setTotalPrice(price);
        }
    }

    function removeFromCart(position, valor) {
        let price = totalPrice;
        price -= valor;

        let newArray = cart;
        newArray.splice(position, 1);

        setCart(newArray);
        setTotalPrice(price);
    }

    return(
        <CartContext.Provider value={{cart, totalPrice, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
}

// {
    // nome 
    // imagem
    // preco
    // quantidade
// }