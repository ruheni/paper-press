import { waitFor } from '@analogjs/trpc';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, TrackByFunction } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Note } from '@prisma/client';
import { Subject } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { injectTrpcClient } from '../../../trpc-client';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,

    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  template: `
    <div class="page active">
      <h2>Notes</h2>
      <form (ngSubmit)="addNote(form)" #form="ngForm">
        <div class="field label border">
          <input type="text" name="title" required ngModel />
          <label>Title</label>
        </div>
        <div class="field textarea label border">
          <textarea name="text" required minlength="3" ngModel></textarea>
          <label>Content</label>
        </div>

        <button color="primary" type="submit">Add Note</button>
      </form>

      <div *ngIf="notes$ | async as notes" class="notes">
        <div *ngFor="let note of notes.items; trackBy: noteTrackBy">
          <h3>
            <a [routerLink]="[note.id]">{{ note.title }}</a>
          </h3>
          <p>{{ note.text }}</p>
        </div>
      </div>
    </div>
  `,
})
export default class ProductsListComponent {
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
  public notes$ = this.triggerRefresh$.pipe(
    switchMap(() => this._trpc.notes.list.query()),
    shareReplay(1),
  );

  constructor() {
    void waitFor(this.notes$);
    this.triggerRefresh$.next();
  }

  noteTrackBy: TrackByFunction<Note> = (_, note) => note.id;

  public addNote(form: NgForm) {
    if (!form.valid) {
      form.form.markAllAsTouched();
      return;
    }

    this._trpc.notes.add
      .mutate({ title: form.value.title, text: form.value.text })
      .pipe(take(1))
      .subscribe(() => this.triggerRefresh$.next());
    form.form.reset();
  }
}
