import { Routes } from '@angular/router';
import { create } from 'domain';
import { createComponent } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  
    
   
    {
        path:'todo',
        component:TodoComponent
    }
];
