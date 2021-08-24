import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase:ListCarsUseCase;
let carsRepository:CarsRepositoryInMemory;
describe("Should be able to list cars",()=>{
  beforeEach(()=>{
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });
  it("Should be able to list all available cars",async()=>{
  const car = await carsRepository.create({
      name:"Name",
      license_plate:"license",
      brand:"brand",
      category_id:"id",
      daily_rate: 0,
      description:"Salve",
      fine_amount:0
      
    })
   const cars=  await listCarsUseCase.execute({});
   expect(cars).toEqual([car]);
  });

  it("Should be able to list cars by category name",async()=>{
    const car = await carsRepository.create({
      name:"Name",
      license_plate:"license",
      brand:"brand",
      category_id:"id",
      daily_rate: 0,
      description:"Salve",
      fine_amount:0
      
    })
   const cars=  await listCarsUseCase.execute({category_id:"id"});
   expect(cars).toEqual([car]);
  });
  it("Should be able to list cars by branch name",async()=>{
    const car = await carsRepository.create({
      name:"Name",
      license_plate:"license",
      brand:"brand",
      category_id:"id",
      daily_rate: 0,
      description:"Salve",
      fine_amount:0
      
    })
   const cars=  await listCarsUseCase.execute({brand:"brand"});
   expect(cars).toEqual([car]);
  });

  it("Should be able to list cars by car name",async()=>{
    const car = await carsRepository.create({
      name:"Name",
      license_plate:"license",
      brand:"brand",
      category_id:"id",
      daily_rate: 0,
      description:"Salve",
      fine_amount:0
      
    })
   const cars=  await listCarsUseCase.execute({name:"Name"});
   expect(cars).toEqual([car]);
  });
});