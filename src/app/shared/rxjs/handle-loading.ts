
import { Store } from '@datorama/akita';
import { defer, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * Handles the loading state of the store. Invokes setLoading(true) on subscription and setLoading(false) on completion.
 * @param store: Store<T>
 */
export function handleLoading<T>(store: Store<T>): (source: Observable<T>) => Observable<T> {
  return function inner(source: Observable<T>): Observable<T> {
    return defer(() => {
      store.setLoading(true);
      return source.pipe(finalize(() => store.setLoading(false)));
    });
  };
}
