import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
 async updateAvailable(id: string,available:boolean): Promise<void> {
    this.cars.find(car=>car.id===id).available = available;
  }
 async findById(car_id: string): Promise<Car> {
    const car = this.cars.find(car=> car.id === car_id);
    return car;
  }
  async findAllAvailableCars(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const all = this.cars.filter((car)=>{
      if (car.available === true || (brand && car.brand === brand)
        || (category_id && car.category_id === category_id) ||
        (name && car.name === name)) {
          return car;
      }
      return null;
    }); 
    return all;
     
  }

  cars: Car[] = [];
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const carVerify = this.cars.find(car => car.license_plate === license_plate);
    return carVerify;
  }
  async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate,id }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand, category_id, daily_rate, description, fine_amount, name, license_plate,id
    });
    this.cars.push(car);
    return car;
  }

}
export { CarsRepositoryInMemory };