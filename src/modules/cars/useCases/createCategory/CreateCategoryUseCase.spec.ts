import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create a category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("should be able to create a new category", async () => {
    await createCategory.execute({
      name: "Nome",
      description: "Descrição"
    });
    const verify =  await categoriesRepositoryInMemory.findByName("Nome");

    expect(verify).toHaveProperty("id");
  })
  it("should not be able to create a category when it already exists", async () => {
    expect(async ()=>{
      await createCategory.execute({
        name: "Nome",
        description: "Descrição"
      });
      await createCategory.execute({
        name: "Nome",
        description: "Descrição"
      });
      
    }).rejects.toBeInstanceOf(AppError);
  })
});