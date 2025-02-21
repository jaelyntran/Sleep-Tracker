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
    path: 'overnight-sleep-log',
    loadComponent: () => import('./overnight-sleep-log/overnight-sleep-log.page').then( m => m.OvernightSleepLogPage)
  },
  {
    path: 'setting',
    loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage)
  },
];
