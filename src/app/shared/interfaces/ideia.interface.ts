export interface IdeiaInterface{
  id?: number;
  ideia: string;
  resolve: string;
  categoria?: string | null;
  criadoEm?: string;
  votos?: number;
  autor?: string | null;
  votei?: boolean;
  souAutor?: boolean;
}

export interface IdeiaInterfaceGroup{
  ideia: any[];
  resolve: any[];
  categoria: any[];
}
