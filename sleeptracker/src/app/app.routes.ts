import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'logged-data-view',
    loadComponent: () => import('./logged-data-view/logged-data-view.page').then( m => m.LoggedDataViewPage)
  },
  {
    path: 'daytime-sleepiness-log',
    loadComponent: () => import('./daytime-sleepiness-log/daytime-sleepiness-log.page').then( m => m.DaytimeSleepinessLogPage)
  },
  {
    path: 'setting',
    loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage)
  },
  {
    path: 'bedtime-log',
    loadComponent: () => import('./bedtime-log/bedtime-log.page').then( m => m.BedtimeLogPage)
  },
];
