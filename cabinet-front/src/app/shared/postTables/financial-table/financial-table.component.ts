import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Month } from 'src/app/models/enum-months';
import { FinantialTable } from 'src/app/models/financial-table';
import { ShareDataOfApiService } from 'src/app/services/share-data-of-api.service';

@Component({
  selector: 'app-financial-table',
  templateUrl: './financial-table.component.html',
  styleUrls: ['./financial-table.component.scss'],
})
export class FinancialTableComponent implements OnInit, AfterViewInit {
  dataSource: FinantialTable[] = [];
  displayedColumns: string[] = ['month', 'prix', 'comission', 'totalCaisse'];
  data: Client[] = [];
  months = Month;
  finantialTable = <FinantialTable>{
    JAN: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    FEB: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    MAR: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    APR: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    MAY: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    JUN: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    JUL: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    AUG: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    SEP: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    OCT: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    NOV: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
    DEC: {
      totals: {
        sumTotalCaisse: 0,
        sumTotalComission: 0,
        sumTotalPrix: 0,
      },
      data: [],
    },
  };
  constructor(private sharedDataApi: ShareDataOfApiService) {}

  ngAfterViewInit(): void {
    // this.dataSource = new MatTableDataSource([this.finantialTable]);
    this.dataSource.push(this.finantialTable);
    console.log('dataSource', this.dataSource);

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.sharedDataApi.getClientData().subscribe((res) => {
      this.data = res;
      this.initilizeData(this.data);

      console.log('fin', this.finantialTable);
    });
  }

  initilizeData(data: Client[]) {
    console.log('initilizeData', this.data[0]?.client);
    console.log(Object.keys(this.months));
    console.log(Object.values(this.months));
    let valuesMonth = Object.values(this.months);
    let keysMonth = Object.keys(this.months);
    if (data.length > 0) {
      this.data.forEach((row) => {
        let month = row.dateReception.toString().split('-');
        console.log(month[1]);
        valuesMonth.forEach((values, index) => {
          if (values == month[1]) {
            switch (values) {
              case '01':
                if (this.finantialTable?.JAN?.totals) {
                  {
                    this.finantialTable.JAN.totals.sumTotalCaisse =
                      this.finantialTable.JAN.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.JAN.totals.sumTotalPrix =
                      this.finantialTable.JAN.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.JAN.totals.sumTotalComission =
                        this.finantialTable.JAN.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.JAN?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '02':
                if (this.finantialTable?.FEB?.totals) {
                  {
                    this.finantialTable.FEB.totals.sumTotalCaisse =
                      this.finantialTable.FEB.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.FEB.totals.sumTotalPrix =
                      this.finantialTable.FEB.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.FEB.totals.sumTotalComission =
                        this.finantialTable.FEB.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.FEB?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '03':
                if (this.finantialTable?.MAR?.totals) {
                  {
                    this.finantialTable.MAR.totals.sumTotalCaisse =
                      this.finantialTable.MAR.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.MAR.totals.sumTotalPrix =
                      this.finantialTable.MAR.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.MAR.totals.sumTotalComission =
                        this.finantialTable.MAR.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.MAR?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '04':
                if (this.finantialTable?.APR?.totals) {
                  {
                    this.finantialTable.APR.totals.sumTotalCaisse =
                      this.finantialTable.APR.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.APR.totals.sumTotalPrix =
                      this.finantialTable.APR.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.APR.totals.sumTotalComission =
                        this.finantialTable.APR.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.APR?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '05':
                if (this.finantialTable?.MAY?.totals) {
                  {
                    this.finantialTable.MAY.totals.sumTotalCaisse =
                      this.finantialTable.MAY.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.MAY.totals.sumTotalPrix =
                      this.finantialTable.MAY.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.MAY.totals.sumTotalComission =
                        this.finantialTable.MAY.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.MAY?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '06':
                if (this.finantialTable?.JUN?.totals) {
                  {
                    this.finantialTable.JUN.totals.sumTotalCaisse =
                      this.finantialTable.JUN.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.JUN.totals.sumTotalPrix =
                      this.finantialTable.JUN.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.JUN.totals.sumTotalComission =
                        this.finantialTable.JUN.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.JUN?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '07':
                if (this.finantialTable?.JUL?.totals) {
                  {
                    this.finantialTable.JUL.totals.sumTotalCaisse =
                      this.finantialTable.JUL.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.JUL.totals.sumTotalPrix =
                      this.finantialTable.JUL.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.JUL.totals.sumTotalComission =
                        this.finantialTable.JUL.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.JUL?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '08':
                if (this.finantialTable?.AUG?.totals) {
                  {
                    this.finantialTable.AUG.totals.sumTotalCaisse =
                      this.finantialTable.AUG.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.AUG.totals.sumTotalPrix =
                      this.finantialTable.AUG.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.AUG.totals.sumTotalComission =
                        this.finantialTable.AUG.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.AUG?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '09':
                if (this.finantialTable?.SEP?.totals) {
                  {
                    this.finantialTable.SEP.totals.sumTotalCaisse =
                      this.finantialTable.SEP.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.SEP.totals.sumTotalPrix =
                      this.finantialTable.SEP.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.SEP.totals.sumTotalComission =
                        this.finantialTable.SEP.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.SEP?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '10':
                if (this.finantialTable?.OCT?.totals) {
                  {
                    this.finantialTable.OCT.totals.sumTotalCaisse =
                      this.finantialTable.OCT.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.OCT.totals.sumTotalPrix =
                      this.finantialTable.OCT.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.OCT.totals.sumTotalComission =
                        this.finantialTable.OCT.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.OCT?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '11':
                if (this.finantialTable?.NOV?.totals) {
                  {
                    this.finantialTable.NOV.totals.sumTotalCaisse =
                      this.finantialTable.NOV.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.NOV.totals.sumTotalPrix =
                      this.finantialTable.NOV.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.NOV.totals.sumTotalComission =
                        this.finantialTable.NOV.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.NOV?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;
              case '12':
                if (this.finantialTable?.DEC?.totals) {
                  {
                    this.finantialTable.DEC.totals.sumTotalCaisse =
                      this.finantialTable.DEC.totals.sumTotalCaisse +
                      row.totalCaisse;
                    this.finantialTable.DEC.totals.sumTotalPrix =
                      this.finantialTable.DEC.totals.sumTotalPrix + row.prix;
                    if (row.comission != undefined && row.comission != null) {
                      this.finantialTable.DEC.totals.sumTotalComission =
                        this.finantialTable.DEC.totals.sumTotalComission +
                        row.comission;
                    }
                  }
                }
                this.finantialTable.DEC?.data.push({
                  prix: row?.prix,
                  comission: row?.comission,
                  totalCaisse: row?.totalCaisse,
                });
                break;

              default:
                break;
            }
          }
        });
      });
    }
  }
}
