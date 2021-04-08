import { TaskDocument } from './../schemas/tasks.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';


@Injectable()
export class TasksService {
    constructor(@InjectModel("Tasks") private Tasks: Model<TaskDocument>) {}

    async create(task: any) {
        let data = {...task, id: ""}
        let isNotTask = false
        let words = "abcdefghijklmnopqrstuvwxyz";
        
        while (isNotTask != true) {
          let id = ""
          for (let i = 0; i <= 14; i++) {
            id += words.charAt(Math.floor(Math.random() * words.length))
          }
          let isUser = await this.Tasks.findOne({id: id}).exec()
          if (isUser == null) {
            isNotTask = true
            data.id = id
          }
        }
        return await this.Tasks.create(data)
    }

    async findAll() {
        return await this.Tasks.find()
    }

    async createToken(userID: string) {
      let tasks = await this.Tasks.find().limit(5).exec()
      let date = new Date().toLocaleDateString()
      tasks.map(async item => {
        item.token = userID + date
        await item.save()
      })
      
      return userID + date
    }
    
    async getTasksForLevel() {
      let tasks = await this.Tasks.find().limit(5).lean().exec()
      return tasks
    }
}
