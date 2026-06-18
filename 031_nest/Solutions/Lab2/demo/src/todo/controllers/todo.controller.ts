import { Controller, Get, Post, Delete, Body, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
// import type { Todo } from '../todo.type';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly service: TodoService) { }

    @Post()
    create(@Body() dto: CreateTodoDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTodoDto,
    ) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}