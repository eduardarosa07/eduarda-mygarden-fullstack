# Checklist da Avaliação N2 — My Garden

## Base da N1
- [x] Projeto Spring Boot + React mantido como base.
- [x] Usuario, Permissao e entidades do My Garden preservadas.
- [x] React Router, páginas e CRUDs já existentes preservados.

## Back-end — novos modelos
- [x] **Habito** com `@Entity`, `@Id` e `@GeneratedValue`.
- [x] **RegistroHabito** com `@Entity`, `@Id` e `@GeneratedValue`.
- [x] Relacionamento `Habito @OneToMany -> RegistroHabito` e `RegistroHabito @ManyToOne -> Habito`.
- [x] `HabitoRepository` e `RegistroHabitoRepository` com `JpaRepository`.
- [x] Camadas controller → service → repository → model para as duas entidades.
- [x] GET, POST, PUT e DELETE para as duas entidades.
- [x] Regras de negócio no Service: nome de hábito não pode repetir para o mesmo usuário; um hábito só pode ter um registro por data.
- [x] Dados dos novos modelos isolados por usuário logado.

## Autenticação
- [x] Spring Security.
- [x] JWT com biblioteca `jjwt 0.12.6`, seguindo o projeto de referência do professor.
- [x] Login em `/api/login` gera token com username e permissões.
- [x] Cadastro público de usuário em `/api/register`, com senha em BCrypt.
- [x] Rotas da API protegidas por JWT.
- [x] Rotas React protegidas; rotas administrativas exigem perfil `ADMIN`.
- [x] Axios envia `Authorization: Bearer <token>` automaticamente.

## Front-end — novas telas
- [x] `HabitosPage`.
- [x] `RegistrosHabitoPage`.
- [x] Rotas `/habitos` e `/registros-habito`.
- [x] Itens no menu de navegação.
- [x] CRUD completo de Hábito no navegador.
- [x] CRUD completo de Registro de Hábito no navegador.
- [x] Componentes separados de formulário, item e listagem para as duas entidades.
- [x] Formulários controlados com `useState` e `useEffect`.
- [x] Axios centralizado em `services/api.ts`.
- [x] `@CrossOrigin` nos novos controllers e CORS global no Spring Security.
- [x] Listas recarregadas após criar/editar/excluir.

## Extras valorizados
- [x] Bean Validation nos novos modelos de entrada + mensagem amigável no front.
- [x] Upload de imagem do hábito com `MultipartFile` (PNG/JPG/WEBP, até 2 MB).
- [x] Preview da imagem no formulário React.
- [x] Docker para back-end e front-end + `docker-compose.yml`.

## Itens que dependem da entrega da aluna
- [ ] Fazer commits regulares no GitHub durante o desenvolvimento.
- [ ] Demonstrar o sistema no navegador ao professor.
- [ ] Explicar arquitetura, novas entidades, relacionamento e regra de negócio.
