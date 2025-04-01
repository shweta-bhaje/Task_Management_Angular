import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WorkService } from '../work.service';
import { title } from 'process';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  todos: TodoModel[] = [];
  newTodo: TodoModel = { id: 0, title: '', completed: false };
  editTodo: TodoModel = { id: 0, title: '', completed: false };
  constructor(private service:WorkService){}

ngOnInit()
{
  this.loadTodos();
}

loadTodos()
{
  this.service.getToDo().subscribe((response:any)=>
  {
    console.log(response);
    this.todos=response;
  })
}

addTodo() {
  if (this.newTodo.title) {
    this.service.createTodo(this.newTodo).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = { id: '', title: '', completed: false }; // Reset form
    });
  }
}
 // Update a todo
 updateTodo() {
  if (this.editTodo.id) {
    this.service.updateTodo(this.editTodo.id, this.editTodo).subscribe(() => {
      this.loadTodos(); // Reload todos after update
      this.editTodo = { id: '', title: '', completed: false }; // Reset form
    });
  }
}

 // Edit a todo
 edit(todo: TodoModel) {
  this.editTodo = { ...todo };
}
deleteTodo(id: number) {
  this.service.deleteTodo(id).subscribe(() => {
    this.todos = this.todos.filter(todo => todo.id !== id); // Remove deleted todo from the list
  });
}
}
