package hackton.Financas.controller;

import hackton.Financas.Repository.TransacaoRepository;
import hackton.Financas.dto.ResumoFinanceiroDTO;
import hackton.Financas.model.Transacao;
import hackton.Financas.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "http://localhost:4200")
public class TransacaoController {

    // 1. APENAS O SERVICE FICA AQUI. O Repository foi embora!
    @Autowired
    private TransacaoService service;

    // 2. Todos os métodos agora chamam apenas o "service"

    @PostMapping
    public Transacao criar(@RequestBody Transacao transacao){
        return service.criar(transacao);
    }

    @GetMapping
    public List<Transacao> listarTodas(){
        return service.listarTodas();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizarTransacao(@PathVariable String id,@RequestBody Transacao transacaoAtualizada){
        Transacao transacaoSalva = service.atulizar(id , transacaoAtualizada);
        if (transacaoSalva != null){
            return ResponseEntity.ok(transacaoSalva);
        }
        return ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTransacao(@PathVariable String id){
        boolean deletadoComSucesso = service.deletar(id);

        if (!deletadoComSucesso){
            return ResponseEntity.notFound().build(); // Retorna Erro 404 se não achar
        }

        return ResponseEntity.noContent().build(); // Retorna Status 204 se deu tudo certo
    }

    @GetMapping("/resumo")
    public ResumoFinanceiroDTO obterResumo() {
        return service.obterResumo();
    }
}
