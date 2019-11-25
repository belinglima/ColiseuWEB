import React, { Component } from 'react'
import Config from '../tempo'
import Menu from './menu';
import api from '../services/api'
import { withRouter, Link } from 'react-router-dom'
import swal from 'sweetalert';

export default class Evaluation extends Component {


    state = {
        show: false,
        loader: true,

        evaluations: [],
        users: [],
        aviso: '',
    }

    async componentDidMount() {
        const dados = await api.get(`/auth/evaluation`)
        const users = await api.get('/auth/user')
        console.log(dados.data)
        this.setState({
            evaluations: dados.data,
            users: users.data
        })
        
        setTimeout(() =>{
            this.setState({ 
                show: true ,
                loader: false
            })   
        }, Config())
    }

    deleteEvaluation(userId) {
        swal({
          title: "Você tem certeza?",
          text: "Avaliação será deletada!",
          icon: "warning",
          buttons: true,
          buttons: ["Cancelar", "Deletar"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            this.vay(userId)
            this.setState({
              msg: 'Avaliação deletada com sucesso.'
            })
          } 
        });
      }

      async vay (userId){
        const res = await api.delete(`/auth/evaluation/${userId}`);
        if(res) {
          const dados = await api.get(`/auth/evaluation`)
          if(dados) {
              this.setState({
                evaluations: dados.data
              })
          }       
        }
      }

    render(){
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
                            <h2 style={{ color: '#fff' }}>Avaliações</h2>
                        </div>
                    </div>
            </div>
            <div className="container">
                    <div className="row">
                        <div className="card-panel" style={{ height: '60px', marginTop: '-30px', borderRadius: '22px' }}>
                        <div className="col s6">
                                Avaliação
                            </div>
                            <div className="col s6" style={{marginTop: '-15px'}}>
                                <Link className="btn-floating corPadrao right" to="/evaluation">
                                    <i className="material-icons right">add</i>
                                </Link>
                            </div>
                        </div>
                        <div  className="col s12">
                        <div className="card material-table">     
                            <div className="dataTabless_filter">
                                <label>Buscar Avaliação:<input type="search" id="search" placeholder="" aria-controls="datatable" />
                                </label>
                            </div>
                            <table id="datatable">
                                <thead>
                                <tr>
                                    <th>Cod.</th>
                                    <th>usuario</th>
                                    <th>Valor</th>
                                    <th>Ação</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.evaluations.map(el => (
                                        <tr key={el.id}>
                                            <td>{el.id}</td>
                                            {this.state.users
                                            .filter(user => el.user_id === user.id)
                                            .map(user => (
                                                <td key={user.id}>{user.name}</td>
                                            ))}
                                            <td>{(el.valorPago).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                                            <td>
                                                <a  onClick={() => this.deleteEvaluation(el.id)}>
                                                    <div className="btn-floating corPadrao darken-4">
                                                        <i className="material-icons white-text">delete</i>
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>                        
                        </div>
                    </div>
                </div>
        </div>
    }
    </div>
    )
}}

