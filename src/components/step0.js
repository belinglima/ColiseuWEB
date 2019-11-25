import React, { Component } from 'react'
import{ whithRouter } from 'react-router-dom'
import Menu from './menu';
import api from '../services/api'
        
class Step0 extends Component {

    state = {
        evaluation_id: '',
        antebraco: '0',
        bracoRelachado: '0',
        bracoContraido: '0',
        coxaProximal: '0',
        coxaMedial: '0',
        coxaDistal: '0',
        panturrilha: '0',
        abdomen: '0',
        ombro: '0',
        cintura: '0',
        altura: '0',
        peso: '0',

        loader: false

    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({evaluation_id: id})
    }

    handleSubmit = async e => {
        e.preventDefault()

        if (this.state.antebraco === '' || this.state.bracoRelachado === '' || this.state.bracoContraido === '' 
        || this.state.coxaProximal === '' || this.state.coxaMedial === '' || this.state.coxaDistal === '' 
        || this.state.panturrilha === '' || this.state.abdomen === '' || this.state.ombro === '' 
        || this.state.cintura === '' || this.state.altura === '' || this.state.peso === '') {
          this.setState({aviso: 'Erro... Campos necessarios a serem preenchidos'})
          return;
        }

        try{
            const response = await api.post(`/auth/weight`,{
                evaluation_id: this.state.evaluation_id,
                antebraco: this.state.antebraco,
                bracoRelachado: this.state.bracoRelachado,
                bracoContraido: this.state.bracoContraido,
                coxaProximal: this.state.coxaProximal,
                coxaMedial: this.state.coxaMedial,
                coxaDistal: this.state.coxaDistal,
                panturrilha: this.state.panturrilha,
                abdomen: this.state.abdomen,
                ombro: this.state.ombro,
                cintura: this.state.cintura,
                altura: this.state.altura,
                peso: this.state.peso
            })
            .then(res => {
                console.log(res)
                this.setState({loader: true})
                
                setTimeout(() => {
                    this.setState({ loader: false})
                    this.props.history.push(`/evaluation01/${this.state.evaluation_id}`);
                  }, 5000)
            })

        }catch(err){
            console.log('Erro: ... '+err)
        }


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
                                        <div className="btn-floating pulse">
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
    
                                <p>Segunda Etapa..</p>
                                    
                            <div className="row card aaa" style={{borderRadius: '10px'}}>
                              <div className="col s12">
                                  <br></br>
                              <label className="te">* Medidas serão relizadas todas em Centimentros(CM).</label>
                                 <p className="under">1º Medidas Normais</p>
                                 
                                    <div className="input-field col s2">
                                        <p>Panturrilha</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.panturrilha} 
                                            onChange={this.handleChange}
                                            name="panturrilha" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p>Abdomen</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.abdomen} 
                                            onChange={this.handleChange}
                                            name="abdomen" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p>Ombro</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.ombro} 
                                            onChange={this.handleChange}
                                            name="ombro" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p>Cintura</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.cintura} 
                                            onChange={this.handleChange}
                                            name="cintura" 
                                        />
                                    </div>

                                    <div className="input-field col s2">
                                        <p>Altura</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.altura} 
                                            onChange={this.handleChange}
                                            name="altura" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p>Peso</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.peso} 
                                            onChange={this.handleChange}
                                            name="peso" 
                                        />
                                    </div>                                  
                              </div>

                              <div className="col s12">
                                  <p className="under">2º Medidas Expert</p>
                                    <div className="input-field col s2">
                                        <p>Antebraço</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.antebraco} 
                                            onChange={this.handleChange}
                                            name="antebraco" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p className="texto">Braço Relachado</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.bracoRelachado} 
                                            onChange={this.handleChange}
                                            name="bracoRelachado" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p className="texto">Braço Contraido</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.bracoContraido} 
                                            onChange={this.handleChange}
                                            name="bracoContraido" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p>Coxa Proximal</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.coxaProximal} 
                                            onChange={this.handleChange}
                                            name="coxaProximal" 
                                        />
                                    </div>

                                    <div className="input-field col s2">
                                        <p>Coxa Medial</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.coxaMedial} 
                                            onChange={this.handleChange}
                                            name="coxaMedial" 
                                        />
                                    </div>
                                    <div className="input-field col s2">
                                        <p>Coxa Distal</p>
                                        <input className="te" min="0" type="number" 
                                            value={this.state.coxaDistal} 
                                            onChange={this.handleChange}
                                            name="coxaDistal" 
                                        />
                                    </div>                                  
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
    }
}

export default Step0