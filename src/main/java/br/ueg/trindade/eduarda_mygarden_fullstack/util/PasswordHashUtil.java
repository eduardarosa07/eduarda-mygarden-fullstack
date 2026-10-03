package br.ueg.trindade.eduarda_mygarden_fullstack.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public final class PasswordHashUtil {
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int ITERATIONS = 65536;
    private static final int KEY_LENGTH = 256;

    private PasswordHashUtil() {
    }

    public static String hash(String senha) {
        if (senha == null || senha.isBlank()) {
            throw new IllegalArgumentException("Senha é obrigatória");
        }
        byte[] salt = new byte[16];
        RANDOM.nextBytes(salt);
        byte[] hash = pbkdf2(senha.toCharArray(), salt);
        return Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToString(hash);
    }

    private static byte[] pbkdf2(char[] senha, byte[] salt) {
        try {
            PBEKeySpec spec = new PBEKeySpec(senha, salt, ITERATIONS, KEY_LENGTH);
            return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            throw new IllegalStateException("Não foi possível proteger a senha", ex);
        }
    }
}
