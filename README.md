# My Garden — Avaliação N1

Projeto full stack de **Desenvolvimento Web II**, organizado para atender ao checklist da N1 e à documentação do My Garden.


## Tela de acesso

Ao abrir o front-end, o sistema apresenta uma tela de acesso com **nome de usuário** e **senha**.

- **Entrar**: valida o usuário cadastrado no back-end pelo endpoint `POST /api/usuarios/login`.
- **Cadastrar usuário**: abre a tela de cadastro de usuário. Após salvar, o sistema volta para a tela de entrada.
- A senha continua oculta nas respostas JSON e armazenada com hash.

## Tecnologias exigidas na N1

### Back-end

- Spring Boot 4.1.1
- Maven Wrapper
- Java 21
- Pacote base `br.ueg.trindade`
- Spring Web
- Spring Data JPA
- H2
- PostgreSQL (driver incluído no projeto)
- DevTools
- Spring Security

O **H2 é o banco ativo nesta etapa**, conforme o checklist. A dependência do PostgreSQL também está presente no `pom.xml`.

### Front-end

- React
- Vite
- TypeScript
- Axios
- Local: `src/main/frontend`
- Execução: `npm run dev`

## Entidades

O projeto possui as entidades definidas para o My Garden:

- `Usuario`
- `Permissao`
- `Secao`
- `Tarefa`
- `Planta`

Para o item **“entidade própria”** do checklist, a entidade utilizada é **Secao**, pois ela faz parte do conceito central do My Garden.

Todas possuem Repository próprio com `JpaRepository`.

## Arquitetura do back-end

```text
Controller -> Service -> Repository -> H2
```

Pacotes:

```text
src/main/java/br/ueg/trindade/eduarda_mygarden_fullstack/
├── config/
├── controller/
├── dto/
├── model/
├── repository/
├── service/
└── util/
```

Os Controllers recebem as requisições HTTP e chamam apenas os Services. As regras de negócio ficam nos Services.

### Regras de negócio presentes

- Username e e-mail do usuário não podem ser duplicados.
- A senha é armazenada com hash e está com `@JsonIgnore`, portanto não aparece nas respostas JSON.
- Ao criar uma seção, uma planta é criada para representar o progresso daquela seção.
- Ao concluir ou desmarcar tarefas, o progresso e o estágio da planta são recalculados.

## CRUDs exigidos

### Usuario

```text
GET    /api/usuarios
GET    /api/usuarios/{id}
POST   /api/usuarios
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}
```

### Permissao

```text
GET    /api/permissoes
GET    /api/permissoes/{id}
POST   /api/permissoes
PUT    /api/permissoes/{id}
DELETE /api/permissoes/{id}
```

### Secao — entidade própria

```text
GET    /api/secoes
GET    /api/secoes/{id}
POST   /api/secoes
PUT    /api/secoes/{id}
DELETE /api/secoes/{id}
```

Também permanecem as funcionalidades previstas na documentação do My Garden para tarefas e plantas.

## Organização do React

```text
src/main/frontend/src/
├── components/
│   ├── usuario/
│   │   ├── UsuarioForm.tsx
│   │   ├── UsuarioItem.tsx
│   │   └── UsuarioList.tsx
│   ├── permissao/
│   │   ├── PermissaoForm.tsx
│   │   ├── PermissaoItem.tsx
│   │   └── PermissaoList.tsx
│   └── secao/
│       ├── SecaoForm.tsx
│       ├── SecaoItem.tsx
│       └── SecaoList.tsx
├── pages/
│   ├── UsuariosPage.tsx
│   ├── PermissoesPage.tsx
│   ├── SecoesPage.tsx
│   └── ...
├── services/
│   └── api.ts
├── types/
├── App.tsx
└── main.tsx
```

Os formulários são controlados com `useState` e usam `useEffect` para carregar os dados quando um registro é editado. Os componentes `Item` recebem os dados por **props**. As páginas concentram a lógica de carregar, cadastrar, editar, excluir e recarregar as listas.

O `App.tsx` apenas renderiza a página principal do sistema (`MyGardenPage`).

## Axios e CORS

O Axios está centralizado em:

```text
src/main/frontend/src/services/api.ts
```

Base URL:

```text
http://localhost:8080/api
```

Os Controllers possuem:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

## Banco H2

Configuração em `src/main/resources/application.properties`:

```text
JDBC URL: jdbc:h2:file:./data/mygarden;AUTO_SERVER=TRUE
User Name: sa
Password: vazio
```

Console:

```text
http://localhost:8080/h2-console
```

## Como executar

### 1. Back-end

Na pasta raiz do projeto:

```powershell
.\mvnw.cmd spring-boot:run
```

Aguarde aparecer:

```text
Started EduardaMygardenFullstackApplication
```

### 2. Front-end

Abra outro terminal:

```powershell
cd .\src\main\frontend
npm install
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Ordem para testar o CRUD completo

1. Cadastre uma Permissão.
2. Edite e exclua uma Permissão de teste.
3. Cadastre um Usuário.
4. Edite e exclua um Usuário de teste.
5. Cadastre um Usuário que será mantido.
6. Crie uma Seção para esse usuário.
7. Edite e exclua uma Seção de teste.
8. Crie uma seção que será mantida.
9. Cadastre tarefas e marque-as como concluídas para visualizar o progresso da planta.

## GitHub

O repositório Git do projeto original foi preservado. Para o item do checklist referente à entrega, confira `git status`, faça o commit final, envie com `git push` e compartilhe o link do repositório com o professor. O requisito de **commits regulares** depende do histórico feito durante o desenvolvimento e da entrega no GitHub.
