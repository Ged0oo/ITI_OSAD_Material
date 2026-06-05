import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import type { Todo } from './todo.type';

@Controller('todos')
export class TodoController {
	constructor(private readonly todoService: TodoService) { }

	@Get()
	getAll(): Todo[] {
		return this.todoService.getAll();
	}

	@Get(':id')
	getOne(@Param('id') id: number): Todo {
		return this.todoService.getOne(id);
	}

	@Post()
	create(@Body() todo: Todo): Todo {
		return this.todoService.create(todo);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updatedTodo: Partial<Todo>): Todo {
		return this.todoService.update(id, updatedTodo);
	}

	@Delete(':id')
	delete(@Param('id') id: number): void {
		this.todoService.delete(id);
	}
}