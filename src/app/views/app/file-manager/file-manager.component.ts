import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Bootstrap
import { NgbNavModule,NgbDropdownModule  } from '@ng-bootstrap/ng-bootstrap';

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
import { FileData } from './data';
import { FileModel } from './model';

@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [CommonModule,NgbNavModule,NgbDropdownModule,NgApexchartsModule ],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent {
  active = 1;
  // File Data
  FileData!: FileModel[];
  // Apex Chart
  public storageChart: Partial<ChartOptions>;
  public googleDriveChart: Partial<ChartOptions>;
  public oneDriveChart: Partial<ChartOptions>;
  public icloudChart: Partial<ChartOptions>;

  constructor() {
    // File Data
    this.FileData = FileData;

    // Storage Chart
    this.storageChart = {
      series: [80],
      chart: {
        height: 120,
        type: "radialBar",
      },
      plotOptions: {
        show: false,
        radialBar: {
          show: false,
          dataLabels: {
            show: false,
          }
        }
      },
      stroke: {
        width: 1, // Width of the stroke
        colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 1,
          gradientToColors: ['#0061FF'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: .5,
          stops: [0, 100]
        }
      },
      labels: ["Median Ratio"]
    };

    // Google Drive Chart
    this.googleDriveChart = {
      	series: [50],
		chart: {
			height: 120,
			type: "radialBar",
		},
		plotOptions: {
		show: false,
		radialBar: {
			show: false,
			dataLabels: {
			show: false,
			}
		}
		},
		stroke: {
			width: 1, // Width of the stroke
			colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
		},
		fill: {
			type: 'gradient',
			gradient: {
			shade: '#34A853',
			type: 'horizontal',
			shadeIntensity: 1,
			gradientToColors: ['#34A853'],
			inverseColors: true,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100]
			}
		},
		labels: ["Median Ratio"]
    };

    // One Drive Chart
    this.oneDriveChart = {
      	series: [70],
		chart: {
			height: 120,
			type: "radialBar",
		},
		plotOptions: {
			show: false,
			radialBar: {
				show: false,
				dataLabels: {
					show: false,
				}
			}
		},
		stroke: {
			width: 1, // Width of the stroke
			colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: '#0364B8',
				type: 'horizontal',
				shadeIntensity: 1,
				gradientToColors: ['#0364B8'],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
			}
		},
		labels: ["Median Ratio"]
    };

    // icloud Chart
    this.icloudChart = {
      	series: [30],
		chart: {
			height: 120,
			type: "radialBar",
		},
		plotOptions: {
			show: false,
			radialBar: {
				show: false,
				dataLabels: {
				show: false,
				}
			}
		},
		stroke: {
			width: 1, // Width of the stroke
			colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: '#8AD2F7',
				type: 'horizontal',
				shadeIntensity: 1,
				gradientToColors: ['#8AD2F7'],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: .5,
				stops: [0, 100]
			}
		},
		labels: ["Median Ratio"]
    };
  }

}
