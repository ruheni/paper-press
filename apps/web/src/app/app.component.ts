import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';

export const routeMeta: RouteMeta = {
  redirectTo: '/home',
  pathMatch: 'full',
};

@Component({
  selector: 'web-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {}
