package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.UsuarioRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.AuthService;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.UsuarioLogadoService;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final UsuarioService usuarioService;
    private final UsuarioLogadoService usuarioLogadoService;

    public AuthController(AuthService authService, UsuarioService usuarioService, UsuarioLogadoService usuarioLogadoService) {
        this.authService = authService;
        this.usuarioService = usuarioService;
        this.usuarioLogadoService = usuarioLogadoService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request.username(), request.senha()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("erro", "Usuário ou senha inválidos"));
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario cadastrar(@Valid @RequestBody UsuarioRequest dados) {
        return usuarioService.criar(dados);
    }

    @GetMapping("/me")
    public Usuario me() {
        return usuarioLogadoService.exigirUsuario();
    }

    public record LoginRequest(String username, String senha) {}
}
