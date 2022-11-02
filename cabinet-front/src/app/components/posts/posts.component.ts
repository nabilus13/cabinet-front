import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ShareDataOfApiService } from 'src/app/services/share-data-of-api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  data: Client[] = [];
  constructor(
    private serviceApi: ApiServiceService,
    private sharedDataApi: ShareDataOfApiService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<any> {
    await this.serviceApi.apiGetClients().subscribe((res: Client[]) => {
      // res = this.data;
      this.data = res;
      console.log(this.data);
      this.sharedDataApi.setClientData(this.data);
      return this.data;
    });
  }
}
