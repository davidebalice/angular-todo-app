import { Component, ViewChild } from '@angular/core';
import { MatModule } from 'src/app/appModules/mat.module';
import { CommonModule } from '@angular/common';

export interface TransactionsTable {
  //name: string;
  date: string;
  time: string;
  status: string;
  amount: number;
  source:string;
  desc:string;
  src?: string;
}


const PAYMENT_DATA: TransactionsTable[] = [
  {date: '10 Sep,2024', time: '8:20 PM', src: 'assets/images/app/paypal.png', source:'Paypal', desc:'Business Plan',  status: 'Paid', amount: 5897},
  {date: '15 Sep,2024', time: '5:22 PM', src: 'assets/images/app/visa.png', source:'Visa', desc:'Business Plan',  status: 'Paid', amount: 9638},
  {date: '22 Sep,2024', time: '2:20 PM', src: 'assets/images/app/behance.png', source:'Behance', desc:'Business Plan',  status: 'Unpaid', amount: 7584},
  {date: '24 Sep,2024', time: '9:14 PM', src: 'assets/images/app/spotify.png', source:'Spotify', desc:'Business Plan',  status: 'Paid', amount: 2154},
  {date: '26 Sep,2024', time: '7:42 PM', src: 'assets/images/app/google-2.png', source:'Google', desc:'Business Plan',  status: 'Pending', amount: 9986},
  {date: '30 Sep,2024', time: '5:33 PM', src: 'assets/images/app/apple.png', source:'Apple', desc:'Business Plan',  status: 'Paid', amount: 6587},
];



import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
} 

from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  responsive: ApexResponsive[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill,
  markers: ApexMarkers,
  colors: string[];
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  labels: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = PAYMENT_DATA;

  @ViewChild("chart") chart: ChartComponent;

  public WidgetChart1: Partial<ChartOptions>;
  public WidgetChart2: Partial<ChartOptions>;
  public WidgetChart3: Partial<ChartOptions>;
  public WidgetChart4: Partial<ChartOptions>;
  public WidgetChart5: Partial<ChartOptions>;
  public WidgetChart6: Partial<ChartOptions>;
  public WidgetChart7: Partial<ChartOptions>;
  public WidgetChart8: Partial<ChartOptions>;

  constructor() {

    
// chart 1
this.WidgetChart1 = {
  series
  : [
    {
      name: "Orders",
      data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }
  ],
  chart: {
    height: 60,
    type: "area",
    zoom: {
      enabled: false
    },
    toolbar: {
      show: !1
    },
    sparkline: {
      enabled: !0
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#b224ef"],
      shadeIntensity: 1,
      type: "vertical",
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100, 100, 100]
    }
  },
  colors: ["#7579ff"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1.5,
    curve: "smooth"
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]
  },
  tooltip: {
    theme: "dark",
  }
};


// chart 2
this.WidgetChart2 = {
  series
  : [
    {
      name: "Orders",
      data: [12, 14, 7, 47, 32, 44, 14, 55, 41, 69]
    }
  ],
  chart: {
    height: 60,
    type: "area",
    zoom: {
      enabled: false
    },
    toolbar: {
      show: !1
    },
    sparkline: {
      enabled: !0
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#57b85c"],
      shadeIntensity: 1,
      type: "vertical",
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100, 100, 100]
    }
  },
  colors: ["#57b85c"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1.5,
    curve: "smooth"
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]
  },
  tooltip: {
    theme: "dark",
  }
};

// chart 3
this.WidgetChart3 = {
  series
  : [
    {
      name: "Orders",
      data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
    }
  ],
  chart: {
    height: 60,
    type: "area",
    zoom: {
      enabled: false
    },
    toolbar: {
      show: !1
    },
    sparkline: {
      enabled: !0
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#2af598"],
      shadeIntensity: 1,
      type: "vertical",
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100, 100, 100]
    }
  },
  colors: ["#009efd"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1.5,
    curve: "smooth"
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]
  },
  tooltip: {
    theme: "dark",
  }
};


// chart 4
this.WidgetChart4 = {
  series
  : [
    {
      name: "Orders",
      data: [35, 65, 47, 35, 44, 32, 27, 54, 44, 61]
    }
  ],
  chart: {
    height: 60,
    type: "bar",
    zoom: {
      enabled: false
    },
    toolbar: {
      show: !1
    },
    sparkline: {
      enabled: !0
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#fe6225"],
      shadeIntensity: 1,
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    }
  },
  colors: ["#fe6225"],
  plotOptions: {
    bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: '48%',
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["transparent"]
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]
  },
  tooltip: {
    theme: "dark",
  }
};


