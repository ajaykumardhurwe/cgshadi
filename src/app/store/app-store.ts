import { Injectable, signal, computed } from '@angular/core';
import { PROFILES, Profile } from '../data/profiles';

export type TabKey = 'home' | 'discover' | 'matches' | 'profile' | 'settings';
export type GenderFilter = 'all' | 'Male' | 'Female';

export interface Filters {
  district: string | null;
  subdistrict: string | null;
  caste: string | null;
  surname: string;
  gender: GenderFilter;
  ageMin: number;
  ageMax: number;
}

const DEFAULT_FILTERS: Filters = {
  district: null,
  subdistrict: null,
  caste: null,
  surname: '',
  gender: 'all',
  ageMin: 18,
  ageMax: 40,
};

@Injectable({ providedIn: 'root' })
export class AppStore {
  readonly profiles: Profile[] = PROFILES;

  readonly activeTab = signal<TabKey>('home');
  readonly filters = signal<Filters>({ ...DEFAULT_FILTERS });

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

  readonly activeFilterCount = computed(() => {
    const f = this.filters();
    let n = 0;
    if (f.district) n++;
    if (f.subdistrict) n++;
    if (f.caste) n++;
    if (f.surname.trim()) n++;
    if (f.gender !== 'all') n++;
    if (f.ageMin !== DEFAULT_FILTERS.ageMin || f.ageMax !== DEFAULT_FILTERS.ageMax) n++;
    return n;
  });

  readonly favouritesList = computed<Profile[]>(() =>
    this.profiles.filter((p) => this.favourites().includes(p.id))
  );

  readonly acceptedList = computed<Profile[]>(() =>
    this.profiles.filter((p) => this.accepted().includes(p.id))
  );

  readonly requestsList = computed<Profile[]>(() =>
    this.profiles.filter((p) => this.requests().includes(p.id))
  );

  getProfile(id: number): Profile | undefined {
    return this.profiles.find((p) => p.id === id);
  }

  isFavourite(id: number): boolean {
    return this.favourites().includes(id);
  }

  toggleFavourite(id: number): void {
    this.favourites.update((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
  }

  sendRequest(id: number): void {
    this.requests.update((list) => (list.includes(id) ? list : [...list, id]));
  }

  setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  openProfile(id: number): void {
    this.selectedProfileId.set(id);
  }

  closeProfile(): void {
    this.selectedProfileId.set(null);
  }

  updateFilters(patch: Partial<Filters>): void {
    this.filters.update((f) => ({ ...f, ...patch }));
  }

  setDistrict(district: string | null): void {
    this.updateFilters({ district, subdistrict: null });
  }

  resetFilters(): void {
    this.filters.set({ ...DEFAULT_FILTERS });
  }
}
