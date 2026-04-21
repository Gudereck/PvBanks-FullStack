import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResumoFinanceiro, Transacao } from "../models/transacao.model";

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = 'http://localhost:8080/api/transacoes';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

  obterResumo(): Observable<ResumoFinanceiro> {
    return this.http.get<ResumoFinanceiro>(`${this.apiUrl}/resumo`);
  }
  salvar(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrl, transacao);
  }
  // Adicione este método dentro do seu TransacaoService
  deletar(id: string): Observable<any> {
    // Substitua a URL base pela sua se estiver diferente
    const url = `http://localhost:8080/api/transacoes/${id}`;
    return this.http.delete(url);
  }
  atualizarTransacao(id: string, transacao: Transacao): Observable<Transacao> {
    // Usamos o método PUT e passamos o ID na URL e o objeto modificado no corpo da requisição
    return this.http.put<Transacao>(`${this.apiUrl}/${id}`, transacao);
  }
}
