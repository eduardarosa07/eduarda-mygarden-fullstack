# Checklist N1 — conferência do projeto

## Projeto e ambiente

- [x] Back-end Spring Boot com Maven, Java 21 e pacote `br.ueg.trindade`.
- [x] Dependências Web, Data JPA, H2, PostgreSQL, DevTools e Security.
- [x] Front-end React com Vite + TypeScript em `src/main/frontend`.
- [x] Script `npm run dev` configurado.
- [ ] Fazer o commit/push final e compartilhar o link do GitHub com o professor.

## Back-end

- [x] `Usuario` com nome, username, senha e email.
- [x] `Permissao`.
- [x] Entidade própria: `Secao`.
- [x] Entidades com `@Entity`, `@Id` e `@GeneratedValue`.
- [x] Senha do usuário oculta com `@JsonIgnore`.
- [x] H2 configurado em `application.properties`.
- [x] Um `JpaRepository` para cada entidade.
- [x] Pacotes `controller`, `service`, `repository` e `model`.
- [x] Controllers REST em `/api` com GET, POST, PUT e DELETE para Usuario, Permissao e Secao.
- [x] Controllers acessam Service, não Repository diretamente.
- [x] Regras de negócio implementadas no Service.

## Front-end

- [x] Axios em `services/api.ts` com `baseURL`.
- [x] `@CrossOrigin` configurado no back-end.
- [x] Componentes de listagem, item por props e formulário controlado.
- [x] Formulários usando `useState` e `useEffect`.
- [x] `UsuariosPage`, `PermissoesPage` e `SecoesPage`.
- [x] `App.tsx` apenas renderiza a página principal.
- [x] Botões Editar e Excluir.
- [x] Lista recarregada após criar, editar e excluir.
- [x] CRUD completo de Usuario, Permissao e Secao no navegador.
- [x] Fluxo React -> API -> H2.
- [x] Entidade própria (`Secao`) com CRUD completo em camadas.
