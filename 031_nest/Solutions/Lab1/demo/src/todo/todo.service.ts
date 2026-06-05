import { Injectable } from '@nestjs/common';
import type { Todo } from './todo.type';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  getAll(): Todo[] {
    return this.todos;
  }

  getOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id == id);
    if (!todo) throw new Error(`Todo with id ${id} not found`);
    return todo;
  }

  create(todo: Todo): Todo {
    const newTodo = { ...todo, id: this.idCounter++ };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updatedTodo: Partial<Todo>): Todo {
    const todo = this.getOne(id);
    Object.assign(todo, updatedTodo);
    return todo;
  }

  delete(id: number): void {
    const index = this.todos.findIndex(todo => todo.id == id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    } else {
      throw new Error(`Todo with id ${id} not found`);
    }
  }
}