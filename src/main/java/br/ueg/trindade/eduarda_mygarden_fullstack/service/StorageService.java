package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class StorageService {
    private static final long MAX_BYTES = 2 * 1024 * 1024;
    private static final Set<String> EXTENSOES = Set.of("png", "jpg", "jpeg", "webp");
    private final Path pasta = Paths.get("uploads", "habitos").toAbsolutePath().normalize();

    public String salvarImagemHabito(MultipartFile arquivo) {
        if (arquivo == null || arquivo.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selecione uma imagem");
        }
        if (arquivo.getSize() > MAX_BYTES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A imagem deve ter no máximo 2 MB");
        }
        String original = arquivo.getOriginalFilename() == null ? "imagem.png" : arquivo.getOriginalFilename();
        String extensao = original.contains(".") ? original.substring(original.lastIndexOf('.') + 1).toLowerCase() : "";
        if (!EXTENSOES.contains(extensao) || arquivo.getContentType() == null || !arquivo.getContentType().startsWith("image/")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Envie uma imagem PNG, JPG, JPEG ou WEBP");
        }
        try {
            Files.createDirectories(pasta);
            String nome = UUID.randomUUID() + "." + extensao;
            Files.copy(arquivo.getInputStream(), pasta.resolve(nome), StandardCopyOption.REPLACE_EXISTING);
            return nome;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Não foi possível salvar a imagem");
        }
    }
}
