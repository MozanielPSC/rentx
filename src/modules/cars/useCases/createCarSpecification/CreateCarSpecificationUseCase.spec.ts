import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationInMemory } from "../../repositories/in-memory/SpecificationInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationInMemory:SpecificationInMemory;
describe("create car specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationInMemory = new SpecificationInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository,specificationInMemory);
    
  })
  it("should be able to create a car specification", async () => {
    const car = await carsRepository.create({
      name: "Name",
      license_plate: "License Plate",
      brand: "brand",
      description: "description",
      daily_rate: 0,
      fine_amount: 0,
      category_id: "id"
    });
    const specification = await specificationInMemory.create({name:"Name",description:"description"});
    const specifications_id =  [specification.id];
   const specifications_cars =  await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
   expect(specifications_cars).toHaveProperty("specifications");
   expect(specifications_cars.specifications.length).toBe(1);
  });
  it("should not be able to create a car specification to a non-existing car", async () => {
    expect(async () => {
      const car_id = "id";
      const specifications_id = ["123"];
      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
});