import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'tema',
    loadComponent: () =>
      import('./pages/tema/tema.component').then((m) => m.TemaComponent),
  }
];
