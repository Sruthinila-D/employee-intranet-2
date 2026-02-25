import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

/* ================= PrimeNG ================= */
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';

/* ================= i18n ================= */
import { TranslateModule } from '@ngx-translate/core';


interface DynamicColumn {
  field: string;
  headerKey: string; // ngx-translate key
  dataType?: 'text' | 'tag' | 'progressBar' | 'currency' | 'date';
  sortable?: boolean;
  filter?: boolean;
  filterMatchMode?: 'contains' | 'equals' | 'startsWith';
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,

    /* PrimeNG */
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    ProgressBarModule,
    TooltipModule,

    /* i18n */
    TranslateModule
  ],
  templateUrl: './app-table.html',
  styleUrls: ['./app-table.css']
})
export class DynamicTableComponent<T extends { id: number | string }> {

  /* ================= INPUTS ================= */

  @Input({ required: true }) data!: () => T[];
  @Input({ required: true }) columns!: () => DynamicColumn[];
  @Input({ required: true }) titleKey!: string;

  @Input() rows = 10;
  @Input() loading = signal(false);

  @Input() showActions = true;
  @Input() enableView = false;
  @Input() enableEdit = true;
  @Input() enableDelete = true;

  /* ================= OUTPUTS ================= */

  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() remove = new EventEmitter<T>();

  /* ================= STATE ================= */

  globalFilterValue = signal('');

  globalFilterFields = computed(() =>
    this.columns().map(col => col.field)
  );

  /* ================= HELPERS ================= */

  isSortable(col: DynamicColumn): string | undefined {
    return col.sortable === false ? undefined : col.field;
  }

  formatCell(item: T, col: DynamicColumn) {
    const value = (item as any)[col.field];
    if (col.dataType === 'currency') {
      return new Intl.NumberFormat().format(value);
    }
    return value ?? '-';
  }

  getSeverity(value: string) {
    switch (value) {
      case 'Active': return 'success';
      case 'Pending': return 'warn';
      case 'Inactive': return 'danger';
      default: return 'info';
    }
  }
}
