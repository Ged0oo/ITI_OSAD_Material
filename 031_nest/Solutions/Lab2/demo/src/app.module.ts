import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/modules/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'nest_user',
			password: '1234',
			database: 'nest_db',
			autoLoadEntities: true,
			synchronize: true,
		}),
		TodoModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
