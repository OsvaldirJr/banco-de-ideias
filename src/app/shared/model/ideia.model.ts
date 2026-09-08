import { IdeiaInterface } from "../interfaces/ideia.interface";

export class IdeiaClass{
  id?: number;
  ideia?: string;
  resolve?: string;

  constructor(ideia?: Partial<IdeiaInterface>){
    this.id = ideia?.id;
    this.ideia = ideia?.ideia;
    this.resolve = ideia?.resolve;
  }

  toFormmattedString(){
    return `${this.id} - ${this.ideia}` 
  }
}