import { BehaviorSubject, Observable } from 'rxjs';
import { bufferCount, delay, mergeMap, tap } from 'rxjs/operators';

export function requestsWithDelay<T>(requests: Observable<T>[], _delay: number): Observable<T[]> {
  const index$ = new BehaviorSubject(0);
  return index$.pipe(
    delay(_delay),
    mergeMap(index => {
      return requests[index].pipe(
        tap(() => {
          if (requests[index + 1] !== undefined) {
            index$.next(index + 1);
          }
        })
      );
    }),
    bufferCount(requests.length)
  );
}