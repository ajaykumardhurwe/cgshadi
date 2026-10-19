import { Injectable, signal, computed } from '@angular/core';
import { PROFILES, Profile } from '../data/profiles';

export type TabKey = 'home' | 'discover' | 'matches' | 'profile' | 'settings';

export interface Filters {
  district: string | null;
  subdistrict: string | null;
  caste: string | null;
  surname: string;
  gender: 'all' | 'Male' | 'Female';
  ageMin: number;
  ageMax: number;
}

@Injectable({ providedIn: 'root' })
export class AppStore {
  readonly profiles: Profile[] = PROFILES;

  readonly activeTab = signal<TabKey>('home');

  readonly filters = signal<Filters>({
    district: null,
    subdistrict: null,
    caste: null,
    surname: '',
    gender: 'all',
    ageMin: 18,
    ageMax: 40,
  });

  readonly favourites = signal<number[]>([5, 11]);
  readonly requests = signal<number[]>([2, 8]);
  readonly accepted = signal<number[]>([14]);

  readonly selectedProfileId = signal<number | null>(null);

  readonly filteredProfiles = computed<Profile[]>(() => {
    const f = this.filters();
    return this.profiles.filter((p) => {
      if (f.district && p.district !== f.district) return false;
      if (f.subdistrict && p.subdistrict !== f.subdistrict) return false;
      if (f.caste && p.caste !== f.caste) return false;
      if (f.surname && !p.surname.toLowerCase().includes(f.surname.toLowerCase())) return false;
      if (f.gender !== 'all' && p.gender !== f.gender) return false;
      if (p.age < f.ageMin || p.age > f.ageMax) return false;
      return true;
    });
  });

  readonly matchesList = computed<Profile[]>(() => {
    const ids = [...this.accepted(), ...this.requests()];
    return this.profiles.filter((p) => ids.includes(p.id));
  });

  readonly favouritesList = computed<Profile[]>(() =>
    this.profiles.filter((p) => this.favourites().includes(p.id))
  );

  getProfile(id: number): Profile | undefined {
    return this.profiles.find((p) => p.id === id);
  }

  toggleFavourite(id: number) {
    this.favourites.update((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
  }

  sendRequest(id: number) {
    this.requests.update((list) => (list.includes(id) ? list : [...list, id]));
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  updateFilters(patch: Partial<Filters>) {
    this.filters.update((f) => ({ ...f, ...patch }));
  }

  resetFilters() {
    this.filters.set({
      district: null,
      subdistrict: null,
      caste: null,
      surname: '',
      gender: 'all',
      ageMin: 18,
      ageMax: 40,
    });
  }
}
