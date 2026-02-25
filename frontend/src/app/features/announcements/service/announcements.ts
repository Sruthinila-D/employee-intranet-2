import { Injectable, signal } from '@angular/core';
import { User } from '../../../core/models/user';

/**
 * Announcement domain model
 */
export interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  authorRole: 'HR' | 'Admin';
  publishDate: string;
  status: 'Pending Approval' | 'Published' | 'Rejected';
  priority: 'Normal' | 'Urgent';
  targetAudience: ('All' | User['role'])[];
  targetLocations: ('All' | User['location'])[];
  rejectionComment?: string;
  isEvent?: boolean;
  eventDate?: string;
  eventTime?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  /**
   * Internal state (private, mutable)
   * Use readonly accessor for consumers
   */
  private readonly _announcements = signal<Announcement[]>([
    {
      id: 1,
      title: 'HR Policy Update for 2025',
      content: 'Detailed content about the new HR policy...',
      author: 'HR Department',
      authorRole: 'HR',
      publishDate: '2024-07-15',
      status: 'Published',
      priority: 'Urgent',
      targetAudience: ['All'],
      targetLocations: ['All'],
    },
    {
      id: 2,
      title: 'Annual Company Picnic (Riyadh)',
      content:
        'Join us for our annual company picnic! More details to follow regarding the location and time.',
      author: 'Admin Team',
      authorRole: 'Admin',
      publishDate: '2024-07-20',
      status: 'Pending Approval',
      priority: 'Normal',
      targetAudience: ['All'],
      targetLocations: ['Riyadh'],
      isEvent: true,
      eventDate: '2024-08-15',
      eventTime: '11:00',
    },
    {
      id: 3,
      title: 'Q3 Performance Review Schedule',
      content:
        'Please schedule your Q3 performance reviews with your manager before the end of the month.',
      author: 'HR Department',
      authorRole: 'HR',
      publishDate: '2024-07-05',
      status: 'Rejected',
      priority: 'Normal',
      targetAudience: ['Manager', 'Employee'],
      targetLocations: ['All'],
      rejectionComment:
        'Please include the specific deadlines for submission.',
    },
    {
      id: 4,
      title: 'New Cafe Opening in Building B',
      content:
        'A new cafe will be opening next week in Building B, offering a variety of food and beverage options.',
      author: 'Admin Team',
      authorRole: 'Admin',
      publishDate: '2024-07-01',
      status: 'Published',
      priority: 'Normal',
      targetAudience: ['All'],
      targetLocations: ['Riyadh'],
    },
    {
      id: 5,
      title: 'Cybersecurity Awareness Training',
      content:
        'Mandatory cybersecurity training for all employees is scheduled for next month.',
      author: 'Admin Team',
      authorRole: 'Admin',
      publishDate: '2024-07-22',
      status: 'Published',
      priority: 'Urgent',
      targetAudience: ['All'],
      targetLocations: ['All'],
    },
    {
      id: 6,
      title: 'Engineering Department Town Hall',
      content:
        'A town hall meeting for the Engineering department will be held to discuss Q3 goals.',
      author: 'Bob Smith',
      authorRole: 'Admin', // simulated admin rights
      publishDate: '2024-07-21',
      status: 'Published',
      priority: 'Normal',
      targetAudience: ['Manager', 'Employee'],
      targetLocations: ['All'],
      isEvent: true,
      eventDate: '2024-07-28',
      eventTime: '10:00',
    },
  ]);

  /**
   * Public read-only signal
   * Components can observe but not mutate
   */
  getAnnouncements() {
    return this._announcements.asReadonly();
  }

  /**
   * Create new announcement
   */
  addAnnouncement(data: Omit<Announcement, 'id'>): void {
    this._announcements.update(list => {
      const nextId =
        list.length > 0 ? Math.max(...list.map(a => a.id)) + 1 : 1;

      const newAnnouncement: Announcement = {
        ...data,
        id: nextId,
      };

      return [newAnnouncement, ...list];
    });
  }

  /**
   * Update existing announcement
   */
  updateAnnouncement(updated: Announcement): void {
    this._announcements.update(list =>
      list.map(item =>
        item.id === updated.id ? { ...updated } : item
      )
    );
  }

  /**
   * Delete announcement
   */
  deleteAnnouncement(id: number): void {
    this._announcements.update(list =>
      list.filter(item => item.id !== id)
    );
  }
}
