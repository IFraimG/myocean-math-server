import { TasksService } from './../services/tasks.service';
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

@Controller("tasks")
export class TasksController {
    constructor(private tasks: TasksService) {}

    @Post("/create")
    addTask(@Body() task: any) {
        return this.tasks.create(task)
    }

    @Get("/all")
    allUsers() {
        return this.tasks.findAll()
    }

    @Get("/level")
    getTasksForLevel() {
        return this.tasks.getTasksForLevel()
    }

    @Put("/token")
    createToken(@Body("userID") userID: string) {
        return this.tasks.createToken(userID)
    }
    
}