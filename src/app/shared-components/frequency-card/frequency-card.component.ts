import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-frequency-card',
  templateUrl: './frequency-card.component.html',
  styleUrls: ['./frequency-card.component.scss']
})
export class FrequencyCardComponent implements OnInit {

  @Input() frequencyData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
