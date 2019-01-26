import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-jquery',
  templateUrl: './jquery.component.html',
  styleUrls: ['./jquery.component.scss']
})
export class JqueryComponent implements OnInit {

  todoList;

  constructor(private heroService: HeroService) { }

  ngOnInit() { /** 렌더링 끝나고 호출됨 (DOM 조작시는 이 함수에 기능을 넣는다 */
    this.getTodoList();
  }

  getTodoList() {
    $.ajax({
      url: 'http://www.javabrain.kr:8080/api/todo',
      method: 'GET',
      dataType: 'json', /** 받을때 DataType을 정의 */
      success: (data) => {
        console.log(data);
        this.todoList = data;
        this.refresh();
      }
    });
  }

  refresh() {
    console.log('refresh');
    $('#todo_list').empty();

    this.todoList.forEach(function(item, index) {
      const todo =
        '<tr>' +
        '<td>' +
        (item.isFinished ? '완료' : '미완료') +
        '</td>' +
        (item.isFinished ? '<td style="text-decoration: line-through">' : '<td>') + item.todo + '</td>' +
        '<td>' + item.created + '</td>' +
        '<td>' + item.updated + '</td>' +
        '<td>' +
        '<button type="button">삭제</button>' +
        '</td>' +
        '</tr>';
      $('#todo_list').append(todo);
    });
  }

}
