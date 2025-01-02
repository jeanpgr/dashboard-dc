import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

interface SalesData {
  month: string;
  sale: number;
}

interface UserSales {
  nombre: string;
  total_ventas: number;
}

interface UserReports {
  nombre: string;
  total_reportes: number;
}

@Component({
  selector: 'app-graph-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-line.component.html',
  styleUrls: ['./graph-line.component.css']
})
export class GraphLineComponent implements OnInit {
  private chart?: Chart;
  private userSalesChart?: Chart;
  private userReportsChart?: Chart;
  public totalAnual: number = 0;

  // Static data
  private salesData: SalesData[] = [
    { month: 'January', sale: 287.55 },
    { month: 'February', sale: 648.75 },
    { month: 'March', sale: 528.40 },
    { month: 'April', sale: 506.75 },
    { month: 'May', sale: 466.50 },
    { month: 'June', sale: 582.40 },
    { month: 'July', sale: 501.00 },
    { month: 'August', sale: 711.00 },
    { month: 'September', sale: 497.00 },
    { month: 'October', sale: 388.00 },
    { month: 'November', sale: 377.50 },
    { month: 'December', sale: 904.00 }
  ];

  private annualData = { total: 6398.85 };

  private userSalesData: UserSales[] = [
    { nombre: 'Alexis', total_ventas: 976.15 },
    { nombre: 'Andrea', total_ventas: 913.4 },
    { nombre: 'Cristhian', total_ventas: 1594.0 },
    { nombre: 'Jean Pierre', total_ventas: 2915.3 }
  ];

  private userReportsData: UserReports[] = [
    { nombre: 'Jean Pierre', total_reportes: 104 },
    { nombre: 'Cristhian', total_reportes: 98 },
    { nombre: 'Alexis', total_reportes: 89 },
    { nombre: 'Andrea', total_reportes: 54 }
  ];

  ngOnInit(): void {
    this.totalAnual = this.annualData.total;

    const salesLabels = this.salesData.map(item => this.getMonthName(item.month));
    const salesValues = this.salesData.map(item => item.sale);
    this.renderChart(salesLabels, salesValues);

    this.renderUserSalesChart(this.userSalesData);
    this.renderUserReportsChart(this.userReportsData);
  }

  getMonthName(month: string): string {
    const months: { [key: string]: string } = {
      'January': 'Enero',
      'February': 'Febrero',
      'March': 'Marzo',
      'April': 'Abril',
      'May': 'Mayo',
      'June': 'Junio',
      'July': 'Julio',
      'August': 'Agosto',
      'September': 'Septiembre',
      'October': 'Octubre',
      'November': 'Noviembre',
      'December': 'Diciembre'
    };
    return months[month] || month;
  }

  renderChart(labels: string[], sales: number[]) {
    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas 2024',
          data: sales,
          fill: false,
          borderColor: 'rgb(40, 19, 120)',
          borderWidth: 4,
          pointBackgroundColor: 'rgb(190, 190, 190)',
          pointBorderColor: 'rgb(0, 0, 0)',
          pointBorderWidth: 3,
          pointHoverBackgroundColor: 'rgb(0, 0 , 160)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'white',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function (context) {
                return `Ventas: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        }
      }
    };

    this.chart = new Chart(
      document.getElementById('chartLine') as HTMLCanvasElement,
      config
    );
  }

  renderUserSalesChart(data: UserSales[]) {
    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: data.map(item => item.nombre),
        datasets: [{
          label: 'Ventas',
          data: data.map(item => item.total_ventas),
          backgroundColor: 'rgba(40, 19, 120, 0.7)',
          borderColor: 'rgb(40, 19, 120)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            callbacks: {
              label: function (context) {
                return `$${context.parsed.x.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    this.userSalesChart = new Chart(
      document.getElementById('userSalesChart') as HTMLCanvasElement,
      config
    );
  }

  renderUserReportsChart(data: UserReports[]) {
    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: data.map(item => item.nombre),
        datasets: [{
          data: data.map(item => item.total_reportes),
          backgroundColor: [
            'rgba(40, 19, 120, 0.7)',
            'rgba(90, 50, 180, 0.7)',
            'rgba(140, 80, 220, 0.7)',
            'rgba(180, 120, 250, 0.7)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            callbacks: {
              label: function (context) {
                return `${context.parsed.x} reportes`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    this.userReportsChart = new Chart(
      document.getElementById('userReportsChart') as HTMLCanvasElement,
      config
    );
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.userSalesChart) {
      this.userSalesChart.destroy();
    }
    if (this.userReportsChart) {
      this.userReportsChart.destroy();
    }
  }
}
