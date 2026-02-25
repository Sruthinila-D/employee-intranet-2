import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../core/services/expense.service';

import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Select,
    DatePicker,
    InputNumber,
    Textarea,
    FileUpload,
    Button,
    Dialog,
    TableModule
  ],
  templateUrl: './expense.html',
  styleUrl: './expense.css'
})
export class ExpenseComponent implements OnInit {

  // TABLE DATA
  expenses: any[] = [];

  // DIALOG CONTROL
  showCreateDialog = false;
  showSuccessDialog = false;

  users: any[] = [];

  expenseTypes = [
    'Travel',
    'Food',
    'Accommodation',
    'Office Supplies',
    'Medical'
  ];

  expense: any = {
    user_id: 1,
    expense_type: '',
    expense_date: '',
    amount: '',
    currency: 'INR',
    reason: ''
  };

  selectedFile!: File;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadExpenses();
  }

  // LOAD USERS
  loadUsers() {
    this.expenseService.getUsers()
      .subscribe({
        next: (data: any[]) => {
          this.users = data;
        },
        error: (err) => console.error(err)
      });
  }

  // LOAD EXPENSES FOR TABLE
  loadExpenses() {
    this.expenseService.getExpenses()
      .subscribe({
        next: (data: any[]) => {
          this.expenses = data;
        },
        error: (err) => console.error(err)
      });
  }

  // OPEN CREATE DIALOG
  openDialog() {
    this.resetForm();
    this.showCreateDialog = true;
  }

  // RESET FORM
  resetForm() {
    this.expense = {
      user_id: 1,
      expense_type: '',
      expense_date: '',
      amount: '',
      currency: 'INR',
      reason: ''
    };
    this.selectedFile = undefined!;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files[0];
  }

  isOnlySpaces(value: string): boolean {
    return value.trim().length === 0;
  }

  submitExpense() {

    if (!this.selectedFile) return;

    const formattedDate = this.expense.expense_date
      ? new Date(this.expense.expense_date).toISOString().split('T')[0]
      : '';

    const formData = new FormData();

    formData.append('user_id', String(this.expense.user_id));
    formData.append('expense_type', this.expense.expense_type);
    formData.append('expense_date', formattedDate);
    formData.append('amount', String(this.expense.amount));
    formData.append('currency', this.expense.currency);
    formData.append('reason', this.expense.reason.trim());
    formData.append('bill', this.selectedFile);
this.expenseService.createExpense(formData).subscribe({
    next: (res) => {
      // 1. Close the entry form immediately
      this.showCreateDialog = false;

      // 2. Small delay to let the first dialog vanish, then show success
      setTimeout(() => {
        this.showSuccessDialog = true;

        // 3. Auto-hide success message after 2 seconds
        setTimeout(() => {
          this.showSuccessDialog = false;
          
          // 4. Refresh data and reset the form for next time
          this.loadExpenses();
          this.resetForm();
        }, 2000);
      }, 300);
    },
    error: (err) => {
      console.error(err);
      alert('Error creating expense. Please try again.');
    }
  });
}
}