import React from "react";
import {
  withRouter,
  Link
} from "react-router-dom";
import ReactTooltip from 'react-tooltip'

function Menu() {
  function handleLogout(){
    localStorage.clear()
  }

  return (
    <>
      <ReactTooltip />
      <div>
        <nav className="sidenav sidenav-fixed menu-left corPadrao darken-4">
          <ul>
            <li>
              <Link to="/home" data-tip="Home" data-place="right" data-effect="solid"><i className="large material-icons white-text">home</i></Link>
            </li>
            <li>
              <Link to="/company" data-tip="Empresa" data-place="right" data-effect="solid"><i className="large material-icons white-text">business</i></Link>
            </li>
            <li>
              <Link to="/users" data-tip="Usuários" data-place="right" data-effect="solid"><i className="large material-icons white-text">people</i></Link>
            </li>
            <li>
                <Link to="/evaluations" data-tip="Avaliações" data-place="right" data-effect="solid"><i className="large material-icons white-text">assignment</i></Link>
            </li>
            <li>
                <Link to={'/login'} onClick={() => handleLogout()} data-tip="Sair" data-place="right" data-effect="solid"><i className="large material-icons white-text">logout</i></Link>
            </li>
          </ul>
        </nav>

        
      </div>
    </>
  );
}

export default withRouter(Menu);
