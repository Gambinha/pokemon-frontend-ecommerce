import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { CartProvider } from './contexts';

import Cart from './pages/Cart';
import Catalogo from './pages/Catalogo';
import Pokemon from './pages/Pokemon';
import Login from './pages/Login';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <CartProvider>
                    <Route path='/' exact component={Catalogo} />
                    <Route path='/pokemon/:id'component={Pokemon} />
                    <Route path='/cart' component={Cart} />

                    <Route path='/login' component={Login} />
                </CartProvider>



            </Switch>
        </BrowserRouter>
    );
}

export default Routes;