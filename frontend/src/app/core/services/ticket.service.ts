import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Ticket {
  ticket_id?: number;
  ticket_number?: string;
  user_id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status?: string;
  created_at?: string;
  has_attachment?: boolean; 
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:5000/api/tickets';

  // ✅ Reactive store
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  public tickets$ = this.ticketsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ Load tickets
  loadTickets(): void {
    this.http.get<Ticket[]>(this.apiUrl).subscribe({
      next: (data: Ticket[]) => {
        this.ticketsSubject.next(data ?? []);
      },
      error: (err) => console.error(err)
    });
  }

  // ✅ Create ticket
  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket).pipe(
      tap(() => this.loadTickets())
    );
  }

  // ✅ Delete ticket
  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTickets())
    );
  }

  // ✅ Update status
  updateStatus(id: number, status: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      tap(() => this.loadTickets())
    );
  }
}