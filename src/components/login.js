import React, {Component} from 'react'
import { Link, withRouter } from "react-router-dom";
import api from '../services/api'
import { login } from '../services/auth'

class Login extends Component {

    state = {
        email: "",
        password: "",
        error: ""
      };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
          this.setState({ error: "Preencha ( E-Mail e Senha ) para continuar!" });
        } else {
          try {
            const response = await api.post("/sessions", { email, password });
            if (response){
              login(response.data.token);
              localStorage.setItem('@Coliseu', 4)
              this.props.history.push("/");
            }
          } catch (err) {
            this.setState({
              error:
                "Houve um problema com o login."
            });
          }
        }
      };
      render(){
    return (
        <div>
        <div className="parallax-container targetTopo">
            <div className="parallax corPadrao">
                <div className="container">
                    <h2 style={{ color: '#fff' }}>Login</h2>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <form className="col s12 m6">
                    <div className="card-panel" style={{ marginTop: '-40px' ,borderRadius: '22px' }}>
                        <div className="row">
                        <form onSubmit={this.handleSignIn}>
                            <div className="input-field col s12">
                                <input name="email" type="email" className="validate" 
                                 onChange={e => this.setState({ email: e.target.value })}/>
                                <label>Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input name="password" type="text" className="validate" 
                                onChange={e => this.setState({ password: e.target.value })}/>
                                <label>Senha</label>
                            </div>
                            <div className="input-field col s12">
                                <button type="submit" className="btn-large corPadrao" 
                                    style={{ width: '40%', borderRadius: '28px' }}>
                                    ENTRAR
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                    { this.state.error ? 
                        <div className="msg">
                            {this.state.error}
                        </div>
                        : ''}
                </form>
            </div>
        </div>
    </div>
    )
};
}

export default withRouter(Login)