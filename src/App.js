import React from 'react'
import style from './App.module.scss'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Checkers from './GameList/Checkers/Checkers'
import SecondGame from './GameList/SecondGame/SecondGame'
import ThirdGame from './GameList/ThirdGame/ThirdGame'
import Home from './Pages/Home/Home'
function App() {

  return (
    <Router>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route exact path="/checkers">
         <Checkers/>
      </Route>
      <Route exact path="/second-game">
        <SecondGame />
      </Route>
      <Route exact path="/third-game">
        <ThirdGame />
      </Route>
    </Router>
  );
}

export default App;
