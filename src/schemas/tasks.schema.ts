import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type TaskDocument = Document & Task

@Schema()
export class Task {
    @Prop()
    title: string

    @Prop({ required: true })
    text: string

    @Prop()
    screenshots: Array<string>

    @Prop({ required: true  })
    answer: string
    
    @Prop()
    others: Array<number | string>

    @Prop({ unique: true, required: true })
    id: string

    @Prop()
    type: String

    @Prop({ required: false, unique: false })
    token: String

    @Prop({ required: false, unique: false })
    src: string

    @Prop({ required: true, unique: false, default: 1 })
    level: number
}

export const TaskSchema = SchemaFactory.createForClass(Task)