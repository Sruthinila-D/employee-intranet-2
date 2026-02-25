import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { LeaveService } from './leave.service';

import { FileUploadModule } from 'primeng/fileupload';

import { ButtonModule } from 'primeng/button';


@Component({

  selector: 'app-leave',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ButtonModule
  ],

  templateUrl: './leave.html',

  styleUrls: ['./leave.css']

})

export class LeaveComponent implements OnInit {


  // ✅ FORM FIELDS

  user_id: string = '';

  leave_type: string = '';

  start_date: string = '';

  end_date: string = '';

  total_days: string = '';

  reason: string = '';

  file: File | null = null;


  // ✅ TABLE DATA

  leaves: any[] = [];


  constructor(private leaveService: LeaveService) {}



  // ✅ PAGE LOAD

  ngOnInit(): void {

    this.loadLeaves();

  }



  // ✅ FILE SELECT (PRIMENG FIXED)

  onFileSelect(event: any): void {

    if (event.files && event.files.length > 0) {

      this.file = event.files[0];

      console.log("File selected:", this.file?.name);

    }

  }



  // ✅ SUBMIT LEAVE

  createLeave(): void {


    if (!this.user_id || !this.leave_type) {

      alert("User ID and Leave Type required");

      return;

    }


    const formData = new FormData();


    formData.append("user_id", this.user_id);

    formData.append("leave_type", this.leave_type);

    formData.append("start_date", this.start_date);

    formData.append("end_date", this.end_date);

    formData.append("total_days", this.total_days);

    formData.append("reason", this.reason);


    if (this.file) {

      formData.append("file", this.file);

    }


    console.log("Submitting leave...");


    this.leaveService.createLeave(formData).subscribe({

      next: (res) => {

        console.log("Success:", res);

        alert("Leave Applied Successfully");


        this.resetForm();

        this.loadLeaves();

      },


      error: (err) => {

        console.error("Error:", err);

        alert("Submit Failed");

      }

    });

  }



  // ✅ LOAD LEAVE LIST

  loadLeaves(): void {

    this.leaveService.getAllLeaves().subscribe({

      next: (res: any) => {

        console.log("Leave List:", res);

        this.leaves = res;

      },


      error: (err) => {

        console.error("Load Error:", err);

      }

    });

  }



  // ✅ RESET FORM

  resetForm(): void {

    this.user_id = '';

    this.leave_type = '';

    this.start_date = '';

    this.end_date = '';

    this.total_days = '';

    this.reason = '';

    this.file = null;

  }


}