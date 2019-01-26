import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {Observable, of, Subject} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ResultVo, TodoVo} from './domain/todo.vo';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  refresh = new Subject<number>(); // publisher: next(11)로 데이터발생
  refresh$ = this.refresh.asObservable(); // subscriber

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // return of(HEROES).pipe(delay(1000));
    return this.http.get<Hero[]>(environment.HOST + '/api/heroes');
  }

  getHero(hero_id: number): Observable<Hero> {
    // return of( HEROES.find(element => element.hero_id === hero_id)).pipe(delay(1000));
    // es6 template string : `${자바스크립트변수}`
    return this.http.get<Hero>(`${environment.HOST}/api/hero/${hero_id}`);
  }

  getTodoList() {
    return this.http.get<TodoVo[]>(environment.HOST + '/api/todo');
  }

  addTodo(params: any) : Observable<TodoVo> {
   /*    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');*/
    return this.http.post<TodoVo>(environment.HOST + '/api/todo'
                          , params
                          /*,{headers: header}*/);
  }

  modifyTodo(params: TodoVo) {
    return this.http.put(environment.HOST + '/api/todo', params);
  }

  removeTodo(todo_id: number): Observable<ResultVo> {
    return this.http.delete<ResultVo>(`${environment.HOST}/api/todo?todo_id=${todo_id}`);
  }

}
