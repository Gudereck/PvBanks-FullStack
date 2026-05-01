package hackton.Financas.Repository;

import hackton.Financas.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    // Agora buscamos apenas as transações de um usuário específico!
    List<Transacao> findByUsuarioId(Long usuarioId);
}