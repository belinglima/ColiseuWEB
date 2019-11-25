import React, { Component } from 'react'
import api from '../services/api'
import Config from '../tempo'
import Menu from './menu'

class AddUser extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        birthday: '',
        foto: null,
        
        username: 'padrao',
        isAdmin: 0,

        show: false,
        loader: false,
        aviso: ''
    }

    handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
    }

    handleImageChange = (e) => {
        this.setState({
          foto: e.target.files[0]
        })
      };

    handleSubmit = async e => {
        e.preventDefault()
   
        if (this.state.name === '' || this.state.email === '' 
        || this.state.password === '' || this.state.birthday === '' 
        || this.state.foto === '' || this.state.username === '' 
        || this.state.isAdmin === '') {
          this.setState({aviso: 'Erro... Campos necessarios a serem preenchidos'})
          return;
        }
    
        try {
            const company_idd = localStorage.getItem('@Coliseu')

            await api.post(`/auth/user`,{
                name: this.state.name,
                email: this.state.email,
                company_id: company_idd,
                password: this.state.password,
                birthday: this.state.birthday,
                foto: this.state.foto,
                username: this.state.name+this.state.username,
                isAdmin: this.state.isAdmin
            })
            .then(res => {
                console.log(res)
                let form_data = new FormData();
                form_data.append('image[]', this.state.foto);
                api.post(`/user/${res.data.data}/images`, form_data, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
            })

          this.setState({aviso: 'Ok! Usuário cadastrado com sucesso', loader: true})  
        } catch (erro) {
          this.setState({aviso: 'Erro: '+erro})
        }
        this.tempoAviso()
      }
    
      tempoAviso = () => {
        setTimeout(() => {
          this.setState({ loader: false})
          this.props.history.push('/users')
        //   window.location.reload()
        }, 5000)
      }

      apagar = () => {
          this.setState({
            name: '',
            email: '',
            company_id: '',
            password: '',
            birthday: '',
            foto: '',
            username: 'padrao',
            isAdmin: 0
          })
      }


    render(){
        return(
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
                            <h4 style={{ color: '#fff' }}>Cadastrar novo usuário</h4>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <form className="col s12">
                            <div className="card-panel" style={{ marginTop: '-40px', borderRadius: '22px' }}>
                                <div className="row">
                                    <form onSubmit={this.handleSubmit}>
                                    <br /><br />
                                        <div className="col s12 center">
                                            <label className="corPadrao white-text">Foto do Usuário</label>
                                            <div className = "file-field input-field">
                                                <div className = "btn corPadrao">
                                                <span>Selecionar</span>
                                                <input type = "file" 
                                                    name="image[]"
                                                    accept="image/png, image/jpeg"  
                                                    onChange={this.handleImageChange} 
                                                    required
                                                />
                                                </div>
                                                
                                                <div className = "file-path-wrapper">
                                                <input className = "file-path validate" type = "text"
                                                    placeholder = "Upload file" 
                                                    required
                                                    />
                                                </div>
                                            </div>
                                            
                                             </div><br /><br /><br />

                                        <div className="input-field col s6">
                                            <input name="name" value={this.state.name} 
                                            onChange={this.handleChange} 
                                            type="text"
                                            />
                                             <label className="active">Nome</label>
                                        </div>

                                        <div className="input-field col s6">
                                            <input name="email" type="email" className="validate" 
                                            value={this.state.email} 
                                            onChange={this.handleChange}
                                            />
                                            <label className="active">Email</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input name="password" type="text" className="validate"
                                            value={this.state.password} 
                                            onChange={this.handleChange}
                                            />
                                            <label className="active">Senha</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input name="birthday" type="date" className="validate"
                                            value={this.state.birthday} 
                                            onChange={this.handleChange}
                                            />
                                            <label className="active">Nascimento</label>
                                        </div>
                                        <div className="input-field col s11">
                                            <button className="btn-floating corPadrao right"
                                            style={{marginLeft: '50px', marginTop: '50p'}} 
                                                type="reset" onClick={this.apagar}>
                                                <i className="material-icons right">delete_forever</i>
                                            </button>
                                        </div>
                                        <div className="input-field col s1">
                                            <button className="btn-floating corPadrao right"
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
        )
    }
}

export default AddUser