// chart 5
this.WidgetChart5 = {
  series: [
    {
      type:'line',
      name: "Sales",
      data: [14, 3, 10, 9, 29, 19, 22, 9, 12]
    },
    {
      type:'column',
      name: "Visits",
      data: [20, 9, 16, 15, 35, 25, 28, 15, 18]
    }
  ],
  chart: {
    foreColor: "#9ba7b2",
    height: 320,
    type: "line",
    zoom: {
      enabled: false
    },
    toolbar: {
      show: !1
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [5, 0.5],
    curve: "smooth"
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#f9f047", "#ee226e"],
      shadeIntensity: 1,
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    }
  },
  colors: ["#0fd850", "#495bbd"],
  markers: {
    size: 5,
    colors: ["#fff"],
    strokeColors: "#7343be",
    strokeWidth: 2,
    hover: {
      size: 7,
    }
  },
  plotOptions: {
    bar: {
        horizontal: false,
        borderRadius: 10,
        //borderRadiusApplication: 'around',
       // borderRadiusWhenStacked: 'last',
        //distributed: true,
        columnWidth: '30%',
    }
  },
  legend: {
    show: false,
  },
  grid: {
    show: true,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    strokeDashArray: 4,
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]
  },
  tooltip: {
    theme: "dark",
  }
};


// chart 6
this.WidgetChart6 = {
  series: [75],
  chart: {
    height: 280,
    type: "radialBar",
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "82%",
        background: "transparent",
        image: undefined,
        position: "front",
        dropShadow: {
          enabled: false,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: "#eee",
        strokeWidth: "67%",
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: false,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: false,
          color: "#888",
          fontSize: "17px"
        },
        value: {
          color: "#111",
          fontSize: "36px",
          show: true
        }
      }
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#ff00cc"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  colors: ["#333399"],
  stroke: {
    lineCap: "round"
  },
  labels: ["Monthly Views"],
  tooltip: {
    theme: "dark",
  }
};


// chart 6
this.WidgetChart6 = {
  series: [44, 55, 67],
  chart: {
    height: 340,
    type: "radialBar"
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: "22px"
        },
        value: {
          fontSize: "16px"
        },
        total: {
          show: true,
          label: "Total",
          formatter: function(w) {
            return "249";
          }
        }
      },
      hollow: {
        margin: 10,
        size: "50%",
        background: "transparent",
        image: undefined,
        position: "front",
        dropShadow: {
          enabled: false,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: "rgba(0, 0, 0, 0.10)",
        strokeWidth: "67%",
        margin: 10, // margin is in pixels
        dropShadow: {
          enabled: false,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },
    },
    
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#25a0f4", "#a52db7", "#fe6225"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  colors: ["#25a0f4", "#a52db7", "#fe6225"],
  stroke: {
    lineCap: "round"
  },
  labels: ["Stocks", "Mutual Fund", "Bonds"]
};




// chart 7
this.WidgetChart7 = {
  series: [75],
  chart: {
    height: 260,
    type: "radialBar",
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "82%",
        background: "transparent",
        image: undefined,
        position: "front",
        dropShadow: {
          enabled: false,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: "rgba(0, 0, 0, 0.10)",
        strokeWidth: "67%",
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: false,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: false,
          color: "#888",
          fontSize: "17px"
        },
        value: {
          color: "#111",
          fontSize: "36px",
          show: true
        }
      }
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#2af598"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  colors: ["#009efd"],
  stroke: {
    lineCap: "round"
  },
  labels: ["Monthly Views"]
};




// chart 8
this.WidgetChart8 = {
  series
  : [
    {
      name: "Orders",
      data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }
  ],
  chart: {
    height: 185,
    type: "bar",
    zoom: {
      enabled: false
    },
    toolbar: {
      show: !1
    },
    sparkline: {
      enabled: !0
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#b224ef"],
      shadeIntensity: 1,
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    }
  },
  colors: ["#7579ff"],
  plotOptions: {
    bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: '48%',
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1,
    curve: "straight"
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]
  },
  tooltip: {
    theme: "dark",
  }
};


   }

}
