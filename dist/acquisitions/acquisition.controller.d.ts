import { AcquisitionService } from './acquisition.service';
import { CreateAcquisitionDto } from './dto/CreateAcquisition.dto';
export declare class AcquisitionController {
    private acquisitionService;
    constructor(acquisitionService: AcquisitionService);
    getAll(): Promise<import("./dto/ListAcquisition.dto").ListAcquisitionDTO[]>;
    getOneById(id: string, userRoles: string, req: any): Promise<import("./dto/ListAcquisition.dto").ListAcquisitionDTO>;
    create(data: CreateAcquisitionDto, req: any, userRoles: any): Promise<import("../core/http/nest-response").NestResponse>;
}
