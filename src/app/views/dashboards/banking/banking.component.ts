import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Bootstrap
import { NgbNavModule, NgbDropdownModule,NgbDatepickerModule,NgbDateStruct,NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';

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
import { HistoryData } from './data';
import { HistoryModel } from './model';

@Component({
  selector: 'app-banking',
  standalone: true,
  imports: [CommonModule,RouterLink,NgApexchartsModule,NgbNavModule,NgbDropdownModule,NgbDatepickerModule,NgbProgressbarModule],
  templateUrl: './banking.component.html',
  styleUrl: './banking.component.scss'
})
export class BankingComponent {

  model: NgbDateStruct | undefined;
  active = 1;
  // User Reviews
  HistoryData!: HistoryModel[];
  // apex chart list
  @ViewChild("chart") chart!: ChartComponent;
  public income: Partial<ChartOptions>;
  public expense: Partial<ChartOptions>;

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
    this.income = {
      series: [{
        data: [40, 32, 45, 65, 23, 54, 23]
      }],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      colors: ["#1BD5FE"],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
          gradientToColors: ["#216BDB"]
        }
      },
      plotOptions: {
        bar: {
          columnWidth: 30,
          borderRadius: 10,
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        }
      },
      yaxis: {
        labels: {
          show: true,
          offsetX: 0
        },
        min: 0, // Set the min and max as actual category values.
        max: 70,
        tickAmount: 3,
      },
      grid: {
        show: true,
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }: TooltipData): string {
          // Calculate the percentage based on the max value
          let value = w.globals.series[seriesIndex][dataPointIndex]
          var maxValue = Math.max(...series[0]);
          var percentage = ((value / maxValue) * 10).toFixed(0);
          // Get the mouse position from the global variable or state
          var mouseX = w.mouseX || 0;
          var mouseY = w.mouseY || 0;
          // Calculate the position of the tooltip above the bar
          var tooltipX = mouseX - 50;
          var tooltipY = mouseY - 30; // Adjust the offset as needed
          return '<div class="custom-tooltip" style="left:' + tooltipX + 'px; top:' + tooltipY + 'px;">' +
            '<span class="custom-tooltip__title">$' + percentage + '</span>' +
            '<span class="custom-tooltip__subtitle">' + value + ' Visitors</span>' +
            '</div>';
        },
      },
    };

    // Expense Chart
    this.expense = {
      series: [{
        data: [40, 32, 45, 65, 23, 54, 23]
      }],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: ["#FFBB54"],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
          gradientToColors: ["#FF3300"]
        }
      },
      plotOptions: {
        bar: {
          columnWidth: 30,
          borderRadius: 10,
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        }
      },
      yaxis: {
        labels: {
          show: true,
          offsetX: 0
        },
        min: 0, // Set the min and max as actual category values.
        max: 70,
        tickAmount: 3,
      },
      grid: {
        show: true,
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }: TooltipData): string {
         // Calculate the percentage based on the max value
				let value = w.globals.series[seriesIndex][dataPointIndex]
				var maxValue = Math.max(...series[0]);
				var percentage = ((value / maxValue) * 10).toFixed(0);
				// Get the mouse position from the global variable or state
				var mouseX = w.mouseX || 0;
				var mouseY = w.mouseY || 0;
				// Calculate the position of the tooltip above the bar
				var tooltipX = mouseX - 50;
				var tooltipY = mouseY - 30; // Adjust the offset as needed
				return '<div class="custom-tooltip" style="left:' + tooltipX + 'px; top:' + tooltipY + 'px;">' +
					'<span class="custom-tooltip__title">$' + percentage + '</span>' +
					'<span class="custom-tooltip__subtitle">' + value + ' Visitors</span>' +
					'</div>';
        },
      },
    };
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    // User Reviews
    this.HistoryData = HistoryData;
  }

}
