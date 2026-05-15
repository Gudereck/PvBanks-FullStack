package hackton.Financas.controller;

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

    @Autowired
    private TransacaoService service; // Nome da variável é 'service'

    @PostMapping
    public Transacao criar(@RequestBody Transacao transacao){
        return service.criar(transacao);
    }

    @GetMapping
    public List<Transacao> listarTodas(){
        return service.listarTodas();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(@PathVariable Long id, @RequestBody Transacao transacao) {
        // Correção: usando 'service.' em vez de 'transacaoService.'
        Transacao atualizada = service.atualizar(id, transacao);
        if (atualizada != null) {
            return ResponseEntity.ok(atualizada);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        // Correção: usando 'service.' em vez de 'transacaoService.'
        if (service.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

      @GetMapping("/resumo")
        public ResponseEntity<ResumoFinanceiroDTO> getResumo(){
        return ResponseEntity.ok(service.obterResumo());
    }
}