import { TasksService } from './../services/tasks.service';
import { TasksController } from './../controllers/tasks.controller';
import { TaskSchema } from './../schemas/tasks.schema';
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({ 
    imports: [MongooseModule.forFeature([{ name: "Tasks", schema: TaskSchema }])],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService]
})
export class TasksModule {}