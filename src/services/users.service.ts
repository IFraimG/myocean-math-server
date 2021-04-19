import { TasksService } from './tasks.service';
import { TaskDocument } from './../schemas/tasks.schema';
import { UserDocument } from './../schemas/users.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
    constructor(@InjectModel("Users") private User: Model<UserDocument>, @InjectModel("Tasks") private Tasks: Model<TaskDocument>) {}

    async create(userData: any): Promise<UserDocument> {
        let data = { ...userData, id: "" }
        let isNotUser = false
        let words = "abcdefghijklmnopqrstuvwxyz";
        
        while (isNotUser != true) {
          let id = ""
          for (let i = 0; i <= 14; i++) {
            id += words.charAt(Math.floor(Math.random() * words.length))
          }
          let isUser = await this.User.findOne({id: id}).exec()
          if (isUser == null) {
            isNotUser = true
            data.id = id
          }
        }

        let user = await this.User.create(data);
        return user
    }
    
    async findAll(): Promise<UserDocument[]> {
        return await this.User.find().exec();
    }

    async getUserByID(id: string) {
        let res = await this.User.findOne({id: id}).exec()
        return res
    }

    async getUserByEmail(email: string) {
        let res = await this.User.findOne({email: email}).exec()
        console.log(res);
        
        return res
    }

    async saveTasks(tasksList: Array<any>, userID: string) {
      let user = await this.User.findOne({id: userID}).exec()
      tasksList.map(item => {
        if (!user.tasks.includes(item.id)) user.tasks.push(item.id)
      })

      await user.save()
      return user
    }

    async getFinishedTasks(userID: string) {
      let user = await this.User.findOne({id: userID}).exec()
      
      let arrTasks = []
      for (let i = 0; i < user.tasks.length; i++) {
        let res = await this.Tasks.findOne({id: user.tasks[i]})
        if (res != null) arrTasks.push(res)       
      }
      return arrTasks
    }
}
