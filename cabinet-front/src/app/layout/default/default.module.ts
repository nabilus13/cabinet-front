import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultComponent } from './default.component';

@NgModule({
  declarations: [DefaultComponent, DashboardComponent, PostsComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
  ],
})
export class DefaultModule {}
