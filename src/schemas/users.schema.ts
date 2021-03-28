import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = Document & User

@Schema()
export class User {
    @Prop({ required: true, unique: false })
    login: string

    @Prop({ required: true, unique: false })
    password: string

    @Prop({ required: true, })
    email: string

    @Prop()
    tasks: Array<string>
    
    @Prop({ required: true, unique: true })
    id: string
}

export const UserSchema = SchemaFactory.createForClass(User)