import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-banner',
  templateUrl: './card-banner.component.html',
  styleUrls: ['./card-banner.component.scss'],
})
export class CardBannerComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() subTitle: string | undefined;
  @Input() amount: number | undefined;
  @Input() imgSource: string | undefined;
  constructor() {}

  ngOnInit(): void {}
}
