import {BehaviorSubject, Observable} from 'rxjs';

export class Store<T> {
    state$: Observable<T>;
    private behaviorState$: BehaviorSubject<T>;

    protected constructor(initialState: T) {
        this.behaviorState$ = new BehaviorSubject(initialState);
        this.state$ = this.behaviorState$.asObservable();
    }

    get state(): T {
        return this.behaviorState$.getValue();
    }

    setState(nextState: T): void {
        this.behaviorState$.next(nextState);
    }
}
