import {hash} from "bcryptjs";
import {v4 as uuidv4} from "uuid";
import createConnection from "../index";



async function createAdmin(){
 const connection =  await createConnection("localhost");
 const id = uuidv4();
 const password = await hash("1234",8)
 await connection.query(
   `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license) values(
     '${id}','name','email','${password}',true,'now()','123'
   )`
 );

 await connection.close;
}
createAdmin().then(()=>console.log("User admin created"));