import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import {Audio} from './page/audio/Audio';
import {Community} from './page/community/Community';
import {CurbCraving} from './page/curbCraving/CurbCraving';
import {Home} from './page/home/Home';
import {LungsExercise} from './page/lungsExercise/LungsExercise';
import {QuitProgram} from './page/quitProgram/QuitProgram';
import {Account} from './page/account/Account'
import {PaidPrograms} from './page/paidPrograms/PaidPrograms';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className={'App'}>
                    <ul className={'navigation'}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/audio">Audio</Link>
                        </li>
                        <li>
                            <Link to="/quitProgram">QuitProgram</Link>
                        </li>
                        <li>
                            <Link to="/lungsExercise">LungsExercise</Link>
                        </li>
                        <li>
                            <Link to="/curbCraving">CurbCraving</Link>
                        </li>
                        <li>
                            <Link to="/community">Community</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/audio">
                            <Audio/>
                        </Route>
                        <Route path="/lungsExercise">
                            <LungsExercise/>
                        </Route>
                        <Route path="/quitProgram">
                            <QuitProgram/>
                        </Route>
                        <Route path="/curbCraving">
                            <CurbCraving/>
                        </Route>
                        <Route path="/community">
                            <Community/>
                        </Route>
                        <Route path="/account">
                            <Account/>
                        </Route>
                        <Route path="/paid-programs">
                            <PaidPrograms/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
