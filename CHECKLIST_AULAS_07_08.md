# Checklist — Aulas 07 e 08

## Aula 07 — Relacionamentos com JPA

- [x] `Usuario` ↔ `Permissao` com `@ManyToMany`
- [x] `@JoinTable(name = "usuario_permissao")`
- [x] Lado inverso em `Permissao` com `mappedBy = "permissoes"`
- [x] `@JsonManagedReference` e `@JsonBackReference`
- [x] `GET /api/usuarios/{id}/permissoes`
- [x] `PUT /api/usuarios/{id}/permissoes`
- [x] `types/Permissao.ts`
- [x] `types/Usuario.ts` com `permissoes?`
- [x] `UsuarioPermissoesPage.tsx` com usuário + checkboxes + salvar
- [x] Tabela de junção `usuario_permissao` criada pelo JPA/Hibernate

## Aula 08 — React Router

- [x] `react-router-dom` em `package.json`
- [x] `BrowserRouter` em `main.tsx`
- [x] `components/Layout.tsx` com `NavLink` e `Outlet`
- [x] `pages/Home.tsx`
- [x] `Routes` e `Route` em `App.tsx`
- [x] `/usuarios`
- [x] `/usuarios/:id` com `useParams`
- [x] `/atribuir-permissoes`
- [x] rota `*` (404)
- [x] link da lista de usuários para o detalhe
- [x] `useNavigate` para voltar e após salvar usuário
- [x] `/permissoes` no menu
- [x] `/permissoes/:id` com `useParams`

As telas próprias do My Garden (`/secoes`, `/tarefas`, `/plantas`) continuam integradas ao mesmo `Layout` e ao React Router.
