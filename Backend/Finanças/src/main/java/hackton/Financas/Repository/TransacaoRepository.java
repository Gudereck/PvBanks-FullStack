package hackton.Financas.Repository;

import hackton.Financas.model.Transacao;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransacaoRepository extends MongoRepository<Transacao , String> {
}
