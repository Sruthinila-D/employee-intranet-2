import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './ticket-create.html',
  styleUrl: './ticket-create.css'
})
export class TicketCreateComponent {

  ticketForm: FormGroup;

  selectedFileBase64: string | null = null;
  selectedFileMeta: any = null;
  fileError: string | null = null;

  categories = [
    { label: 'IT', value: 'IT' },
    { label: 'HR', value: 'HR' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Admin', value: 'Admin' }
  ];

  priorities = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' }
  ];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private http: HttpClient
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  // 🔹 File validation & Base64 extraction
  onFileSelect(event: any) {
    const file = event.target.files?.[0];
    this.fileError = null;

    if (!file) {
      this.resetFile();
      this.fileError = 'Attachment is required';
      return;
    }

    // ✅ Only PDF
    if (file.type !== 'application/pdf') {
      this.resetFile();
      this.fileError = 'Only PDF files are allowed';
      return;
    }

    // ✅ Max size 1MB
    if (file.size > 1024 * 1024) {
      this.resetFile();
      this.fileError = 'File size must be less than 1MB';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;

      if (!result.includes(',')) {
        this.resetFile();
        this.fileError = 'Invalid file format';
        return;
      }

      // 🔥 Remove data prefix
      const base64 = result.split(',')[1];

      this.selectedFileBase64 = base64;

      this.selectedFileMeta = {
        file_name: file.name,
        file_type: file.type,
        file_size: file.size
      };
    };

    reader.readAsDataURL(file);
  }

  submit() {
    if (this.ticketForm.invalid || !this.selectedFileBase64) {
      this.fileError = 'Attachment is required';
      return;
    }

    const ticketData = {
      ...this.ticketForm.value,
      user_id: 1
    };

    this.ticketService.createTicket(ticketData).subscribe({
      next: (createdTicket) => {

        const attachmentData = {
          reference_id: createdTicket.ticket_id,
          reference_type: 'TICKET',
          ...this.selectedFileMeta,
          file_base64: this.selectedFileBase64,
          uploaded_by: 1
        };

        this.http.post(
          'http://localhost:5000/api/attachments',
          attachmentData
        ).subscribe({
          next: () => {
            this.router.navigate(['/tickets']);
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => console.error(err)
    });
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }

  private resetFile() {
    this.selectedFileBase64 = null;
    this.selectedFileMeta = null;
  }
}