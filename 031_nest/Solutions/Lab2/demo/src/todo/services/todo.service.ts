import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) { }

  create(dto: CreateTodoDto) {
    return this.repo.createTodo(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const todo = await this.repo.findById(id);
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  async update(id: number, dto: UpdateTodoDto) {
    const todo = await this.repo.updateTodo(id, dto);
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  async remove(id: number) {
    const deleted = await this.repo.deleteTodo(id);
    if (!deleted) throw new NotFoundException(`Todo ${id} not found`);
    return { deleted: true };
  }
}