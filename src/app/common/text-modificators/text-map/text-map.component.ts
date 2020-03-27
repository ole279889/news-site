import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

interface ICoords {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-text-map',
  templateUrl: './text-map.component.html',
  styleUrls: ['./text-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextMapComponent implements OnInit {

  public pointCoords: ICoords = {
    lat: 0,
    lng: 0,
  };
  public zoom = 8;

  @Input() set coords(value: string) {
    const coordsArray = value.split(',');
    this.pointCoords.lat = Number(coordsArray[0]);
    this.pointCoords.lng = Number(coordsArray[1]);
  }
  @Input() baloonText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
