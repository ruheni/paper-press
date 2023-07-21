import { waitFor } from '@analogjs/trpc';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';
import { injectTrpcClient } from '../../../trpc-client';
import { of } from 'rxjs';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [AsyncPipe, NgIf, JsonPipe, RouterModule],
  template: `
    <a routerLink="..">Back</a>

    <h2>Note Details</h2>

    <ng-container *ngIf="note$ | async as note">
      <pre>{{ note | json }}</pre>
    </ng-container>
  `,
})
export default class NoteDetailsPageComponent {
  private _trpc = injectTrpcClient();
  private readonly route = inject(ActivatedRoute);

  public note$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this._trpc.posts.byId.query({ id: params.get('noteId') ?? '' })
    ),
    catchError((err) => {
      console.error(err);
      return of(null);
    }),
    shareReplay(1)
  );

  constructor() {
    void waitFor(this.note$);
  }
}
