package hackton.Financas.service;

import hackton.Financas.Repository.TransacaoRepository;
import hackton.Financas.dto.ResumoFinanceiroDTO;
import hackton.Financas.model.Transacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository repository;

    public Transacao criar(Transacao transacao) {
        return repository.save(transacao);
    }

    public List<Transacao> listarTodas() {
        return repository.findAll();
    }

    // AQUI ESTÁ A CORREÇÃO: "Long id" em vez de "String id"
    public Transacao atualizar(Long id, Transacao transacaoAtualizada) {
        if (repository.existsById(id)) {
            transacaoAtualizada.setId(id);
            return repository.save(transacaoAtualizada);
        }
        return null;
    }

    // AQUI TAMBÉM: "Long id" em vez de "String id"
    public boolean deletar(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    public ResumoFinanceiroDTO obterResumo() {
        List<Transacao> todasTransacoes = repository.findAll();

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
}