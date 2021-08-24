import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
@Entity("users")
class User {
  constructor() { 
    if(!this.id){
      this.id = uuidv4();
    }
  }
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  driver_license: string;
  @Column()
  email: string;
  @CreateDateColumn()
  created_at: Date;
  @Column()
  isAdmin: boolean;
  @Column()
  avatar:string;
}

export { User }