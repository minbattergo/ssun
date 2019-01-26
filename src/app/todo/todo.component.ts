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

  tempMap = new Map<number, TodoVo>();

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

  save(item: TodoVo) {
    item.isEdited = true;
    // 기존 데이타 저장
    // const tempTodo = Object.assign({}, item);  // {} => new 와 동일하다고 본다.
    // const tempTodo = {...item};
    this.tempMap.set(item.todo_id, {...item});
  }

  restore(todo: TodoVo) {
    todo.isEdited = false;

    const tempTodo = this.tempMap.get(todo.todo_id);
    todo.todo    = tempTodo.todo;
    todo.created = tempTodo.created;
    todo.updated = tempTodo.updated;
  }

  modify(todo: TodoVo) {
    this.heroService.modifyTodo(todo)
      .subscribe(data => { Object.assign(todo, data);
       // 일반템플릿으로 변경
        todo.isEdited = false;
      });
  }

  remove(todo: TodoVo) {
    if (confirm('삭제하시겠습니까?')) {
      this.heroService.removeTodo(todo.todo_id)
        .subscribe(data => {
          if (data.result === 0) {
            // 데이터에서 삭제
            // 1) index 를 찾고
            const index = this.todoList.findIndex( item => item.todo_id === todo.todo_id );

            // 2) slice로 삭제하기
            this.todoList.splice(index, 1);

            // 삭제 메시지 보여주기
          }
        });
    }
  }

}
