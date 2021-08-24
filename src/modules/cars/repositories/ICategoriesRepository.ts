import { Category } from "../infra/typeorm/entities/category";

//DTO => data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoriesRepository{
  findByName(name:string):Promise<Category>;
  list():Promise<Category[]>;
  create({name,description}:ICreateCategoryDTO):Promise<void>;
}
export {ICategoriesRepository};
export {ICreateCategoryDTO};