import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
import Config from '../tempo'
import Menu from './menu';
import api from '../services/api'

export default class Evaluation extends Component {


    state = {
        show: false,
        loader: true,
        evaluation: [],
        users: [],

        usuario: '',
        foto: null,
        aviso: '',

        valor: ''
    }

    handleImageChange = (e) => {
        this.setState({
          foto: e.target.files[0]
        })
        
      };

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }


    async componentDidMount() {
        const { id }  = this.props.match.params;
        const company_id = localStorage.getItem('@Coliseu')
        const users = await api.get(`/auth/user`)

        console.log(users.data)

        this.setState({
            users: users.data
        })
        
        setTimeout(() =>{
            this.setState({ 
                show: true ,
                loader: false
            })   
        }, Config())
    }

    handleSubmit = async e => {
        e.preventDefault()

        if (this.state.valor === '' || this.state.usuario === '') {
          this.setState({aviso: 'Erro... Campos necessarios a serem preenchidos'})
          return;
        }

        try {
            const data = api.post(`/auth/evaluation`,{
                user_id: this.state.usuario,
                valorPago: this.state.valor
            })
            .then(res => {
                console.log(res)
                this.setState({loader: true})
                
                setTimeout(() => {
                    this.setState({ loader: false})
                    this.props.history.push(`/evaluation00/${res.data.data}`);
                  }, 5000)
            })
        } catch (erro) {
            this.setState({aviso: 'Erro: '+erro})
        }
    }

    render(){
        const { users } = this.state;
    return (
    <div>
        {this.state.loader === true ? 

            <div className="container fundo">
                <div className="row loader">
                    <div className="col s12 center">
                        <img src="../../logo.svg" width="100px" height="100px" />
                    </div>
                </div>
            </div>
            :

            <div>
                <Menu />
            <div className="orelha"></div>
            <div className="parallax-container targetTopo">
                    <div className="parallax corPadrao">
                        <div className="container">
                            {/* <Link to="/app">
                                <i className="material-icons left medium white-text">chevron_left</i>
                            </Link> */}
                            <h2 style={{ color: '#fff' }}>Avaliação</h2>
                        </div>
                    </div>
            </div>
            <div className="container">
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="card-panel" style={{ marginTop: '-40px', borderRadius: '22px' }}>
                        Avaliação
                        </div>
                        <div className="input-field  col s12 center">
                            <div className="col s2">
                                    <div className="btn btn-floating btn-small pulse">
                                        <i className="material-icons right">chevron_right</i>
                                    </div>
                                    &nbsp;&nbsp;
                                    <label>Usuários</label>
                            </div>
                            <div className="col s3">
                                <div className="linha">
                                    <label className="linhadentro">__________</label>
                                </div>
                            </div>
                            <div className="col s2">
                                    <div className="btn-flat">
                                        <i className="material-icons right">nature_people</i>
                                    </div>
                                    &nbsp;&nbsp;
                                    <label>Medidas</label>
                            </div>
                            <div className="col s3">
                                <div className="linha">
                                    <label className="linhadentro">__________</label>
                                </div>
                            </div>
                            <div className="col s2">
                                    <div className="btn-flat">
                                        <i className="material-icons right">send</i>
                                    </div>
                                    &nbsp;&nbsp;
                                    <label>Fotos</label>
                            </div>
                        </div>
                        <br /><br /><br />

                            <p>Primeira Etapa..</p>

                        <div className="row card">
                            <div className="input-field col s6">
                                <p>Usuário</p>
                                <select  className="browser-default inputUser validate"  name="usuario"
                                    onChange={this.handleChange}>
                                        <option onChange={this.handleChange} defaultValue="001" value="001">Selecione Usuario</option>
                                    {  
                                        users.map((el) => (    
                                            <option key={el.id} value={el.id} onChange={this.handleChange}>{el.name}</option>
                                        ))
                                    }
                                </select> 
                            </div>

                            <div className="input-field col s6">
                                <p>Valor da Avaliação</p>
                                <input type="number" 
                                    value={this.state.valor} 
                                    onChange={this.handleChange}
                                    name="valor" 
                                />
                            </div>

                            <div className="col s12">
                                <button className="btn btn-floating btn-small right" type="submit">
                                    <i className="material-icons right">keyboard_tab</i>
                                </button>
                            </div>
                            <br/>
                            <p style={{color: 'white'}}>.</p>
                            {this.state.aviso !== '' ?
                                <div className='alert alert-info mt-3'>
                                {this.state.aviso}
                                </div>
                            : ''}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
    </div>
    )
}}

