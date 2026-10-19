import { Component } from '@angular/core';
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
      <div class="cg-gradient-header cg-profile-header">
        <div class="cg-profile-brand">
          <cg-logo [size]="'sm'" [px]="28"></cg-logo>
          <span>CGSHADI PROFILE</span>
        </div>
        <div class="cg-avatar-wrap">
          <img src="https://i.pravatar.cc/200?u=me" alt="me" />
          <button type="button" class="cg-camera-btn">
            <mat-icon>photo_camera</mat-icon>
          </button>
        </div>
        <h2>{{ me.name }} {{ me.surname }}</h2>
        <p>{{ me.age }} yrs · {{ me.district }} · {{ me.caste }}</p>
        <div class="cg-verified-tag">
          <mat-icon>verified</mat-icon> Verified Member
        </div>
      </div>

      <div style="padding:16px;">
        <div class="cg-card" style="padding:14px;">
          <div class="cg-progress-head">
            <span style="font-weight:600;">Profile completion</span>
            <span style="color:var(--cg-primary);font-weight:600;">85%</span>
          </div>
          <mat-progress-bar mode="determinate" value="85" color="primary"></mat-progress-bar>
          <p class="cg-muted" style="font-size:11px;margin:8px 0 0;">Add more details to get better matches.</p>
        </div>

        <h3 class="cg-section-title" style="margin-top:18px;">
          <mat-icon style="color:var(--cg-primary);">edit</mat-icon> My Details
        </h3>
        <div class="cg-card" style="padding:14px;">
          <div class="cg-form-grid">
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
          <button mat-flat-button class="cg-save-btn" (click)="save()">
            <mat-icon>save</mat-icon> Save Changes
          </button>
        </div>

        <h3 class="cg-section-title" style="margin-top:18px;">
          <mat-icon style="color:var(--cg-primary);">tune</mat-icon> Partner Preferences
        </h3>
        <div class="cg-card" style="padding:14px;">
          <div class="cg-pref-row"><span>Age range</span><span class="cg-muted">22 - 30 yrs</span></div>
          <mat-divider></mat-divider>
          <div class="cg-pref-row"><span>Caste preference</span><span class="cg-muted">Brahmin</span></div>
          <mat-divider></mat-divider>
          <div class="cg-pref-row"><span>District preference</span><span class="cg-muted">Raipur, Durg</span></div>
          <button mat-stroked-button class="cg-pref-btn" color="primary">
            <mat-icon>edit</mat-icon> Update preferences
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cg-profile-header {
      padding: 18px 20px 24px;
      border-radius: 0 0 28px 28px;
      text-align: center;
    }
    .cg-profile-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 12px;
      font-size: 13px;
      opacity: 0.9;
      letter-spacing: 1px;
    }
    .cg-avatar-wrap {
      position: relative;
      display: inline-block;
    }
    .cg-avatar-wrap img {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 3px solid #fff;
      object-fit: cover;
    }
    .cg-camera-btn {
      position: absolute;
      bottom: -4px;
      right: -4px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: #fff;
      color: var(--cg-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .cg-camera-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .cg-profile-header h2 { margin: 10px 0 2px; font-size: 20px; font-weight: 600; }
    .cg-profile-header p { margin: 0; opacity: 0.9; font-size: 13px; }
    .cg-verified-tag {
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 12px;
    }
    .cg-verified-tag mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .cg-progress-head {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 6px;
    }
    .cg-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .cg-save-btn { width: 100%; background: var(--cg-primary); color: #fff; margin-top: 6px; }
    .cg-pref-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .cg-pref-btn { width: 100%; margin-top: 10px; }
  `],
})
export class TabProfileComponent {
  districts = DISTRICTS;
  castes = CASTES;
  me = {
    name: 'Aditi',
    surname: 'Verma',
    age: 24,
    caste: 'Brahmin',
    district: 'Raipur',
    occupation: 'Software Engineer',
    education: 'B.Tech (CS)',
    bio: 'Software engineer who loves classical music and family values.',
  };

  save(): void {
    // demo only
  }
}
