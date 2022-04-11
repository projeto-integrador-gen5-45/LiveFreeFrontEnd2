import { Categoria } from "./Categoria";
import { User } from "./User";

export class Servico{
  
  public id: number;
  public titulo:string;
  public texto:string;
  public data:Date;
  public usuario:User;
  public categoria: Categoria
}


