import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  

  private apiUrl = 'http://localhost:3000/api/expense';

  constructor(private http: HttpClient) {}

  createExpense(formData: FormData) {
    return this.http.post(`${this.apiUrl}/create`, formData);
  }
  getUsers() {
  return this.http.get<any[]>('http://localhost:3000/api/users');
}

getExpenses() {
  return this.http.get<any[]>('http://localhost:3000/api/expense');
}
}