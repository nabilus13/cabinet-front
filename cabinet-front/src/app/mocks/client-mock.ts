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

export const mockLineOptions: Highcharts.Options = {
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
      text: 'Valeur en Dirham',
    },
  },
  tooltip: {
    valueSuffix: 'Dirham',
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
export const mockBarOptions: Highcharts.Options = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Gráfico Contabilidad',
  },
  subtitle: {
    text:
      'Source: 2022 <a' +
      'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
      'target="_blank">Wikipedia.org</a>',
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
    min: 0,
    title: {
      text: 'Valeur en Dirham',
    },
    labels: {
      overflow: 'justify',
    },
  },
  tooltip: {
    valueSuffix: 'Dirham',
  },
  series: [
    {
      name: 'Prix',
      type: 'column',
      data: [
        null,
        null,
        null,
        null,
        12700,
        32200,
        39100,
        51800,
        57100,
        null,
        null,
        null,
      ],
    },
    {
      name: 'Comission',
      type: 'column',
      data: [
        null,
        null,
        null,
        null,
        600,
        1800,
        1200,
        1300,
        2000,
        null,
        null,
        null,
      ],
    },
    {
      name: 'Totale Caisse',
      type: 'column',
      data: [
        null,
        null,
        null,
        null,
        11200,
        28600,
        30200,
        44000,
        42100,
        null,
        null,
        null,
      ],
    },
    {
      name: 'Manque à payer',
      type: 'column',
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
    {
      name: 'Charges Fixes',
      type: 'column',
      data: [
        null,
        null,
        null,
        null,
        0,
        19025,
        19800.53,
        25922,
        20160,
        null,
        null,
        null,
      ],
    },
    {
      name: 'Profit Réel',
      type: 'column',
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
      name: 'Profit Théorique',
      type: 'column',
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
  ],
};
export const mockPieOptions: Highcharts.Options = {
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Browser market shares',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  series: [
    {
      name: 'Nombre de Plans',
      colorByPoint: true,
      type: 'pie',
      data: [
        {
          name: 'mai',
          y: 9,
        },
        {
          name: 'juin',
          y: 20,
        },
        {
          name: 'juillet',
          y: 17,
        },
        {
          name: 'aout',
          y: 31,
        },
        {
          name: 'septembre',
          y: 23,
        },
      ],
    },
  ],
};

export const gg = {
  'May-22': [
    {
      id: 'AUTRES',
      prix: 0,
      listMonth: [
        {
          datePaiement: '2022-05-01',
          description: 'Rien',
          prix: 0,
          type: {
            id: 9,
            code: 'AUTRES',
            libelle: 'Autres',
          },
          id: 1,
        },
      ],
    },
  ],
  'Jun-22': [
    {
      id: 'TRANSPORT',
      prix: 2795,
      listMonth: [
        {
          datePaiement: '2022-06-01',
          description: 'Gasoil',
          prix: 100,
          type: {
            id: 4,
            code: 'TRANSPORT',
            libelle: 'Transport et logistique',
          },
          id: 2,
        },
        {
          datePaiement: '2022-06-02',
          description: 'Gasoil',
          prix: 100,
          type: {
            id: 4,
            code: 'TRANSPORT',
            libelle: 'Transport et logistique',
          },
          id: 4,
        },
      ],
    },
  ],
};
