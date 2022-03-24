import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = []; 
  constructor(
    public http: HttpClient
  ) { }

  public getTodos(): Observable<Todo[]>{
    return new Observable<Todo[]>(subscriber=>{
      console.log(this.todos)
      subscriber.next(this.todos);
    })
  }

  public async addTodos(todo: Todo): Promise<Boolean>{
    try{
      this.todos.push(todo);
      return true;
    }catch(error){
      return false;
    }
  }

  public getRandomTodo(): Promise<Todo>{
    return new Promise(resolve => {
      //let id: Number = Math.floor(Math.random() * 100);
      let id: Number = 1; // Api doesn't working with other IDs 
      this.http.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`).subscribe((data: Todo) => {
        resolve(data)
      })  
    })
  }
}
