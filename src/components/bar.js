
import React, { Component } from "react";
import Chart from "react-apexcharts";
import api from '../services/api'

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "avaliações",
          data: []
        }
      ],
      ok: false
    };
  }

  async componentDidMount() {
    const response = await api.get('/novas')
    if(response) {
        response.data.map( (data) => (
          this.state.series[0].data.push(data.total),
            (data.mes === '01') ? this.state.options['xaxis']['categories'].push('Jeneiro'): '',
            (data.mes === '02') ? this.state.options['xaxis']['categories'].push('Fevereiro') : '',
            (data.mes === '03') ? this.state.options['xaxis']['categories'].push('Marco') : '',
            (data.mes === '04') ? this.state.options['xaxis']['categories'].push('Abril') : '',
            (data.mes === '05') ? this.state.options['xaxis']['categories'].push('Maio') : '',
            (data.mes === '06') ? this.state.options['xaxis']['categories'].push('Junho') : '',
            (data.mes === '07') ? this.state.options['xaxis']['categories'].push('Julho') : '',
            (data.mes === '08') ? this.state.options['xaxis']['categories'].push('Agosto') : '',
            (data.mes === '09') ? this.state.options['xaxis']['categories'].push('Setembro') : '',
            (data.mes === '10') ? this.state.options['xaxis']['categories'].push('Outubro') : '',
            (data.mes === '11') ? this.state.options['xaxis']['categories'].push('Novembro') : '',
            (data.mes === '12') ? this.state.options['xaxis']['categories'].push('Dezembro') : ''
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
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
           {this.state.ok === true ?
            <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            width="340"
          />
        : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;