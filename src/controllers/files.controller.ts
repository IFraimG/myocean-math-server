import { FileService } from './../services/file.service';
import { Controller, Get, HttpException, HttpStatus, Param, Res } from "@nestjs/common";
import * as fs from "fs"

@Controller("/files")
export class FilesController {
    constructor (private fileService: FileService) {}

    @Get("/:filename")
    async getImage(@Param("filename") filename: string, @Res() res: any) {
        if (fs.existsSync("tasks/" + filename)) res.sendFile(filename, { root: 'tasks'});
        else throw new HttpException("Изображение не найдено", HttpStatus.NOT_FOUND)
    }
}