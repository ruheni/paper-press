import { waitFor } from '@analogjs/trpc';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, TrackByFunction } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Post } from '@prisma/client';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { injectTrpcClient } from '../../../trpc-client';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, RouterModule],
  template: `
    <h2>Posts</h2>
    <form (ngSubmit)="addPost(form)" #form="ngForm">
      <input type="text" name="title" placeholder="Title" required ngModel />
      <textarea
        name="text"
        placeholder="Text"
        required
        minlength="3"
        ngModel
      ></textarea>
      <button type="submit">Add Post</button>
    </form>

    <div *ngIf="posts$ | async as posts">
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
    shareReplay(1)
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

    console.log(form.value);

    this._trpc.posts.add
      .mutate({ title: form.value.title, text: form.value.text })
      .pipe(take(1))
      .subscribe(() => this.triggerRefresh$.next());
    form.form.reset();
  }
}
