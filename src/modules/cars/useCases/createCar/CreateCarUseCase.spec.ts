import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
   const  car =  await createCarUseCase.execute({
      name: "Nome",
      description: "Descricao",
      daily_rate: 2,
      license_plate: "Placa",
      fine_amount: 2,
      brand: "Marca",
      category_id: "id"
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car that already exists", async () => {
    expect( async()=>{
      await createCarUseCase.execute({
        name: "Nome",
        description: "Descricao",
        daily_rate: 2,
        license_plate: "Placa",
        fine_amount: 2,
        brand: "Marca",
        category_id: "id"
      });

      await createCarUseCase.execute({
        name: "Nome",
        description: "Descricao",
        daily_rate: 2,
        license_plate: "Placa",
        fine_amount: 2,
        brand: "Marca",
        category_id: "id"
      });
    }).rejects.toBeInstanceOf(AppError);
    
  });

  it("Should be available on default",async()=>{
  const car=await createCarUseCase.execute({
      name: "Nome",
      description: "Descricao",
      daily_rate: 2,
      license_plate: "Placa",
      fine_amount: 2,
      brand: "Marca",
      category_id: "id"
    });

    expect(car.available).toBe(true);

  
  });
});