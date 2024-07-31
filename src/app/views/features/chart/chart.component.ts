import { Component,ViewChild } from '@angular/core';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ApexLegend,
  ApexDataLabels,
  ApexTooltip,
  ApexGrid,
  ApexStroke,
  ApexResponsive,
  ApexPlotOptions
} from "ng-apexcharts";
export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  yaxis?: ApexXAxis | any;
  colors?: ApexXAxis | any;
  fill?: ApexFill | any;
  legend?: ApexLegend | any;
  stroke?: ApexStroke | any;
  markers?: ApexStroke | any;
  labels?: string[] | any;
  dataLabels?: ApexDataLabels | any;
  grid?: ApexGrid | any;
  tooltip?: ApexTooltip | any;
  responsive?: ApexResponsive | any;
  plotOptions?: ApexPlotOptions | any;
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  // apex chart list
  @ViewChild("chart") chart!: ChartComponent;
  public serverRequest: Partial<ChartOptions>;
  public stackChart: Partial<ChartOptions>;
  public columnChart: Partial<ChartOptions>;
  public pieChart: Partial<ChartOptions>;

  constructor() {
    interface TooltipData {
      series: any[];
      seriesIndex: number;
      dataPointIndex: number;
      w: any;
    }
    // Server Request Chart
    this.serverRequest = {
      series: [
        {
          name: "Product One",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },

        {
          name: "Product Two",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
      ],
      chart: {
        fontFamily: "Jost, sans-serif",
        height: 335,
        type: "area",
        background: "transparent",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "category",
        categories: [
          "14:00",
          "14:10",
          "14:20",
          "14:30",
          "14:40",
          "14:50",
          "14:60",
          "15:00",
          "15:10",
          "15:20",
          "15:30",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false
        },
      },
      yaxis: {
        labels: {
          offsetX: -10
        },
        title: {
          style: {
          fontSize: "0px",
          },
        },
        min: 0,
        max: 75,
        tickAmount: 3,
      },
      colors: ["#FFBB54", "#00A389"],
      fill: {
        colors: ['transparent', 'transparent'],
        type: ['solid', 'solid'],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
      },
      stroke: {
        width: [5, 5],
        curve: "smooth",
      },
      markers: {
        show: false,
      },
      labels: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        column: {
          opacity: 0.2
        },
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }: TooltipData): string {
          return '<div class="custom-tooltip">' +
          '<span class="custom-tooltip__title">' + w.globals.series[seriesIndex][dataPointIndex] + ' Request</span>' +
          '<span class="custom-tooltip__subtitle"> From ' + w.globals.seriesNames[seriesIndex] + '</span>' +
          '</div>';
        }
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
          chart: {
            height: 300,
          },
          },
        },
        {
          breakpoint: 1366,
          options: {
          chart: {
            height: 350,
          },
          },
        },
      ],
    };

    // Stack Chart
    this.stackChart = {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'PRODUCT A',
          data: [2, 5, 1, 7, 2, 4, 1, 4],
          dataLabels: false,
        },
        {
          name: 'PRODUCT B',
          data: [1, 3, 2, 8, 3, 7, 3, 2],
          dataLabels: false,
        },
        {
          name: 'PRODUCT C',
          data: [1, 7, 5, 3, 2, 4, 5, 3],
          dataLabels: false,
        }
      ],
      xaxis: {
        type: "category",
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false
        },
      },
      yaxis: {
        opposite: true,
        labels: {
          show: true,
          formatter: function (val:any) {
            return val + " AM";
          },
          offsetX: -17,
        },
        min: 0,
        max: 10,
        tickAmount: 5,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        padding: {
          left: -10,
          right: 0
        },
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: 18,
          borderRadius: 0
        }
      }
    };

    // Column Chart
    this.columnChart = {
      series: [{
        data: [40, 31, 40, 10, 40, 36, 32]
      }],
      chart: {
        height: 250,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: ["#AB54DB26"],
      plotOptions: {
      bar: {
        columnWidth: 50,
        borderRadius: 12,
      }
      },
      dataLabels: {
      enabled: false,
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        position: 'bottom',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: { left: -20, right: -20, top: 0, bottom: 0 },
      },
      tooltip: {
        enabled: true,

        custom: function ({ series, seriesIndex, dataPointIndex, w }: TooltipData): string {
          // Calculate the percentage based on the max value
          let value = w.globals.series[seriesIndex][dataPointIndex]
          var maxValue = Math.max(...series[0]);
          var percentage = ((value / maxValue) * 10).toFixed(0);

          return '<div class="custom-tooltip">' +
          '<span class="custom-tooltip__title">' + percentage + '%</span>' +
          '<span class="custom-tooltip__subtitle">' + value + ' Visitors</span>' +
          '</div>';
        },
      },
    };

    // Pie Chart
    this.pieChart = {
      series: [44, 55, 41],
      labels: ['Fixed Servers', 'Down Servers', 'Running'],
      colors: ["#AB54DB", "#EF9A91", "#F1E6B9"],
      plotOptions: {
        pie: {
          expandOnClick: false,
          startAngle: 0,
          dataLabels: {
            enabled: false,
          },
          customScale: 1, // Adjust this value to control the series border radius
        },
        stroke: {
          width: 25, // Width of the stroke
          colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
        },
      },
      chart: {
        height: '350px',
        type: 'donut',
      },
      responsive: [{
        breakpoint: 576,
        options: {
          chart: {
            height: '550px'
          }
        },
      }],
      legend: {
        show: true,
        position: "bottom",
        fontSize: '14px',
            fontWeight: 500,
        formatter: function (seriesName:any, opts:any) {
          let data = opts.w.globals.seriesTotals[opts.seriesIndex];
          return seriesName + ":  " + data;
        },
      },
    };
  }

}
