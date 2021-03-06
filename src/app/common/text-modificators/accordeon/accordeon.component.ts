import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.component.html',
  styleUrls: ['./accordeon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordeonComponent implements OnInit {

  @Input() text: string;
  public panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

  public togglePanelState() {
    this.panelOpenState = !this.panelOpenState;
  }

}
