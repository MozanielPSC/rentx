import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;

}

@injectable()
class CreateCarUseCase {
  constructor(@inject("CarsRepository") 
    private carsRepository: ICarsRepository) {

  }
  async execute({ name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id }: IRequest): Promise<Car> {
    const carVerify = await this.carsRepository.findByLicensePlate(license_plate);
    if (carVerify) {
      throw new AppError("Carro já existe");
    }
    const car = await this.carsRepository.create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate });
    return car;
  }
}
export { CreateCarUseCase };