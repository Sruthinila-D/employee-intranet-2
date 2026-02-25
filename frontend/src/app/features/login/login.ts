import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { ButtonComponent } from '../../shared/components/button/button';
import { TranslateModule } from '@ngx-translate/core';

type UserRole = 'Employee' | 'Manager' | 'HR' | 'Admin';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  selectedRole = signal<UserRole>('Employee');
  
  roles: UserRole[] = ['Employee', 'Manager', 'HR', 'Admin'];

  selectRole(role: UserRole) {
    this.selectedRole.set(role);
  }

  signIn() {
    this.authService.login(this.selectedRole());
    this.router.navigate(['/']);
  }
}