package hackton.Financas.controller;

import hackton.Financas.dto.ResumoFinanceiroDTO;
import hackton.Financas.model.Transacao;
import hackton.Financas.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Transacao atualizar(@PathVariable String id, @RequestBody Transacao transacaoAtualizada) {
        return service.atualizar(id, transacaoAtualizada);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable String id){
        service.deletar(id);
    }

    @GetMapping("/resumo")
    public ResumoFinanceiroDTO obterResumo() {
        return service.obterResumo();
    }
}