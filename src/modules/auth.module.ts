import { UsersModule } from './users.module';
import { UsersService } from './../services/users.service';
import { JwtStrategy } from './../configs/jwt.strategy';
import { AuthController } from './../controllers/auth.controller';
import { LocalStrategy } from './../configs/local.strategy';
import { AuthSerivce } from './../services/auth.service';
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv"

dotenv.config()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }), 
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }
        }),
        UsersModule
    ],
    providers: [AuthSerivce, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}