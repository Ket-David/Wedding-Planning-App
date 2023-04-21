import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';
import {App, Couple, Agenda, Wish} from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private id: string | null = null;
  private readonly couple$ = new BehaviorSubject<Couple | 1 | null>(1);
  private readonly app$ = new BehaviorSubject<App[]>([]);
  private readonly agenda$ = new BehaviorSubject<Agenda[]>([]);
  private readonly wish$ = new BehaviorSubject<Wish[]>([]);

  constructor(private readonly db: AngularFirestore) {
  }

  onStart(id: string) {
    if (this.id === id) return;
    console.log('call');
    this.id = id;
    const path = `/couples/${id}`;
    this.db.doc<Couple>(path).valueChanges().subscribe(res => {
      this.couple$.next(res ?? 1);
    });
    this.db.collection<Agenda>(`${path}/agendas`, ref => ref.orderBy('index')).valueChanges().subscribe(res => {
      this.agenda$.next(res);
    });
    this.db.collection<Wish>(`/wishes`, ref => ref.where('status', '==', true)).valueChanges().subscribe(res => {
      this.wish$.next(res);
    });
    this.db.collection<App>(`${path}/apps`, ref => ref.orderBy('index'))
      .valueChanges().subscribe(res => {
      this.app$.next(res);
    });
  }

  public couple(): Observable<Couple | 1 | null> {
    return this.couple$.asObservable();
  }

  public get agendas(): Observable<Agenda[]> {
    return this.agenda$.pipe(
      map((results: Agenda[]) => results.sort((a, b) => a.index - b.index))
    );
  }

  public get wishes(): Observable<Wish[]> {
    return this.wish$.pipe(
      map((results: Wish[]) => results.sort((a, b) => a.index - b.index))
    );
  }

  public get apps(): Observable<App[]> {
    return this.app$.pipe(
      map((results: App[]) => results.sort((a, b) => a.index - b.index))
    );
  }
}
