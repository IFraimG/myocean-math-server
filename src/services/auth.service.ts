import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthSerivce {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async validateStudent(email: string, password: string) {
        let user = await this.userService.getUserByEmail(email)
        if (!user) return null

        let match = await bcrypt.compare(password, user.password)
        if (!match) return null

        return user;
    }
    
    public async create(user: any) {
        let pass: string = await bcrypt.hash(user.password, 10);
        const newUser = await this.userService.create({ login: user.login, password: pass, email: user.email, id: user.id });

        const token = await this.jwtService.signAsync({email: newUser.email, id: newUser.id})
        return { user: newUser, token };
    }
    public async login(user: any) {
        let token = await this.jwtService.signAsync({email: user.email, id: user.id})
        return { user, token };
    }
}