import React, { Component } from 'react'
import Donut from './donut';
import Bar from './bar';
import Config from '../tempo'
import Menu from './menu';

export default class Home extends Component {

    state = {
        show: false,
        loader: true
    }

    // async handleDados(){
    //     const id = localStorage.getItem('@Coliseu')
    //     const dados = await api.get(`/auth/company/${id}`)
    //     this.setState({
    //         name: dados.name,
    //         address: dados.address,
    //         cpfCnpj: dados.cpfCnpj,
    //         telephone: dados.telephone,
    //         images: dados.data.images[0].url
    //     })
    // }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ 
                show: true ,
                loader: false
            })
        }, Config());
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
                            {/* <Link to="/app">
                                <i className="material-icons left medium white-text">chevron_left</i>
                            </Link> */}
                            <h2 style={{ color: '#fff' }}>Home</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <form className="col s12">
                            <div className="card-panel" style={{ marginTop: '-50px', borderRadius: '22px' }}>
                            Dados Anuais.
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col s6">
                            <div className="card-panel" style={{ marginTop: '-20px', borderRadius: '22px' }}>
                                <p>Usuarios Novos.</p>
                                <Donut />
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="card-panel" style={{ marginTop: '-20px', borderRadius: '22px' }}>
                                <p>Avaliações Novas.</p>
                            <Bar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}}

