# tfDW_EventIFC        Igor Petry

 Sistema de Gerenciamento de Eventos Acadêmicos


## Descrição

Este projeto é um **Sistema de Gerenciamento de Eventos Acadêmicos**, desenvolvido para gerenciar eventos realizados no IFC Videira. O sistema permite que os alunos visualizem eventos em andamento no campus, se inscrevam neles, avaliem e sugiram novos eventos. Além disso, os administradores têm a capacidade de cadastrar novos eventos.

Diagrama de classes --> ![image](https://github.com/user-attachments/assets/445abb5c-66cf-4323-9fbd-bcad61b40304)


### Funcionalidades Principais

- **Login de Usuário**: Os alunos e administradores podem acessar o sistema utilizando suas credenciais.
- **Visualização de Eventos**: Os alunos podem visualizar os eventos disponíveis, se inscrever neles e avaliá-los.
- **Cadastro de Usuário**: Novos usuários podem ser cadastrados, com definição de papéis de `student` (aluno) ou `admin` (administrador).
- **Feedback de Eventos**: Estudantes podem avaliar os eventos e deixar feedback.
- **Sugestão de Novos Eventos**: Estudantes podem sugerir novos eventos para a instituição.

## Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Banco de Dados**: SQLite
- **Frontend**: HTML, CSS (com a ajuda do Bootstrap para responsividade), e JavaScript
- **Autenticação**: Autenticação simples utilizando email e senha (não criptografadas para este projeto)
- **Gerenciamento de Dependências**: NPM (Node Package Manager)
- **Servidor**: Localmente rodando com o Express na porta 8080

## Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** instalados em sua máquina, foi usado o comando no terminal para realizar as instalações dos patchs e extensões: -> npm install express sequelize sqlite3 body-parser bcrypt jsonwebtoken cors dotenv

## Melhorias Futuras
Dar um token de inscrição unico para cada e dependendo do local, dar um maximo de inscrições.
Criptografar a senha, foi tentado mas não consegui deixar funcionando a tempo com a criptografia.
Sistema de Notificações: Implementar notificações em tempo real para avisar os usuários sobre novos eventos ou atualizações.
Suporte a múltiplos papéis de usuário: Ampliar a gestão de permissões para incluir papéis como organizadores de eventos, moderadores, etc.
Interface mais sofisticada: Melhorar a interface com componentes dinâmicos e animações para uma experiência de usuário mais fluída.
Autenticação com JWT: Substituir a autenticação simples por tokens JWT para uma abordagem mais segura e escalável.
