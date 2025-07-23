import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core'; 1
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  data: any;
  basicData: any;
  basicData2: any;

  options: any;
  basicOptions: any;
  basicOptions2: any;

  platformId = inject(PLATFORM_ID);

  // configService = inject(AppConfigService);

  // designerService = inject(DesignerService);

  constructor(private cd: ChangeDetectorRef) { }

  // themeEffect = effect(() => {
  //   if (this.configService.transitionComplete()) {
  //     if (this.designerService.preset()) {
  //       this.initChart();
  //     }
  //   }
  // });

  ngOnInit() {
    this.initChart();
    this.initChart2();
    this.initChart3();
  }

  initChart3() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.basicData2 = {
        labels: ['UTP Mensualidad', 'Contabo', 'Spotify', 'Casa'],
        datasets: [
          {
            label: 'Outbound',
            data: [540, 325, 702, 620],
            backgroundColor: [
              'rgba(34, 197, 94, 0.70)',
              'rgba(34, 197, 94, 0.70)',
              'rgba(34, 197, 94, 0.70)',
              'rgba(34, 197, 94, 0.70)',
            ],
            borderColor: ['rgba(43, 255, 0, 0.2)', 'rgba(43, 255, 0, 0.2)', 'rgba(43, 255, 0, 0.2)', 'rgba(43, 255, 0, 0.2)'],
            borderWidth: 1,
          },
        ],
      };

      this.basicOptions2 = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck()
    }
  }

  initChart2() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.basicData = {
        labels: ['UTP Mensualidad', 'Contabo', 'Spotify', 'Casa'],
        datasets: [
          {
            label: 'Outbound',
            data: [540, 325, 702, 620],
            backgroundColor: [
              'rgba(255, 0, 0, 0.70)',
              'rgba(255, 0, 0, 0.70)',
              'rgba(255, 0, 0, 0.70)',
              'rgba(255, 0, 0, 0.70)',
            ],
            borderColor: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
            borderWidth: 1,
          },
        ],
      };

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck()
    }
  }


  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        labels: ['Junio', 'Julio'],
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Outbound',
            backgroundColor: [
              'rgba(255, 0, 0, 0.70)',
              'rgba(255, 0, 0, 0.70)',
            ],
            borderColor: ['rgba(255, 0, 0, 0.2)', 'rgb(6, 182, 212)'],
            data: [700, 100]
            // data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'Inbound',
            backgroundColor: [
              'rgba(34, 197, 94, 0.70)',
              'rgba(34, 197, 94, 0.70)',
            ],
            borderColor: ['rgb(43, 255, 0, 0.2)', 'rg(43, 255, 0, 0.2)'],
            data: [2000, 2000]
            // data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      };

      this.options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
      this.cd.markForCheck()
    }
  }

}
