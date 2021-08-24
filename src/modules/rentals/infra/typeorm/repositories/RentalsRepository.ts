import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
 async findByUserId(user_id: string): Promise<Rental[]> {
  return await this.repository.find({where:{
    user_id,
    relations:["car"]
  }});
  }
  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id);
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const carRental = await this.repository.findOne({ where: { car_id, end_date: null } });
    return carRental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const userRental = await this.repository.findOne({ where: { user_id, end_date: null } });
    return userRental;
  }
  async create({ car_id, expected_return_date, user_id, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ car_id, expected_return_date, user_id, id, end_date, total });
    await this.repository.save(rental);
    return rental;
  }
}
export { RentalsRepository };