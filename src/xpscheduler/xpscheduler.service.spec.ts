import { Test, TestingModule } from "@nestjs/testing";
import { XpschedulerService } from "./xpscheduler.service";

describe("XpschedulerService", () => {
  let service: XpschedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XpschedulerService],
    }).compile();

    service = module.get<XpschedulerService>(XpschedulerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
