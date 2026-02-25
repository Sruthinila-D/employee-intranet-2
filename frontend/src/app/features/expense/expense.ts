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

  expenses: any[] = [];
  users: any[] = [];

  showCreateDialog = false;
  showSuccessDialog = false;

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

  // ✅ MULTIPLE FILES
  selectedFiles: File[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadExpenses();
  }

  loadUsers() {
    this.expenseService.getUsers().subscribe({
      next: (data: any[]) => this.users = data,
      error: (err) => console.error(err)
    });
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data: any[]) => this.expenses = data,
      error: (err) => console.error(err)
    });
  }

  openDialog() {
    this.resetForm();
    this.showCreateDialog = true;
  }

  resetForm() {
    this.expense = {
      user_id: 1,
      expense_type: '',
      expense_date: '',
      amount: '',
      currency: 'INR',
      reason: ''
    };
    this.selectedFiles = [];
  }

  // ✅ HANDLE MULTIPLE FILE SELECT
  onFileSelected(event: any) {
  console.log('Selected files:', event.currentFiles);
  this.selectedFiles = event.currentFiles;
}

  submitExpense() {

    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      alert('Please upload at least one PDF');
      return;
    }

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

    // ✅ APPEND MULTIPLE FILES
    for (let file of this.selectedFiles) {
      formData.append('bills', file);
    }

    this.expenseService.createExpense(formData).subscribe({
      next: () => {
        this.showCreateDialog = false;

        setTimeout(() => {
          this.showSuccessDialog = true;

          setTimeout(() => {
            this.showSuccessDialog = false;
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