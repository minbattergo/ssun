import { Component, OnInit } from '@angular/core';
import {TodoVo} from '../domain/todo.vo';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  /**
    1. REST api 테스터
    2. 테스트결과 확이후 객체 정의
    3. 서비스에서 호출 함수 생성
    4. 뷰에서 모델 생성
    5. 뷰 바인딩
  */
  todoList: TodoVo[];
  newTodo = new TodoVo();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getTodoList()
      .subscribe(data => {
        console.log(data);
        this.todoList = data;
      });
  }

  addTodo() {
    // body에 데이터를 보낼때 stringy 를 해야 하나?
    // this.newTodo가 request의 body로 날아가는데 todo 속성외에 나머지 속성은 어떻게 되는지??
    // content-Type를 명시해야 하나?
    this.heroService.addTodo(this.newTodo)
      .subscribe(data => {
        console.log(data);
        // 입력폼 초기화
        this.newTodo = new TodoVo();
        // 추가된 데이타 상위로 올리기
        this.todoList.unshift(data);
      });
  }

}
