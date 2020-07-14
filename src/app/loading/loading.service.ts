import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, concatMap, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log('Loading service created...');
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null) //Creates an default observable to obtain an observable chain
      .pipe(
        tap(() => this.loadingOn()), //Tap creates a side effect of loading
        concatMap(() => obs$), //Switch the output values emmited
        finalize(() => this.loadingOff()) //When the switch completes, we finallize the chain
      );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

}
