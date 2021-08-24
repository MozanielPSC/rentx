import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { Car } from "../typeorm/entities/Car";

class CarsRepository implements ICarsRepository{
  private repository:Repository<Car>;

  constructor(){
    this.repository = getRepository(Car);
  }
 async updateAvailable(id: string,available:boolean): Promise<void> {
   await this.repository.createQueryBuilder().update()
   .set({available})
   .where("id = :id")
   .setParameters({id})
   .execute();
  }
  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne(car_id);
    return car;
  }
  async findAllAvailableCars(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available",{available:true});
    if(brand){
      carsQuery.andWhere("c.brand = :brand",{brand});
    }
    if(name){
      carsQuery.andWhere("c.name= :name",{name});
    }
    if(category_id){
      carsQuery.andWhere("c.category_id= :category_id",{category_id});
    }
   const cars =  await carsQuery.getMany();
   return cars;
  }
 async create({name,description,daily_rate,license_plate,fine_amount,brand,category_id,specifications,id}: ICreateCarDTO): Promise<Car> {
   const car = this.repository.create({name,description,daily_rate,license_plate,fine_amount,brand,category_id,specifications,id});
   await this.repository.save(car);
   return car;
  }
 async findByLicensePlate(license_plate: string): Promise<Car> {
   const car = await this.repository.findOne({license_plate});
   return car;
  }

}

export{CarsRepository};