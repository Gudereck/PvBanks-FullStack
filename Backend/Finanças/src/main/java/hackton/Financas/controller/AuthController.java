package hackton.Financas.controller;

import hackton.Financas.Repository.UsuarioRepository;
import hackton.Financas.dto.CadastroDTO;
import hackton.Financas.dto.LoginDTO;
import hackton.Financas.dto.TokenDTO;
import hackton.Financas.model.Usuario;
import hackton.Financas.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth") // Arrumei a barra que faltava aqui também!
@CrossOrigin(origins = "http://localhost:4200") // Adicionei as barras do http://
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO data) {

        // 1. Corrigido: getEmail() com E maiúsculo
        Optional<Usuario> usuarioBuscado = usuarioRepository.findByEmail(data.getEmail());

        if (usuarioBuscado.isEmpty()) {
            return ResponseEntity.status(401).body("E-mail ou senha incorretos");
        }

        Usuario usuario = usuarioBuscado.get();

        if (passwordEncoder.matches(data.getSenha(), usuario.getSenha())){
            String token = tokenService.gerarToken(usuario);
            return ResponseEntity.ok(new TokenDTO(token));
        }

        return ResponseEntity.status(401).body("E-mail ou senha incorretos");
    }
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody CadastroDTO data) {

        // Verifica se o e-mail já existe no banco para não duplicar
        if (usuarioRepository.findByEmail(data.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("Este e-mail já está em uso.");
        }

        // Cria um novo usuário em branco
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(data.getNome());
        novoUsuario.setEmail(data.getEmail());

        // 🔒 A MÁGICA ACONTECE AQUI: Criptografa a senha antes de salvar!
        String senhaCriptografada = passwordEncoder.encode(data.getSenha());
        novoUsuario.setSenha(senhaCriptografada);

        // Salva no banco de dados MySQL
        usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok("Usuário criado com sucesso!");
    }
}