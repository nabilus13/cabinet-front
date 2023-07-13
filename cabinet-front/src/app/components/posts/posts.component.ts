import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  data: Client[] = [];
  subscription: Subscription;
  constructor(private serviceApi: ApiServiceService) {}
  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const date = '2022-06-01';
    const dateObject = new Date(date);
    const offset = dateObject.getTimezoneOffset();
    this.subscription = this.serviceApi.apiAllClients.subscribe((res) => {
      if (!!res) {
        this.data = res;
      }
    });
    this.serviceApi
      .apiGetClientsByDate(dateObject.toISOString().split('T')[0])
      .subscribe((res) => {
        console.log(res);
        console.log(new Date().toISOString().split('T')[0]);
        console.log(new Date().toISOString().split('T')[1]);
      });
  }
}
