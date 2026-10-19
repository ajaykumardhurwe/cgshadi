import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AppStore } from './app/store/app-store';
import { ToastService } from './app/store/toast.service';
import { BottomNavComponent } from './app/components/bottom-nav.component';
import { ProfileDetailComponent } from './app/components/profile-detail.component';
import { ToastComponent } from './app/components/toast.component';
import { TabHomeComponent } from './app/tabs/tab-home.component';
import { TabDiscoverComponent } from './app/tabs/tab-discover.component';
import { TabMatchesComponent } from './app/tabs/tab-matches.component';
import { TabProfileComponent } from './app/tabs/tab-profile.component';
import { TabSettingsComponent } from './app/tabs/tab-settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule, MatBadgeModule,
    BottomNavComponent, ProfileDetailComponent, ToastComponent,
    TabHomeComponent, TabDiscoverComponent, TabMatchesComponent,
    TabProfileComponent, TabSettingsComponent,
  ],
  template: `
    <div class="cg-app-container">
      <main>
        @switch (store.activeTab()) {
          @case ('home') { <cg-tab-home></cg-tab-home> }
          @case ('discover') { <cg-tab-discover></cg-tab-discover> }
          @case ('matches') { <cg-tab-matches></cg-tab-matches> }
          @case ('profile') { <cg-tab-profile></cg-tab-profile> }
          @case ('settings') { <cg-tab-settings></cg-tab-settings> }
        }
      </main>

      <cg-bottom-nav
        [active]="store.activeTab()"
        [matchesCount]="store.requests().length"
        (select)="store.setTab($event)">
      </cg-bottom-nav>

      @if (selectedProfile(); as p) {
        <div class="cg-detail-overlay" (click)="store.closeProfile()">
          <div class="cg-detail-panel" (click)="$event.stopPropagation()">
            <cg-profile-detail
              [profile]="p"
              [isFav]="store.isFavourite(p.id)"
              (close)="store.closeProfile()"
              (connect)="onConnect($event)">
            </cg-profile-detail>
          </div>
        </div>
      }

      <cg-toast></cg-toast>
    </div>
  `,
  styles: [`
    .cg-detail-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2000;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      animation: cgovery 0.25s ease;
    }
    @keyframes cgovery {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .cg-detail-panel {
      width: 100%;
      max-width: 480px;
      background: var(--cg-surface);
      height: 92vh;
      overflow-y: auto;
      border-radius: 22px 22px 0 0;
      animation: cgslideup 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes cgslideup {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  `],
})
export class App {
  store = inject(AppStore);
  private toast = inject(ToastService);

  selectedProfile = computed(() => {
    const id = this.store.selectedProfileId();
    return id ? this.store.getProfile(id) : undefined;
  });

  onConnect(p: { name: string }): void {
    this.toast.show(`Interest sent to ${p.name}!`);
    setTimeout(() => this.store.closeProfile(), 600);
  }
}

bootstrapApplication(App, {
  providers: [provideAnimations()],
});
