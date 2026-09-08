import { IdeiaInterface } from "./ideia.interface";

export interface BaseInterface{
    total: number,
    pagina: number,
    limite: number,
    paginas: number, 
    dados: IdeiaInterface[]
}