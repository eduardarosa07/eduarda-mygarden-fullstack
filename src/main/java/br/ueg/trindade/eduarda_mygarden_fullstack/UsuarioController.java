package br.ueg.trindade.eduarda_mygarden_fullstack;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {

        List<Usuario> users = new ArrayList<>();

        Usuario usuario1 = new Usuario(
            "João",
            "joao123",
            "senha123",
            "joao@example.com"
        );

        Usuario usuario2 = new Usuario(
            "Maria",
            "maria456",
            "senha456",
            "maria@example.com"
        );

        users.add(usuario1);
        users.add(usuario2);

        return users;
    }
}