import { waitFor } from '@analogjs/trpc';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, TrackByFunction } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { Post } from '@prisma/client';
import { Subject } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { injectTrpcClient } from '../../../trpc-client';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,

    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styles: [
    `
      :host {
        display: block;
        padding: 1rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        button {
          align-self: flex-start;
        }
      }

      .posts {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        h3 {
          margin: 0;

          a {
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }

          + p {
            margin-top: 0.5rem;
            white-space: pre-wrap;
          }
        }
      }
    `,
  ],
  template: `
    <h2>Posts</h2>
    <form (ngSubmit)="addPost(form)" #form="ngForm">
      <mat-form-field>
        <mat-label>Input</mat-label>
        <input matInput type="text" name="title" required ngModel />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Textarea</mat-label>
        <textarea
          matInput
          name="text"
          required
          minlength="3"
          ngModel
        ></textarea>
      </mat-form-field>

      <button mat-stroked-button color="primary" type="submit">Add Post</button>
    </form>

    <div *ngIf="posts$ | async as posts" class="posts">
      <div *ngFor="let post of posts.items; trackBy: postTrackBy">
        <h3>
          <a [routerLink]="[post.id]">{{ post.title }}</a>
        </h3>
        <p>{{ post.text }}</p>
      </div>
    </div>
  `,
})
export default class ProductsListComponent {
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
  public posts$ = this.triggerRefresh$.pipe(
    switchMap(() => this._trpc.posts.list.query()),
    shareReplay(1),
  );

  constructor() {
    void waitFor(this.posts$);
    this.triggerRefresh$.next();
  }

  postTrackBy: TrackByFunction<Post> = (_, post) => post.id;

  public addPost(form: NgForm) {
    if (!form.valid) {
      form.form.markAllAsTouched();
      return;
    }

    this._trpc.posts.add
      .mutate({ title: form.value.title, text: form.value.text })
      .pipe(take(1))
      .subscribe(() => this.triggerRefresh$.next());
    form.form.reset();
  }
}
