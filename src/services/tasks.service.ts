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
      let tasks = await this.Tasks.find().lean().exec()
      let arrIndex: Array<number> = []
      let i = 0;
      while (i < 5) {
        let num = Math.floor(Math.random() * tasks.length);
        if (!arrIndex.includes(num)) {
          arrIndex[i] = num
          i++;
        }
      }

      let tasksArray = []
      for (let j = 0; j < i; j++) {
        tasksArray[j] = tasks[arrIndex[j]]
      }

      return tasksArray
    }

    async findTasks(arrTasksID: Array<string>) {
      let arrTasks = []
      arrTasksID.map(async item => {
        let res = await this.Tasks.findOne({id: item}).exec()
        if (res != null) arrTasks.push(res)
      })

      return arrTasks
    }

    async deleteTasks(taskID: string) {
      let task = await this.Tasks.findOneAndRemove({id: taskID}).exec()
      return task
    }
}
