import { Component,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// Bootstrap
import { NgbNavModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// Swiper Slider
import Swiper from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';
Swiper.use([Navigation, FreeMode]);
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
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

// Data Get
import { CryptoCoinData, MarketData, recentData } from './data';
import { CryptoCoinModel, MarketModel, RecentModel } from './model';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule,NgbNavModule,NgbDropdownModule],
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.scss'
})
export class CryptoComponent {
  
  active = 1;
  // Swiper Slider
  @ViewChild('userReview', { static: false }) userReview: ElementRef | undefined;
  swiper: Swiper | undefined;

  // apex chart list
  @ViewChild("chart") chart!: ChartComponent;
  public bitcoinChart: Partial<ChartOptions>;
  public marketActivityChart: Partial<ChartOptions>;
  public summaryChart: Partial<ChartOptions>;

  // Crypto Coin
  CryptoCoin!: CryptoCoinModel[];

  // Market Previews
  MarketPreviews!: MarketModel[];

  // Recent Previews
  RecentData!: RecentModel[];

  constructor() {
    /**
    * Fetches the data
    */
    this.fetchData();

    interface TooltipData {
      series: any[];
      seriesIndex: number;
      dataPointIndex: number;
      w: any;
    }

    // Income Chart
    this.bitcoinChart = {
      series: [
        {
          name: "Buy",
          data: [9400, 9200, 9700, 9400, 9200, 9600],
        },

        {
          name: "Sell",
          data: [9150, 9650, 9350, 9750, 9250, 9650],
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
          "3:00 PM",
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
          "7:00 PM",
          "8:00 PM",
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
        min: 9100,
        max: 9800,
        tickAmount: 3,
        opposite: true,
      },
      colors: ["#00A389", "#FF5B5B"],
      fill: {
        colors: ['transparent', 'transparent'],
        type: ['solid', 'solid'],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: '16px',
            fontWeight: 500,
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
          horizontalAlign: "right",
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

    // Market Activity Chart
    this.marketActivityChart = {
      series: [
        {
          name: "Your Profits",
          data: [23, 11, 22, 27, 13, 22, 37, 21],
        },

        {
          name: "Buys",
          data: [30, 25, 36, 30, 45, 35, 64, 52],
        },

        {
          name: "Sells",
          data: [70, 60, 43, 38, 40, 55, 24, 16],
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
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
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
      colors: ["#AB54DB", "#00A389", "#FF5B5B"],
      fill: {
        colors: ['transparent', 'transparent', 'transparent'],
        type: ['solid', 'solid', 'solid'],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
      },
      stroke: {
        width: [5, 5, 5],
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

    // Summary Chart
    this.summaryChart = {
      series: [30, 34, 6, 30],
		  labels: ['Ethereum', 'Litecoin', 'Ripple', 'Bitcoin'],
      colors: ["#00ADA3", "#374C98", "#23292F", "#FFBB54"],
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

  /**
     * Fetches the data
     */
  private fetchData() {
    // Crypto Coin
    this.CryptoCoin = CryptoCoinData;

    // Market Previews
    this.MarketPreviews = MarketData;

    // Market Previews
    this.RecentData = recentData;
}

  ngAfterViewInit() {
    if (this.userReview) {
      this.swiper = new Swiper(this.userReview.nativeElement, {
        loop: true,
        freeMode: true,
        slidesPerView: 3,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev'
        },
        breakpoints: {
          0: {
            slidesPerView: 1
          },
          992: {
            slidesPerView: 2
          },
          1600: {
            slidesPerView: 3
          }
        }
      });
    }
  }

}
