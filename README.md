# 🌷 My Garden

O **My Garden** é uma aplicação web desenvolvida para ajudar na organização da rotina de forma simples, visual e personalizada.

A proposta do sistema é permitir que cada usuário organize suas atividades em **seções**, cadastre e acompanhe **tarefas**, gerencie **hábitos** e visualize o progresso de forma integrada ao conceito de crescimento de plantas.

Cada usuário possui sua própria conta e seus próprios dados, garantindo que suas seções, tarefas, hábitos e registros fiquem separados dos dados de outros usuários.

O sistema também possui controle de acesso por permissões, diferenciando usuários comuns de administradores.

## ✨ Principais funcionalidades

- Cadastro e login de usuários;
- Autenticação com Spring Security e JWT;
- Controle de permissões entre `USER` e `ADMIN`;
- Organização de tarefas por seções;
- Cadastro, edição e exclusão de tarefas;
- Gerenciamento de plantas;
- Cadastro e acompanhamento de hábitos;
- Registro da realização de hábitos;
- Upload de imagens;
- Gerenciamento de usuários e permissões pela área administrativa;
- Proteção de rotas e isolamento dos dados de cada usuário.

## 🛠️ Tecnologias utilizadas

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT
- Bean Validation
- H2 Database

### Frontend
- React
- TypeScript
- Vite
- React Router
- Axios
- HTML
- CSS

## 🌿 Estrutura do sistema

De forma geral, o My Garden funciona com a seguinte organização:

```text
Usuário
   │
   ├── Seções
   │     └── Tarefas
   │
   ├── Plantas
   │
   └── Hábitos
          └── Registros de hábitos
```

O projeto utiliza uma arquitetura em camadas no backend, separando responsabilidades entre `Controller`, `Service`, `Repository` e `Model`.

No frontend, as páginas e componentes são organizados utilizando React e React Router, enquanto a comunicação com a API é realizada com Axios.

## 🎓 Sobre o projeto

O **My Garden** foi desenvolvido como projeto acadêmico da disciplina de **Programação Web II**, do curso de **Sistemas de Informação da Universidade Estadual de Goiás — UEG**.

O projeto aplica conceitos de desenvolvimento full stack, APIs REST, persistência de dados, relacionamentos com JPA, autenticação, autorização, CRUD e integração entre frontend e backend.

## 👩‍💻 Desenvolvido por

**Eduarda Protazio**  
Sistemas de Informação — UEG

<p align="center">
  🌷 <strong>My Garden</strong><br>
  <em>Cultive sua rotina.</em>
</p>
