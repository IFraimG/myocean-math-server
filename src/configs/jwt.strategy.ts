import { UsersService } from './../services/users.service';
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as dotenv from "dotenv"

dotenv.config()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        })
    }

    async validate(payload: any) {
        let user = await this.userService.getUserByID(payload.id)
        if (user == null) throw new UnauthorizedException("Неккоректная авторизация")
        
        return { id: payload.id, email: payload.email }
    }
}