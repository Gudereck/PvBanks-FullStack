export interface Transacao {
    id?: string;
    descricao: string;
    valor: number;
    data: string;
    tipo: 'RECEITA' | 'DESPESA'; // <-- O Angular precisa saber que o "tipo" existe!
    categoria: string;
}

export interface ResumoFinanceiro {
    totalReceitas: number;
    totalDespesas: number;
    saldoTotal: number; // <-- Exatamente assim
}