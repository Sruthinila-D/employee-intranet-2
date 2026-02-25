import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule,ButtonModule,DatePickerModule,FormsModule,FluidModule,DividerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {

  date1: Date | undefined;

}
