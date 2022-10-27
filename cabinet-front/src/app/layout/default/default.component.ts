import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  hideSidepanel: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  eventtoggleSideNav() {
    this.hideSidepanel = !this.hideSidepanel;
  }
}
