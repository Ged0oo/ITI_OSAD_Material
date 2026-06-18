import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) { }

  createTodo(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.repo.create(dto);
    return this.repo.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Todo | null> {
    return this.repo.findOneBy({ id });
  }

  async updateTodo(id: number, dto: UpdateTodoDto): Promise<Todo | null> {
    await this.repo.update(id, dto);
    return this.findById(id);
  }

  async deleteTodo(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}