import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";

import api from "../../services/api";

import "./style.css";

function Cadastro() {
    const span_cadastro = React.createRef();
    const span_login = React.createRef();
    const form_cadastro = React.createRef();
    const form_login = React.createRef();

    const history = useHistory();

    const [name, setName] = useState('');
    const [emailCadastro, setEmailCadastro] = useState('');
    const [senhaCadastro1, setSenhaCadastro1] = useState('');

    const [emailLogin, setEmailLogin] = useState('');
    const [senhaLogin, setSenhaLogin] = useState('');

    function changeScreen() {
        if(form_cadastro.current && form_login.current) {
            form_cadastro.current.classList.toggle('hide-screen');
            form_login.current.classList.toggle('hide-screen');
        }

        if(span_cadastro.current && span_login.current) {
            span_cadastro.current.style.visibility = 'hidden';
            span_login.current.style.visibility = 'hidden';
        }

        return;
    }

    function handleCreateUser(e) {
        e.preventDefault();

        if(!name || !emailCadastro || !senhaCadastro1 ) {
            if(span_cadastro.current) {
                span_cadastro.current.style.visibility = 'visible';
                span_cadastro.current.innerHTML =  "*Campo não inserido!";
            }
            return;
        }

        if(senhaCadastro1.length < 8) {
            if(span_cadastro.current) {
                span_cadastro.current.style.visibility = 'visible';
                span_cadastro.current.innerHTML =  "*Senha menor que o exigido (8 Dígitos)!";
            }
            return;
        }

        api.post('/usuario', {
            nome: name,
            email: emailCadastro,
            senha: senhaCadastro1
        }).then((response) => {
            alert('Relizado com sucesso');

            if(span_cadastro.current) {
                span_cadastro.current.style.visibility = 'hidden';
            }

            return;
        }).catch(() => {
            if(span_cadastro.current) {
                span_cadastro.current.style.visibility = 'visible';
                span_cadastro.current.innerHTML =  "*Erro no Cadastro";
            }

            return;
        });
    }

    function handleLogin(e) {
        e.preventDefault();

        if(!emailLogin || !senhaLogin) {
            if(span_login.current) {
                span_login.current.style.visibility = 'visible';
                span_login.current.innerHTML =  "*Campo não inserido!";
            }
            return;
        }

        api.get(`/usuario/${emailLogin}/${senhaLogin}`, {
        }).then((response) => {
            const id = response.data;
            localStorage.setItem('x-access-token', id);

            history.push('/catalogo');
            return;
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div id="cadastro">
            <div id="form-container">
                <div id="informations">

                </div>

                {/* Cadastro */}
                <div className="form-cadastro" ref={form_cadastro} >
                    <form id="form1" onSubmit={handleCreateUser} method="post">
                        <h2>Cadastre-se</h2>
                        
                        <Input
                                name="nome" 
                                placeholder="Nome Completo" 
                                type="text"
                                value={name} 
                                onChange={ (e) => {setName(e.target.value) } }
                        />
                        <Input 
                                name="email" 
                                placeholder="Email" 
                                type="email"
                                value={emailCadastro} 
                                onChange={ (e) => {setEmailCadastro(e.target.value) } }
                        />
                        <Input 
                                name="password" 
                                placeholder="Senha" 
                                type="password"
                                value={senhaCadastro1} 
                                onChange={ (e) => {setSenhaCadastro1(e.target.value) } }
                        />                        
                        <span ref={span_cadastro} id="warning-cadastro">Teste</span>
                        <div className="buttons-container">
                            <button id="submit-cadastro" type="submit">
                                Cadastrar
                            </button>
                            <button onClick={changeScreen} className="login-button" type="button" >Já está cadastrado? Faça seu Login!</button>
                        </div>
                    </form>
                </div>

                {/* Login */}
                <div className="hide-screen form-login" ref={form_login} >
                    <form id="form2" onSubmit={handleLogin} method="post">
                        <h2>Entrar na Pokestore</h2>
                        
                        <Input 
                                name="email_login" 
                                placeholder="Email" 
                                type="email"
                                value={emailLogin} 
                                onChange={ (e) => {setEmailLogin(e.target.value) } }
                        />
                        <Input 
                                name="password_login" 
                                placeholder="Senha" 
                                type="password"
                                value={senhaLogin} 
                                onChange={ (e) => {setSenhaLogin(e.target.value) } }
                        />

                        <span ref={span_login} id="warning-login">Teste2</span>
                        <div className="buttons-container" id="buttons-login">
                            <button id="submit-login" type="submit">
                                Entrar
                            </button>
                            <div className="bottom-links">
                                <button onClick={changeScreen} className="cadastro-button" type="button" >Inscreva-se na Pokestore</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;