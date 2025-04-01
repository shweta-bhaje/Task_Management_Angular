import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serialize } from 'v8';
import { TodoModel } from './todo.model';

export interface Task{
  id:number,
  title:string,
  description:string,
  priority:string,
  completed:boolean,
  deadLine:string
}

@Injectable({
  providedIn: 'root'
})
export class WorkService {

 private url= "http://localhost:8080/task";


  constructor(private http:HttpClient) { }


getToDo():Observable<TodoModel[]>
{
  return this.http.get<TodoModel[]>("http://localhost:8080/do/get");
}

createTodo(todo:any):Observable<any>
{
   return this.http.post("http://localhost:8080/do/post",todo);
}

updateTodo(id: number, todo: TodoModel): Observable<TodoModel> {
  return this.http.put<TodoModel>("http://localhost:8080/do/"+`${id}`, todo);
}

deleteTodo(id: number): Observable<TodoModel> {
  return this.http.delete<TodoModel>("http://localhost:8080/do/delete/"+`${id}`);
}
}
