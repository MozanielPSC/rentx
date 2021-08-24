import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid"
import { Connection } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/";
let connection: Connection;
describe("Create category controller", () => {
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
  it("Should be able to create a new category", async () => {

    const responseToken = await request(app).post("sessions").send(
      {
        email: "email",
        password: "1234"
      }
    );
    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send(
      {
        name: "name",
        description: "description"
      }
    ).set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });

  it("Should not be able to create a category when its name already exists", async () => {
    
    const responseToken = await request(app).post("sessions").send(
      {
        email:"email",
        password:"1234"
      }
    );
    const {token} = responseToken.body;
    
    const response = await request(app).post("/categories").send(
      {
        name: "name",
        description: "description"
      }).set({Authorization:`Bearer ${token}`});
    expect(response.status).toBe(400);
  });

});