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

      <button>
        <span>Default</span>
        <i>arrow_drop_down</i>
        <menu>
          <a>Item 1</a>
          <a>Item 2</a>
          <a>Item 3</a>
        </menu>
      </button>
    </article>
  `,
})
export default class ProductsListComponent {}

/*

*/
