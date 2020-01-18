import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  todos: Observable<Todo[]>
  newTodo: Todo = new Todo()
  error: Boolean
  randomTodo: Todo = new Todo()


  constructor(
    private todoProvider: TodoService
  ) { }

  ngOnInit() {
    this.todos = this.todoProvider.getTodos();
  }


  /**
   * getRandomTodo
   */
  public getRandomTodo() {
    this.todoProvider.getRandomTodo()
    .then((random: Todo) => {
      this.randomTodo = random;
      this.saveTodo(random);
    })
  }

  /**
   * saveTodo
   */
  public saveTodo(newTodo) {
    let todo: Todo = {
      ...newTodo
    }
    if(!todo.title.length)
      return;
      
    this.todoProvider.addTodos(todo)
    .then(res => {
      this.newTodo = new Todo();
    })
    .catch(err =>{
      this.error = true;
    })
  }

  /**
   * changeStateOfTodo
   */
  public changeStateOfTodo(todo) {
    todo.completed = !todo.completed;
  }
}