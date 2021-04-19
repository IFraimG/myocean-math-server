import { TasksModule } from './tasks.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './../services/users.service';
import { UsersController } from './../controllers/users.controller';
import { UserSchema } from './../schemas/users.schema';
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({ 
    imports: [
        TasksModule,
        MongooseModule.forFeature([{name: "Users", schema: UserSchema}]), 
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}