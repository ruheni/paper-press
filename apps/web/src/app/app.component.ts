import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


export const routeMeta: RouteMeta = {
  redirectTo: '/home',
  pathMatch: 'full',
};

@Component({
  selector: 'web-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <web-header />
    <main class="responsive">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
