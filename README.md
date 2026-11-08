# 🌱 My Garden

O **My Garden** é um sistema web para organizar tarefas, seções e hábitos. Conforme o usuário conclui suas tarefas, as plantas do jardim evoluem visualmente.

## N2

A versão da N2 acrescenta **Hábitos** e **Registros de Hábitos**, relacionados em `1:N`, CRUD completo e autenticação com **Spring Security + JWT**.

### Tecnologias
- Java 21 + Spring Boot 4.1.1
- Spring Data JPA + H2 (PostgreSQL disponível no projeto)
- Spring Security + JWT
- React + TypeScript + Vite + React Router
- Axios
- Bean Validation
- MultipartFile para upload de imagem
- Docker / Docker Compose

## Rodar localmente

Back-end:
```powershell
.\mvnw.cmd spring-boot:run
```

Front-end (outro terminal):
```powershell
cd .\src\main\frontend
npm install
npm run dev
```

Site: `http://localhost:5173`  
H2 Console: `http://localhost:8080/h2-console`

JDBC URL: `jdbc:h2:file:./data/mygarden;AUTO_SERVER=TRUE`  
Usuário H2: `sa`  
Senha: em branco

## Docker
```bash
docker compose up --build
```

> Consulte `CHECKLIST_N2.md` para ver os critérios implementados.


## Autenticação da N2

A autenticação segue o padrão do projeto de referência fornecido pelo professor:

- Spring Security com sessão `STATELESS`;
- BCrypt para senhas;
- JWT com `jjwt 0.12.6`;
- `JwtFilter`, `JwtUtil` e `SecurityConfig`;
- Axios envia `Authorization: Bearer <token>` automaticamente;
- React Router protege as páginas privadas;
- área administrativa disponível para usuários com permissão `ADMIN`.

Usuário administrativo criado automaticamente para testes locais:

- username: `admin`
- senha: `admin123`

Usuários cadastrados pela tela recebem a permissão `USER` automaticamente.
