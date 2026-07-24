import { Body, Controller, Delete, Get, Put, Query, UploadedFile } from "@nestjs/common";
import { ArchivDossierService } from "../services/archivDossier.service";
import { UsePatientFile } from "../../../helpers/decorator/PatientFiles.decorator";
import { DeleteDossierDto, FindOnlyDossierDto, ReplaceDossierDto } from "../dto/archivDossier.dto";

@Controller('dossier')
export class ArchivDossierController {
    constructor(
        private readonly archivDossierService : ArchivDossierService
    ){}
    

    @UsePatientFile('dossier')
    @Put()
    async replaceDossier(
        @Body() body : ReplaceDossierDto,
        @UploadedFile() file : Express.Multer.File
    ){
        return await this.archivDossierService.replaceDossier(body, file)
    }


    @Delete()
    async softDeleteDossier(@Body() body : DeleteDossierDto){
        return await this.archivDossierService.softDeleteDossier(body)
    }

    @Get()
    async findOnlyDossier(@Query() query : FindOnlyDossierDto){
        return await this.archivDossierService.findOnlyDossier(query)
    }

}