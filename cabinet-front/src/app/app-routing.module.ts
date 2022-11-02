import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { DefaultComponent } from './layout/default/default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'posts',
        // pathMatch: 'prefix',
        component: PostsComponent,
        children: [
          // <==== CHILDREN ARE DISPLAYED IN SUB ROUTER-OUTLET shared and in shared router module we put the component whre to go
          {
            path: 'shared',
            loadChildren: () =>
              import('./shared/shared.module').then((m) => m.SharedModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
