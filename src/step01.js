import React, { Component } from 'react'
import api from './services/api'
import Menu from './components/menu'

class Step01 extends Component {

    state = {
        foto: '',
        loader: false,
        aviso: ''
    }

    handleImageChange = (e) => {
        this.setState({
          foto: e.target.files[0]
        })
      };

    handleSubmit = async e => {
        e.preventDefault()
        
        if (this.state.foto === '') {
          this.setState({aviso: 'Erro... Obrigado a selecionar fotos.'})
          return;
        }
 
        try {
            const { id }  = this.props.match.params;
        
            let form_data = new FormData();
                form_data.append('image[]', this.state.foto);
               await api.post(`/evaluation/${id}/images`, form_data, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })

          this.setState({aviso: 'Ok! Foto Enviada', loader: true})  
        } catch (erro) {
          this.setState({aviso: 'Erro: '+erro})
        }
        this.tempoAviso()
      }
    
      tempoAviso = () => {
        setTimeout(() => {
          this.setState({ loader: false})
          this.props.history.push('/evaluations')
        //   window.location.reload()
        }, 5000)
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
                                        <div className="btn btn-flat btn-small">
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
                                        <div className="btn-floating pulse">
                                            <i className="material-icons right">send</i>
                                        </div>
                                        &nbsp;&nbsp;
                                        <label>Fotos</label>
                                </div>
                            </div>
                            <br /><br /><br />
    
                                <p>Ultima Etapa..</p>
                                    
                            <div className="row card aaa" style={{borderRadius: '10px'}}>
                              <div className="col s12">
                                  <br></br>
                              <label className="te">* deve ser selecionado todas as 4 fotos.</label>
                                 <p className="under">Fotos da avaliação</p>
                                 
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
                              </div>

                              
    
                                <div className="col s12">
                                    <button className="btn btn-floating btn-small right" type="submit">
                                        <i className="material-icons right">save</i>
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
    }
}

export default Step01