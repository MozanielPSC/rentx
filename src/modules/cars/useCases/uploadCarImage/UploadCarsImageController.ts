import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarsImageUseCase } from "./UploadCarsImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarsImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const uploadCarsImageUseCase = container.resolve(UploadCarsImageUseCase);
    const fileNames = images.map((file) => file.filename)
    await uploadCarsImageUseCase.execute({
      car_id: id,
      images_name: fileNames
    })

    return response.status(201).send();
  }
}

export { UploadCarsImageController };