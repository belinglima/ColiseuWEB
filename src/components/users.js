import React, { Component } from 'react'
import api from '../services/api'
import { withRouter, Link } from 'react-router-dom'
import swal from 'sweetalert';
import Config from '../tempo'
import Menu from './menu';

class Users extends Component {


    state = {
        show: false,
        loader: true,
        users: []
    }

   async componentDidMount() {
    const id = localStorage.getItem('@Coliseu')
    const dados = await api.get(`/auth/company/${id}`)
    console.log(dados.data.users)
    this.setState({
        users: dados.data.users
    })

        setTimeout(function() {
            this.setState({ 
                show: true ,
                loader: false
            })
        }.bind(this), Config());

    }

    async vay (userId){
        const id = userId;
        const idc = localStorage.getItem('@Coliseu')
        const res = await api.delete(`/auth/user/${id}`);
        if(res) {
          const dados = await api.get(`/auth/company/${idc}`)
          if(dados) {
              this.setState({
                users: dados.data.users
              })
          }       
        }
      }
    
      deleteProduct(userId) {
        swal({
          title: "Você tem certeza?",
          text: "Seu usuário será deletado!",
          icon: "warning",
          buttons: true,
          buttons: ["Cancelar", "Deletar"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            this.vay(userId)
            this.setState({
              msg: 'Usuario deletado com sucesso.'
            })
          } 
        });
      }

    render(){

        const filtro = document.getElementById('search');
        const tabela = document.getElementById('datatable');
        if (filtro != null){
            filtro.onkeyup = function() {
            var nomeFiltro = filtro.value;
                for (var i = 1; i < tabela.rows.length; i++) {
                    var conteudoCelula = tabela.rows[i].cells[0].innerText;
                    var corresponde = conteudoCelula.indexOf(nomeFiltro) >= 0;
                    tabela.rows[i].style.display = corresponde ? '' : 'none';
                }
            };
        }
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
                            <h2 style={{ color: '#fff' }}>Usuários</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="card-panel" style={{ height: '60px', marginTop: '-30px', borderRadius: '22px' }}>
                            <div className="col s6">
                                Usuários
                            </div>
                            <div className="col s6" style={{marginTop: '-15px'}}>
                                <Link className="btn-floating corPadrao right" to="/addUser">
                                    <i className="material-icons right">add</i>
                                </Link>
                            </div>
                        </div>
                        <div  className="col s12">
                        <div className="card material-table">     
                            <div className="dataTabless_filter">
                                <label>Busca de usuarios:<input type="search" id="search" placeholder="" aria-controls="datatable" />
                                </label>
                            </div>
                            <table id="datatable">
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>E-Mail</th>
                                    <th>Data Nasc.</th>
                                    <th>Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.birthday.split('-')[2]+'/'+user.birthday.split('-')[1]+'/'+user.birthday.split('-')[0]}</td>
                                            <td>
                                                <a onClick={() => this.props.history.push(`/editUser/${user.id}`)}>
                                                    <div className="btn-floating corPadrao darken-4">
                                                        <i className="material-icons white-text">edit</i>
                                                    </div>
                                                </a>
                                                &nbsp;
                                                <a  onClick={() => this.deleteProduct(user.id, user.name)}>
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
    )}
}

export default withRouter(Users);