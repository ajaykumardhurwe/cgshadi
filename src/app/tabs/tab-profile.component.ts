import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DISTRICTS, CASTES } from '../data/locations';
import { LogoComponent } from '../components/logo.component';

@Component({
  selector: 'cg-tab-profile',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDividerModule, MatProgressBarModule, LogoComponent,
  ],
  template: `
    <div class="cg-fade-in">
      <div class="cg-gradient-header" style="padding:18px 20px 24px;border-radius:0 0 28px 28px;text-align:center;">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:12px;">
          <cg-logo [size]="'sm'" [px]="28"></cg-logo>
          <span style="font-size:13px;opacity:0.9;letter-spacing:1px;">CGSHADI PROFILE</span>
        </div>
        <div style="position:relative;display:inline-block;">
          <img src="https://i.pravatar.cc/200?u=me" style="width:96px;height:96px;border-radius:50%;border:3px solid #fff;object-fit:cover;" alt="me" />
          <button mat-mini-fab class="cg-camera-btn">
            <mat-icon>photo_camera</mat-icon>
          </button>
        </div>
        <h2 style="margin:10px 0 2px;font-size:20px;font-weight:600;">Aditi Verma</h2>
        <p style="margin:0;opacity:0.9;font-size:13px;">24 yrs · Raipur · Brahmin</p>
        <div style="margin-top:8px;display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:999px;">
          <mat-icon style="font-size:16px;">verified</mat-icon>
          <span style="font-size:12px;">Verified Member</span>
        </div>
      </div>

      <div style="padding:16px;">
        <!-- Profile completion -->
        <div class="cg-card" style="padding:14px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
            <span style="font-weight:600;">Profile completion</span>
            <span style="color:var(--cg-primary);font-weight:600;">85%</span>
          </div>
          <mat-progress-bar mode="determinate" value="85" color="primary"></mat-progress-bar>
          <p class="cg-muted" style="font-size:11px;margin:8px 0 0;">Add more details to get better matches.</p>
        </div>

        <!-- Edit form -->
        <h3 class="cg-section-title" style="margin-top:18px;">
          <mat-icon style="color:var(--cg-primary);">edit</mat-icon> My Details
        </h3>
        <div class="cg-card" style="padding:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <mat-form-field appearance="outline" style="width:100%;">
              <mat-label>Full Name</mat-label>
              <input matInput [(ngModel)]="me.name" />
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%;">
              <mat-label>Surname</mat-label>
              <input matInput [(ngModel)]="me.surname" />
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%;">
              <mat-label>Caste</mat-label>
              <mat-select [(ngModel)]="me.caste">
                <mat-option *ngFor="let c of castes" [value]="c">{{ c }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%;">
              <mat-label>District</mat-label>
              <mat-select [(ngModel)]="me.district">
                <mat-option *ngFor="let d of districts" [value]="d.name">{{ d.name }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%;">
              <mat-label>Occupation</mat-label>
              <input matInput [(ngModel)]="me.occupation" />
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%;">
              <mat-label>Education</mat-label>
              <input matInput [(ngModel)]="me.education" />
            </mat-form-field>
          </div>
          <mat-form-field appearance="outline" style="width:100%;margin-top:4px;">
            <mat-label>About me</mat-label>
            <textarea matInput rows="3" [(ngModel)]="me.bio"></textarea>
          </mat-form-field>
          <button mat-flat-button color="primary" style="width:100%;background:var(--cg-primary);color:#fff;margin-top:6px;">
            <mat-icon>save</mat-icon> Save Changes
          </button>
        </div>

        <!-- Preferences -->
        <h3 class="cg-section-title" style="margin-top:18px;">
          <mat-icon style="color:var(--cg-primary);">tune</mat-icon> Partner Preferences
        </h3>
        <div class="cg-card" style="padding:14px;">
          <div style="display:flex;justify-content:space-between;padding:8px 0;">
            <span>Age range</span><span style="color:var(--cg-muted);">22 - 30 yrs</span>
          </div>
          <mat-divider></mat-divider>
          <div style="display:flex;justify-content:space-between;padding:8px 0;">
            <span>Caste preference</span><span style="color:var(--cg-muted);">Brahmin</span>
          </div>
          <mat-divider></mat-divider>
          <div style="display:flex;justify-content:space-between;padding:8px 0;">
            <span>District preference</span><span style="color:var(--cg-muted);">Raipur, Durg</span>
          </div>
          <button mat-stroked-button style="width:100%;margin-top:10px;" color="primary">
            <mat-icon>edit</mat-icon> Update preferences
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cg-camera-btn {
      position: absolute;
      bottom: -4px;
      right: -4px;
      background: #fff !important;
      color: var(--cg-primary) !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .cg-camera-btn mat-icon { font-size: 18px; }
  `],
})
export class TabProfileComponent {
  districts = DISTRICTS;
  castes = CASTES;
  me = {
    name: 'Aditi',
    surname: 'Verma',
    caste: 'Brahmin',
    district: 'Raipur',
    occupation: 'Software Engineer',
    education: 'B.Tech (CS)',
    bio: 'Software engineer who loves classical music and family values.',
  };
}
