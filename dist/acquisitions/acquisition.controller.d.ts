import { AcquisitionService } from './acquisition.service';
import { CreateAcquisitionDto } from './dto/CreateAcquisition.dto';
export declare class AcquisitionController {
    private acquisitionService;
    constructor(acquisitionService: AcquisitionService);
    getAll(): Promise<import("./dto/ListAcquisition.dto").ListAcquisitionDTO[]>;
    getOneById(id: string): Promise<import("./dto/ListAcquisition.dto").ListAcquisitionDTO>;
    create(data: CreateAcquisitionDto): Promise<import("../core/http/nest-response").NestResponse>;
}
