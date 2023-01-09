import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav: EventEmitter<any> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleSideNav.emit();
  }
  public logOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }
}
