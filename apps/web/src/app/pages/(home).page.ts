import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// export const routeMeta: RouteMeta = {
//   redirectTo: '/notes',
//   pathMatch: 'full',
// };

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [RouterModule],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  template: `
    <article>
      <h2>Products</h2>
    </article>
  `,
})
export default class ProductsListComponent {}

/*

*/
