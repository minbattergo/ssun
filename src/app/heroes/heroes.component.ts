import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes'; /* named export 해줘야 자동으로 찾아줌 Alt + Enter */

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  /* 1) 리터럴 객체로 생성 */
 /* hero: Hero={
    id: 1,
    name: 'winstorm'
  };
*/
 hero: Hero;
 heroes = HEROES;
 selectedHero : Hero;

 isSpecial=true;

 constructor() {
   /*//2) new 키워드로 객체 생성*/
   this.hero = new Hero(12, 'winstorm');
   // id, name은무슨 값이 할당되는가?
   console.log('hero => [', this.hero,  ']');
 }

  ngOnInit() {
  }

  onSave(e: any) {
   console.log('onSave : ', e);
  }

  onSelect(hero: Hero) {
   this.selectedHero = hero;
  }
}
