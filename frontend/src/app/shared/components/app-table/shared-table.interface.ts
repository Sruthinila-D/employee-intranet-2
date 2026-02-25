import { TemplateRef } from '@angular/core';

export type ColumnType = 'text' | 'currency' | 'date' | 'tag' | 'progressbar' | 'boolean' | 'custom';

export interface TableColumn<T = any> {
  field: keyof T | string;
  header: string; // Translation key
  type?: ColumnType;
  
  // Sorting & Filtering
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'numeric' | 'date' | 'boolean';

  // Specific Configs
  dateFormat?: string; // For 'date' type
  currencyCode?: string; // For 'currency' type
  
  // Callback to determine Tag Severity (success, info, warn, danger)
  severityCallback?: (item: T) => 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';
  
  // Identifier for passing a custom ng-template from parent
  customTemplateKey?: string; 
}

export interface TableActionConfig {
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
  selection?: boolean; // Enable checkbox/radio selection
}

export interface TablePageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}