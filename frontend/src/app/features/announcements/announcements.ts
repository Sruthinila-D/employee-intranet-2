import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';


import { AnnouncementService, Announcement } from './service/announcements';
import { DynamicTableComponent } from '../../shared/components/app-table/app-table';

interface DynamicColumn {
  field: string;
  headerKey: string; // ngx-translate key
  dataType?: 'text' | 'tag' | 'progressBar' | 'currency' | 'date';
  sortable?: boolean;
  filter?: boolean;
  filterMatchMode?: 'contains' | 'equals' | 'startsWith';
}

@Component({
  selector: 'app-announcements-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    DynamicTableComponent
  ],
  templateUrl: './announcements.html'
})
export class AnnouncementsPageComponent {

  /* ================= INJECT SERVICE ================= */

  private readonly announcementService = inject(AnnouncementService);

  /* ================= DATA ================= */

  // readonly signal from service
  announcements = this.announcementService.getAnnouncements();

  /* ================= COLUMNS ================= */

  columns = computed<DynamicColumn[]>(() => [
    {
      field: 'title',
      headerKey: 'announcements.title',
      sortable: true,
      filter: true
    },
    {
      field: 'author',
      headerKey: 'announcements.author',
      sortable: true,
      filter: true
    },
    {
      field: 'publishDate',
      headerKey: 'announcements.publishDate',
      sortable: true,
      filter: true
    },
    {
      field: 'status',
      headerKey: 'announcements.status',
      dataType: 'tag',
      sortable: true,
      filter: true
    },
    {
      field: 'priority',
      headerKey: 'announcements.priority',
      dataType: 'tag',
      sortable: true,
      filter: true
    }
  ]);

  /* ================= ACTION HANDLERS ================= */

  onView(item: Announcement) {
    console.log('VIEW announcement', item);
    // open view drawer / dialog
  }

  onEdit(item: Announcement) {
    console.log('EDIT announcement', item);
    // open edit form
  }

  onDelete(item: Announcement) {
    console.log('DELETE announcement', item);
    this.announcementService.deleteAnnouncement(item.id);
  }

  onAdd() {
    console.log('ADD announcement');
    // open create dialog
  }
}
