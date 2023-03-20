// Requisição para pegar nomes dos meses
let meses = [];
async function carregarMeses() {
  const response = await fetch('http://127.0.0.1:8000/mes/');
  if (response.ok) {
    const data = await response.json();
    meses = data.map(mes => mes.title);
    console.log(meses); // meses está disponível aqui
  } else {
    throw new Error('Erro ao fazer requisição.');
  }
}

// Requisição para pegar o id dos equipamentos
let pontos = [];
async function carregarPontos() {
  const response = await fetch('http://127.0.0.1:8000/equipamentos/')
  if (response.ok) {
    const data = await response.json();
    pontos = data.map(ponto => ponto.id);
    console.log(pontos); // meses está disponível aqui
  } else {
    throw new Error('Erro ao fazer requisição.');
  }
}

let eficiencias = [];
async function carregarEficiencias() {
  const response = await fetch('http://127.0.0.1:8000/equipamentos/eficiencia/')
  if(response.ok) {
    const data = await response.json();
    eficiencias = data.map(eficiencia => [eficiencia.mes-1, eficiencia.equipamento-1, eficiencia.eficiencia]);
    console.log(eficiencias);
  } else {
    throw new Error('Erro ao fazer requisição.');
  }
}

Promise.all([carregarMeses(), carregarPontos(), carregarEficiencias()]).then(() => {
  Highcharts.chart('container', {
    chart: {
      type: 'heatmap',
      marginTop: 70,
      marginBottom: 35,
      plotBorderWidth: 1
    },
    xAxis: {
      categories: meses,
    },
    yAxis: {
      categories: pontos,
      title: null,
      reversed: true
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 70,
      symbolHeight: 280
    },
    tooltip: {
      formatter: function () {
        return this.point.value + '%';
      }
    },
    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: eficiencias,
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          yAxis: {
            labels: {
              formatter: function () {
                return this.value.charAt(0);
              }
            }
          }
        }
      }]
    }
  });
}).catch(error => console.log(error));
