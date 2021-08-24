import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/inmemory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let repository: RentalsRepositoryInMemory;
let dateProvider:DayjsDateProvider;
let carsRepository:CarsRepositoryInMemory;
describe("Create Rental", () => {
  beforeEach(() => {
    repository = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider()
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(repository,dateProvider,carsRepository);
  });
  it("should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "id",
      car_id: "id",
      expected_return_date: new Date()
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should now be able to create a rental if there is already one user with car", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "id",
        car_id: "1234",
        expected_return_date: new Date()
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "id",
        car_id: "1321",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a rental if the car is rented",async()=>{
    expect(async()=>{
      const rental =  await createRentalUseCase.execute({
        user_id:"123",
        car_id:"id",
        expected_return_date: new Date()
      });
 
      const rental2 =  await createRentalUseCase.execute({
       user_id:"321",
       car_id:"id",
       expected_return_date: new Date()
     });
    }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a rental with an invalid rent time",async()=>{
      expect(async()=>{
        const rental =  await createRentalUseCase.execute({
          user_id:"123",
          car_id:"id",
          expected_return_date: dayjs().toDate()
        });
      }).rejects.toBeInstanceOf(AppError);
      });
});