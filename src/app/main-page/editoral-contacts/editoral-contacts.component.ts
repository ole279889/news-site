import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editoral-contacts',
  templateUrl: './editoral-contacts.component.html',
  styleUrls: ['./editoral-contacts.component.scss']
})
export class EditoralContactsComponent implements OnInit {

  public lat = 54.31817747709114;
  public lng = 48.396689389345795;
  public zoom = 14;

  constructor() { }

  ngOnInit(): void {
  }

}
