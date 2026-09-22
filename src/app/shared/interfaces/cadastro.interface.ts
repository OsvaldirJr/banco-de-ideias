export interface CadastroInterface {
    nome: string;
    email: string;
    senha: string;
}

export interface LoginInterface {
    email: string | null;
    senha: string | null;
}

export interface AutenticacaoResposta {
    usuario: {
        id: number;
        nome: string;
        email: string;
    };
    token: string;
}