import { UsersService } from './../services/users.service';
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("users")
export class UsersController {
    constructor(private users: UsersService) {}

    @Post("/create")
    createUser(@Body() user: any) {
        return this.users.create(user)
    }

    @Get("/all")
    allUsers() {
        return this.users.findAll()
    }

    @Get("/email/:email")
    getUserEmail(@Param("email") email: string) {
        return this.users.getUserByEmail(email)
    }

    @Get("/id/:id")
    getUserID(@Param("id") id: string) {
        return this.users.getUserByID(id)
    }
}