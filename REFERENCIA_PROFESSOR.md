# Referência técnica usada na N2

A implementação de autenticação e autorização foi alinhada ao projeto `braully-web2-fullstack` fornecido pelo professor.

Padrões reaproveitados:
- `Spring Security` com `SessionCreationPolicy.STATELESS`;
- `BCryptPasswordEncoder`;
- `jjwt 0.12.6`;
- classes `JwtFilter`, `JwtUtil` e `SecurityConfig`;
- endpoint de login em `/api/login`;
- interceptor Axios com `Bearer Token`;
- armazenamento da sessão no `localStorage`;
- menu/rotas administrativas condicionadas à permissão `ADMIN`.

O tema, as entidades próprias e as regras de negócio continuam sendo do My Garden.
