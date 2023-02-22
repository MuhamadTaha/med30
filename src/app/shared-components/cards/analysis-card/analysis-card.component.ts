import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-card',
  templateUrl: './analysis-card.component.html',
  styleUrls: ['./analysis-card.component.scss']
})
export class AnalysisCardComponent implements OnInit {
  @Input() chartData: any;
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          useBorderRadius: true,
          borderRadius: 50,
        }
      },
    },
  };
  ;

  constructor() { }

  ngOnInit(): void {
  }

}
