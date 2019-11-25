import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import api from '../services/api'

class Donut extends Component {



  constructor(props) {
    super(props);

    this.state = {
      options: {
          labels: []
        },
      series: [],
      ok: false     
    }
  }



  async componentDidMount() {
    const response = await api.get('/novos');
    this.setState({dados: response.data})

    if(response) {
        response.data.map( (data) => (
          this.state.series.push(data.total),
          (data.mes === '01') ? this.state.options['labels'].push('Jeneiro'): '',
          (data.mes === '02') ? this.state.options['labels'].push('Fevereiro') : '',
          (data.mes === '03') ? this.state.options['labels'].push('Marco') : '',
          (data.mes === '04') ? this.state.options['labels'].push('Abril') : '',
          (data.mes === '05') ? this.state.options['labels'].push('Maio') : '',
          (data.mes === '06') ? this.state.options['labels'].push('Junho') : '',
          (data.mes === '07') ? this.state.options['labels'].push('Julho') : '',
          (data.mes === '08') ? this.state.options['labels'].push('Agosto') : '',
          (data.mes === '09') ? this.state.options['labels'].push('Setembro') : '',
          (data.mes === '10') ? this.state.options['labels'].push('Outubro') : '',
          (data.mes === '11') ? this.state.options['labels'].push('Novembro') : '',
          (data.mes === '12') ? this.state.options['labels'].push('Dezembro') : ''
        ))
    }

    this.tempoAviso();
  }

  tempoAviso = () => {
    setTimeout(() => {
      this.setState({ok: true})
    }, 1000)
  }

  render() {

    return (
      <div className="donut">
        {this.state.ok === true ?
          <Chart options={this.state.options} width="380" series={this.state.series} type="donut" />
        : ''}
      </div>
    );
  }
}

export default Donut;