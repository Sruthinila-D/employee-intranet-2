import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select'; // V18+ Select Component
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';

interface Product {
  id?: number;
  title?: string; // Mapped to 'name' in UI if needed
  description?: string;
  price?: number;
  category?: string;
  thumbnail?: string;
  rating?: number;
  stock?: number;
  inventoryStatus?: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK'; 
}

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DataViewModule,
    ButtonModule,
    RatingModule,
    TagModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    SelectButtonModule,
    SelectModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './products.html',
  styleUrl:'./products.css'
})
export class ProductsPageComponent implements OnInit {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  products = signal<Product[]>([]);
  
  // 'table' shows p-table. 'list'/'grid' are passed to p-dataview layout
  layout = signal<'table' | 'list' | 'grid'>('table');

  viewOptions = [
    { icon: 'pi pi-table', value: 'table' },
    { icon: 'pi pi-list', value: 'list' },
    { icon: 'pi pi-th-large', value: 'grid' }
  ];

  productDialog = signal<boolean>(false);
  product: Product = {};
  submitted = false;

  statuses: SelectItem[] = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];

  ngOnInit() {
    this.http.get<any>('https://dummyjson.com/products?limit=30').subscribe({
      next: (data) => {
        const mapped = data.products.map((p: any) => ({
          ...p,
          // Map API data to UI requirements
          inventoryStatus: p.stock > 5 ? 'INSTOCK' : p.stock > 0 ? 'LOWSTOCK' : 'OUTOFSTOCK'
        }));
        this.products.set(mapped);
      }
    });
  }

  // --- CRUD ---

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog.set(true);
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog.set(true);
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products.update(val => val.filter(p => p.id !== product.id));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  saveProduct() {
    this.submitted = true;
    if (this.product.title?.trim()) {
      if (this.product.id) {
        // Update
        this.products.update(curr => {
          const idx = curr.findIndex(p => p.id === this.product.id);
          if (idx > -1) curr[idx] = this.product;
          return [...curr];
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        // Create
        this.product.id = Math.floor(Math.random() * 100000);
        this.product.thumbnail = 'https://placehold.co/150';
        this.product.inventoryStatus = 'INSTOCK';
        this.products.update(curr => [this.product, ...curr]);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }
      this.productDialog.set(false);
      this.product = {};
    }
  }

  hideDialog() {
    this.productDialog.set(false);
    this.submitted = false;
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK': return 'success';
      case 'LOWSTOCK': return 'warn';
      case 'OUTOFSTOCK': return 'danger';
      default: return 'info';
    }
  }
}