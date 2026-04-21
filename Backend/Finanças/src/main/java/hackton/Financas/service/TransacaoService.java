package hackton.Financas.service;

import hackton.Financas.Repository.TransacaoRepository;
import hackton.Financas.dto.ResumoFinanceiroDTO;
import hackton.Financas.model.Transacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 1. O que é isso?
public class TransacaoService {

    @Autowired // 2. O que é isso?
    private TransacaoRepository repository;

    public Transacao criar(Transacao transacao) {
        return repository.save(transacao);
    }

    public List<Transacao> listarTodas() {
        return repository.findAll();
    }

    public Transacao atualizar(String id, Transacao transacaoAtualizada) {
        transacaoAtualizada.setId(id);
        return repository.save(transacaoAtualizada);
    }

    public boolean deletar(String id) {
        // Verifica se o ID existe usando o seu repository (a variável com letra minúscula)
        if (!repository.existsById(id)) {
            return false; // Retorna falso se não achar no MongoDB
        }

        // Se existir, apaga e retorna verdadeiro para o Controller
        repository.deleteById(id);
        return true;
    }

    public ResumoFinanceiroDTO obterResumo() {
        // Busca todos os ingredientes na despensa (MongoDB)
        List<Transacao> todasTransacoes = repository.findAll();

        // 3. A Mágica do Java Streams (A conta de matemática)
        Double receitas = todasTransacoes.stream()
                .filter(t -> "RECEITA".equalsIgnoreCase(t.getTipo()))
                .mapToDouble(Transacao::getValor)
                .sum();

        Double despesas = todasTransacoes.stream()
                .filter(t -> "DESPESA".equalsIgnoreCase(t.getTipo()))
                .mapToDouble(Transacao::getValor)
                .sum();

        Double saldo = receitas - despesas;

        return new ResumoFinanceiroDTO(receitas, despesas, saldo);
    }
    public Transacao atulizar(String id, Transacao transacaoAtualizado){
        if (repository.existsById(id)){
            transacaoAtualizado.setId(id);
            return repository.save(transacaoAtualizado);
        }
        return null;
    }
}