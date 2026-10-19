import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { TabKey } from '../store/app-store';

interface NavTab {
  key: TabKey;
  label: string;
  icon: string;
  iconActive: string;
}

@Component({
  selector: 'cg-bottom-nav',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule],
  template: `
    <nav class="cg-bottom-nav">
      <button *ngFor="let tab of tabs"
              type="button"
              class="cg-nav-item"
              [class.active]="active === tab.key"
              (click)="select.emit(tab.key)">
        <span [matBadge]="badgeFor(tab.key)" matBadgeColor="warn" matBadgeOverlap="true" [matBadgeHidden]="badgeFor(tab.key) === '0'">
          <mat-icon>{{ iconFor(tab) }}</mat-icon>
        </span>
        <span>{{ tab.label }}</span>
      </button>
    </nav>
  `,
})
export class BottomNavComponent {
  @Input() active: TabKey = 'home';
  @Input() matchesCount = 0;
  @Output() select = new EventEmitter<TabKey>();

  tabs: NavTab[] = [
    { key: 'home', label: 'Home', icon: 'home', iconActive: 'home' },
    { key: 'discover', label: 'Discover', icon: 'search', iconActive: 'search' },
    { key: 'matches', label: 'Matches', icon: 'favorite_border', iconActive: 'favorite' },
    { key: 'profile', label: 'Profile', icon: 'person_outline', iconActive: 'person' },
    { key: 'settings', label: 'Settings', icon: 'settings', iconActive: 'settings' },
  ];

  badgeFor(key: TabKey): string {
    return key === 'matches' ? String(this.matchesCount) : '0';
  }

  iconFor(tab: NavTab): string {
    return this.active === tab.key ? tab.iconActive : tab.icon;
  }
}
