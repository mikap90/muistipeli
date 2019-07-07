import React from 'react';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';

import {Peli15} from './peli15';
import {Muistipeli} from './muistipeli';

export class Main extends React.Component {
    render() {
        const padding = { padding: 10, textDecoration: 'none', fontWeight: 'bold' }
        return <Router><div>
            <header>
            </header>
            <nav>
                <Link style={padding} to="/peli15">15-peli</Link>
                <Link style={padding} to="/muistipeli">Muistipeli</Link>
            </nav>
            <main id="main">
                <Switch>
                    <Route path="/peli15" component={Peli15} />
                    <Route path="/muistipeli" component={Muistipeli} />
                </Switch>
            </main>
            <footer>
                <br />
            </footer>
        </div></Router>
    }
}
