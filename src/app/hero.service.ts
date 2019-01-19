import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService { /** 모델역확을 한다. */

  constructor() { }

  getHeroes(): Observable<Hero[]> { /** ReactiveX 방식 : 시간의 따라서 Hero배열이 변할수 있다. */
    return of(HEROES).pipe(delay(1000));
  }
}
