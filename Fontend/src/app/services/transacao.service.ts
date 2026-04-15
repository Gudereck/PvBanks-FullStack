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
}
