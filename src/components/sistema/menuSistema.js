import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import ReactTooltip from 'react-tooltip'

// componentes
// import { Evaluation } from './evaluation'
// import { Company } from './company'
// import { Home } from './home'

function menuSistema(props) {
  
    function handleLogout(){
      localStorage.clear()
      props.history.push('/')
    }

  return (
    <Router>
      <div>
        <nav className="sidenav sidenav-fixed menu-left corPadrao darken-4">
          <ul>
            <li>
              <Link to="/home" ><i class="large material-icons white-text">home</i></Link>
            </li>
            <li>
              <Link to="/company"><i class="large material-icons white-text">business</i></Link>
            </li>
            <li>
                <Link to="#Sair" onClick={handleLogout}><i class="large material-icons white-text">logout</i></Link>
            </li>
          </ul>
        </nav>

        {/* <Switch>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/evaluation">
            <Evaluation />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch> */}
      </div>
    </Router>
  );
}

export default withRouter(menuSistema);