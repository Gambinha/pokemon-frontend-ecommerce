import react, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import { CartContext } from "../../contexts";

import "./style.css";

function Cart() {
  const { cart, totalPrice, removeFromCart } = useContext(CartContext);
  let history = useHistory();

  function handleRemovePokemon(index, valor) {
    removeFromCart(index, valor);

    history.push("/cart");
  }

  function buy() {
    alert(`Compra Realizada no Valor de R$ ${totalPrice}`);
    history.push("/");
  }

  return (
    <div id="cart-page">
      <MenuBar></MenuBar>

      <div id="cart-container">
        <h2>Carrinho</h2>

        <div id="products">
          <div id="cart-products">
            {cart.map((product, index) => {
              return (
                <div className="product" key={product.id}>
                  <div id="logo">
                    <div id="img">
                      <img src={product.imagem} alt="" />
                    </div>

                    <h3>{product.nome}</h3>
                  </div>

                  <div id="quantidade">
                    <input
                      type="number"
                      name="qtd"
                      id=""
                      defaultValue={product.qtd}
                      disabled
                    />
                    <span>R$ {product.precoTotal}</span>
                    <button
                      id="excluir"
                      type="button"
                      onClick={() => handleRemovePokemon(index, product.precoTotal)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div id="totalPrice">
            <h2 id="buy-h3">Preço Total da Sua Compra:</h2>
            <span>R$ {totalPrice}</span>

            <button id="buy-button" onClick={buy} >
              FINALIZAR COMPRA
            </button>
          </div>
        </div>

        <Link to={`/catalogo`} className="goBackLink">
          <button id="goBack">Voltar</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
