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

    public static boolean matches(String senhaInformada, String senhaArmazenada) {
        if (senhaInformada == null || senhaArmazenada == null || !senhaArmazenada.contains(":")) {
            return false;
        }

        try {
            String[] partes = senhaArmazenada.split(":", 2);
            byte[] salt = Base64.getDecoder().decode(partes[0]);
            byte[] hashArmazenado = Base64.getDecoder().decode(partes[1]);
            byte[] hashInformado = pbkdf2(senhaInformada.toCharArray(), salt);

            if (hashArmazenado.length != hashInformado.length) {
                return false;
            }

            int diferenca = 0;
            for (int i = 0; i < hashArmazenado.length; i++) {
                diferenca |= hashArmazenado[i] ^ hashInformado[i];
            }
            return diferenca == 0;
        } catch (IllegalArgumentException ex) {
            return false;
        }
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
