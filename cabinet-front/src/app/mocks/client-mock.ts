export const commonFiedls = {
  certificat: {
    usage: 'testUsage',
    typeOffre: 'testypeOfre',
    cleStructurePerimetreContractuel: 'testCle',
    domaine: [{ nom: 'test', extension: true, isValid: false }],
    restriction: '',
    editeurSolution: '',
    solution: '',
  },
};

export const mockOptions: Highcharts.Options = {
  chart: {
    type: 'spline',
  },
  title: {
    text: 'Gráfica Deudas y Beneficio',
  },
  subtitle: {
    text: 'Source: 2022',
  },
  exporting: {
    enabled: true,
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  yAxis: {
    title: {
      text: 'Temperature °C',
    },
  },
  tooltip: {
    valueSuffix: ' °C',
  },
  series: [
    {
      name: 'Deuda Hatim',
      type: 'line',
      data: [
        null,
        null,
        null,
        null,
        65311.72,
        54711.72,
        46936.72,
        37737.25,
        20959.25,
        1019.25,
        null,
        null,
      ],
    },
    {
      name: 'Ingreso Real',
      type: 'line',
      data: [
        null,
        null,
        null,
        null,
        10600,
        7775,
        9199.47,
        16778,
        19940,
        null,
        null,
        null,
      ],
    },
    {
      name: 'Ingreso Teorico',
      type: 'line',
      data: [
        null,
        null,
        null,
        null,
        12100,
        11375,
        18099.47,
        24578,
        34940,
        null,
        null,
        null,
      ],
    },
    {
      name: 'Deuda Empresa',
      type: 'line',
      data: [
        null,
        null,
        null,
        null,
        1500,
        3600,
        8900,
        7800,
        15000,
        null,
        null,
        null,
      ],
    },
  ],
};
