import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv"

dotenv.config()
@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@myoceanmath.w3fdq.mongodb.net/users?retryWrites=true&w=majority`, 
      { useNewUrlParser: true, useFindAndModify: true }
    )],
})
export class AppModule {}
