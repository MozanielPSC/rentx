import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid"
import { Connection } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/";
let connection: Connection;
describe("List category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const password = await hash("1234", 8);
    const id = uuidv4();
    await connection.query(
      `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license) values(
     '${id}','name','email','${password}',true,'now()','123'
   )`
    );

  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })
  it("Should be able to list categories", async () => {

    const responseToken = await request(app).post("sessions").send(
      {
        email: "email",
        password: "1234"
      }
    );
    const { token } = responseToken.body;

    await request(app).post("/categories").send(
      {
        name: "name",
        description: "description"
      }
    ).set({ Authorization: `Bearer ${token}` });
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  

});