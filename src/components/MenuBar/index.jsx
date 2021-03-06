import {Link} from 'react-router-dom';

import AiIcons, {AiOutlineShoppingCart} from "react-icons/ai";

import './style.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';

function MenuBar() {
    const [userData, setUserData] = useState();

    useEffect(() => {
        const user_id = localStorage.getItem('x-access-token');
        console.log(user_id);
        if(user_id) {
            api.get(`/usuario/${user_id}`, {

            }).then((response) => {
            console.log(response.data.nome);
            setUserData(response.data.nome);
        })
        }
        else {
            return;
        }
    }, []);
    
    return(
        <div id="container-menubar">
            <div id="logo">
                <Link to={'/'}>
                    <img src="" alt="" />
                </Link>
                <h1>POKESTORE</h1>
            </div>

            <div id="user">
                <Link to={'/cart'}>
                    <AiOutlineShoppingCart id="carrinho" color="black" size="40" />
                </Link>

                <span>{userData}</span>
            </div>
        </div>

    );
}

export default MenuBar;