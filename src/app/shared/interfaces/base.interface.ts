import { IdeiaInterface } from "./ideia.interface";

export interface BaseInterface<T>{
    total: number,
    pagina: number,
    limite: number,
    paginas: number, 
    dados: T[]
}