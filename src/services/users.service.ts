import { UserDocument } from './../schemas/users.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
    constructor(@InjectModel("Users") private User: Model<UserDocument>) {}

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
}
