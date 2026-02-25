import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { TicketService, Ticket } from '../../core/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    RouterModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.css']
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[] = [];
  loading = true;

  constructor(
    private ticketService: TicketService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {

    // Subscribe to reactive store
    this.ticketService.tickets$.subscribe((data: Ticket[]) => {
      this.tickets = data;
      this.loading = false;
    });

    // Load initially
    this.ticketService.loadTickets();
  }

  deleteTicket(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this ticket?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.ticketService.deleteTicket(id).subscribe();
      }
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'OPEN': return 'warn';
      case 'IN_PROGRESS': return 'info';
      case 'RESOLVED': return 'success';
      case 'CLOSED': return 'secondary';
      default: return 'contrast';
    }
  }
  viewAttachment(ticketId: number) {
  window.open(
    `http://localhost:5000/api/attachments/ticket/${ticketId}`,
    '_blank'
    );
  }
}