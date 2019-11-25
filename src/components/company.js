import React, { Component } from 'react'
import api from '../services/api'
import Config from '../tempo'
import Menu from './menu'
 
class Company extends Component  {

    state = {
        name: '',
        address: '',
        cpfCnpj: '',
        telephone: '',
        images: '',
        show: false,
        loader: true,
        aviso: ''
    }

   async componentDidMount() {
        const id = localStorage.getItem('@Coliseu')
        const dados = await api.get(`/auth/company/${id}`)
        console.log(dados.data)
        this.setState({
            name: dados.data.name,
            address: dados.data.address,
            cpfCnpj: dados.data.cpfCnpj,
            telephone: dados.data.telephone,
            images: dados.data.images[dados.data.images.length -1].url
        })
        
        setTimeout(() =>{
            this.setState({ 
                show: true ,
                loader: false
            })   
        }, Config())
    }

    handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async e => {
        e.preventDefault()
   
        if (this.state.name === '' || this.state.address === '' 
        || this.state.cpfCnpj === '' || this.state.telephone === ''
        || this.state.images === '') {
          this.setState({aviso: 'Erro... Campos necessarios a serem preenchidos'})
          return;
        }
    
        try {
        const id = localStorage.getItem('@Coliseu')
        const dados = await api.put(`/auth/company/${id}`,{
          name: this.state.name,
          address: this.state.address,
          cpfCnpj: this.state.cpfCnpj,
          telephone: this.state.telephone
        })
        .then(res => {
         console.log(res)
        })

          this.setState({aviso: 'Ok! Dados atualizados com sucesso'})  
        } catch (erro) {
          this.setState({aviso: 'Erro: '+erro})
        }
        this.tempoAviso()
      }
    
      tempoAviso = () => {
        setTimeout(() => {
          this.setState({aviso: ''})
          window.location.reload()
        }, 5000)
      }

    render() {
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
                            <h3 style={{ color: '#fff' }}>Dados da empresa</h3>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <form className="col s12">
                            <div className="card-panel" style={{ marginTop: '-40px', borderRadius: '22px' }}>
                                <div className="row">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="input-field col s6">
                                            <input className="hide" value={this.state.name} />
                                            <h4>{this.state.name} </h4>
                                        </div>
                                        <div className="input-field col s6">
                                        <img src={this.state.images} style={{width: '150px', height: '150px', borderRadius: '120px'}} alt="imagem academia" />
                                        </div>
                                        <div className="input-field col s6">
                                            <input name="address" type="text" className="validate" 
                                            value={this.state.address} 
                                            onChange={this.handleChange}
                                            />
                                            <label className="active">Endereço</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input name="cpfCnpj" type="text" className="validate"
                                            value={this.state.cpfCnpj} 
                                            onChange={this.handleChange}
                                            />
                                            <label className="active">Cnpj/Cpf</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input name="telephone" type="text" className="validate"
                                            value={this.state.telephone} 
                                            onChange={this.handleChange}
                                            />
                                            <label className="active">Telefone</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <button className="btn-floating corPadrao"
                                            style={{marginLeft: '50px', marginTop: '50p'}} 
                                                type="submit">
                                                <i className="material-icons right">save</i>
                                            </button>
                                        </div>
                                        {this.state.aviso !== '' ?
                                            <div className='alert alert-info mt-3'>
                                            {this.state.aviso}
                                            </div>
                                        : ''}
                                    </form>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
        </div>
    )}
}
export default Company