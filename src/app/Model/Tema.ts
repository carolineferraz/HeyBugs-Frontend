import { Postagem } from "./Postagem"

export class Tema {
    public id: number
    public descricao: string
    public postagem: Postagem[] //os colchetes no final indicam que será um array de postagens
}