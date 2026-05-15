package hackton.Financas.service;

import hackton.Financas.Repository.TransacaoRepository;
import hackton.Financas.dto.ResumoFinanceiroDTO;
import hackton.Financas.model.Transacao;

import hackton.Financas.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Security;
import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository repository;

    public Transacao criar(Transacao transacao) {
        Usuario usuario = new Usuario();
        usuario.setId(getUsuarioLogadoId());
        transacao.setUsuario(usuario);
        return repository.save(transacao);
    }


    private Long getUsuarioLogadoId() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((Usuario) principal).getId();
    }

    public List<Transacao> listarTodas() {
        return repository.findByUsuarioId(getUsuarioLogadoId());
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
        List<Transacao> transacoes = repository.findByUsuarioId(getUsuarioLogadoId());

        Double receitas = transacoes.stream()
                .filter(t -> "RECEITA".equalsIgnoreCase(t.getTipo()))
                .mapToDouble(Transacao::getValor)
                .sum();

        Double despesas = transacoes.stream()
                .filter(t -> "DESPESA".equalsIgnoreCase(t.getTipo()))
                .mapToDouble(Transacao::getValor)
                .sum();

        return new ResumoFinanceiroDTO(receitas, despesas, receitas - despesas);

    }
}