import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { LogoComponent } from '../components/logo.component';

@Component({
  selector: 'cg-tab-settings',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatListModule, MatSlideToggleModule, MatDividerModule, LogoComponent],
  template: `
    <div class="cg-fade-in">
      <div class="cg-gradient-header" style="padding:16px 18px;border-radius:0 0 24px 24px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <cg-logo [size]="'lg'" [px]="44"></cg-logo>
          <div>
            <h2 style="margin:0;font-size:22px;font-weight:600;">Settings</h2>
            <p style="margin:2px 0 0;opacity:0.9;font-size:13px;">Manage your account & preferences.</p>
          </div>
        </div>
      </div>

      <div style="padding:16px;">
        <h3 class="cg-section-title"><mat-icon style="color:var(--cg-primary);">person</mat-icon> Account</h3>
        <div class="cg-card" style="overflow:hidden;">
          <mat-list>
            <mat-list-item class="cg-list-item">
              <mat-icon matListItemIcon>verified_user</mat-icon>
              <span matListItemTitle>Verify Profile</span>
              <span matListItemLine class="cg-muted cg-list-sub">Aadhaar / phone verification</span>
              <mat-icon matListItemMeta>chevron_right</mat-icon>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item class="cg-list-item">
              <mat-icon matListItemIcon>workspace_premium</mat-icon>
              <span matListItemTitle>Membership Plans</span>
              <span matListItemLine class="cg-muted cg-list-sub">Upgrade to premium</span>
              <mat-icon matListItemMeta>chevron_right</mat-icon>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item class="cg-list-item">
              <mat-icon matListItemIcon>lock</mat-icon>
              <span matListItemTitle>Privacy & Security</span>
              <span matListItemLine class="cg-muted cg-list-sub">Profile visibility, block list</span>
              <mat-icon matListItemMeta>chevron_right</mat-icon>
            </mat-list-item>
          </mat-list>
        </div>

        <h3 class="cg-section-title" style="margin-top:18px;"><mat-icon style="color:var(--cg-primary);">notifications</mat-icon> Notifications</h3>
        <div class="cg-card" style="overflow:hidden;">
          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon>favorite</mat-icon>
              <span matListItemTitle>New match alerts</span>
              <mat-slide-toggle matListItemMeta [checked]="true" color="primary"></mat-slide-toggle>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>mail</mat-icon>
              <span matListItemTitle>Interest requests</span>
              <mat-slide-toggle matListItemMeta [checked]="true" color="primary"></mat-slide-toggle>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>campaign</mat-icon>
              <span matListItemTitle>Promotions & tips</span>
              <mat-slide-toggle matListItemMeta [checked]="false" color="primary"></mat-slide-toggle>
            </mat-list-item>
          </mat-list>
        </div>

        <h3 class="cg-section-title" style="margin-top:18px;"><mat-icon style="color:var(--cg-primary);">palette</mat-icon> Preferences</h3>
        <div class="cg-card" style="overflow:hidden;">
          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon>language</mat-icon>
              <span matListItemTitle>Language</span>
              <span matListItemMeta class="cg-muted">Hindi / English</span>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>dark_mode</mat-icon>
              <span matListItemTitle>Dark mode</span>
              <mat-slide-toggle matListItemMeta [checked]="false" color="primary"></mat-slide-toggle>
            </mat-list-item>
          </mat-list>
        </div>

        <h3 class="cg-section-title" style="margin-top:18px;"><mat-icon style="color:var(--cg-primary);">support_agent</mat-icon> Support</h3>
        <div class="cg-card" style="overflow:hidden;">
          <mat-list>
            <mat-list-item class="cg-list-item">
              <mat-icon matListItemIcon>help</mat-icon>
              <span matListItemTitle>Help & FAQs</span>
              <mat-icon matListItemMeta>chevron_right</mat-icon>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item class="cg-list-item">
              <mat-icon matListItemIcon>contact_support</mat-icon>
              <span matListItemTitle>Contact us</span>
              <mat-icon matListItemMeta>chevron_right</mat-icon>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item class="cg-list-item">
              <mat-icon matListItemIcon>info</mat-icon>
              <span matListItemTitle>About CGSHADI</span>
              <span matListItemMeta class="cg-muted">v1.0.0</span>
            </mat-list-item>
          </mat-list>
        </div>

        <button mat-stroked-button class="cg-logout-btn">
          <mat-icon>logout</mat-icon> Log out
        </button>

        <p class="cg-muted cg-footer-text">CGSHADI · Made for Chhattisgarh</p>
        <div style="display:flex;justify-content:center;margin-top:10px;opacity:0.6;">
          <cg-logo [size]="'sm'" [px]="32"></cg-logo>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cg-list-item { cursor: pointer; }
    .cg-list-sub { font-size: 12px; }
    .cg-logout-btn {
      width: 100%;
      margin-top: 18px;
      color: var(--cg-error);
      border-color: var(--cg-error);
    }
    .cg-footer-text { text-align: center; font-size: 11px; margin-top: 14px; }
  `],
})
export class TabSettingsComponent {}
