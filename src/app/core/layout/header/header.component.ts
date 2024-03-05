import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
  }

  logout(){
    this.authService.logout()
  }
}
