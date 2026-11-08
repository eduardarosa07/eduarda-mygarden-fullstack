package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;

@Service
public class UsuarioLogadoService {
    private final UsuarioService usuarioService;

    public UsuarioLogadoService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    public String exigirUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Faça login para acessar seus dados");
        }
        return authentication.getName();
    }

    public Usuario exigirUsuario() {
        return usuarioService.buscarPorUsername(exigirUsername());
    }

    public Long exigirUsuarioId() {
        return exigirUsuario().getId();
    }
}
