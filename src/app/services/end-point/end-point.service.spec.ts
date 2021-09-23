import { TestBed } from "@angular/core/testing";
import { EndPointService } from "./end-point.service";

describe('EndPointService', ()=> {
    let service: EndPointService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EndPointService);
    });

        it('should be created' , () => {
        const service: EndPointService = TestBed.get(EndPointService);
        expect(service).toBeTruthy();
    });
});