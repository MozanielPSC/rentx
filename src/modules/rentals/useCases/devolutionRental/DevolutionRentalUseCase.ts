import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider
  ) {

  }
  async execute({ id, user_id }: IRequest):Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id)
    if (!rental) {
      throw new AppError("Rental does not exists");
    }
    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (daily <= 0) {
      daily = 1;
    }
    const compareDelay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);
    let total = 0;
    if (compareDelay > 0) {
        total = compareDelay*car.fine_amount;
    }

    total += daily * car.daily_rate;
    rental.end_date = dateNow;
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id,true);
    return rental;
  }
}

export { DevolutionRentalUseCase }