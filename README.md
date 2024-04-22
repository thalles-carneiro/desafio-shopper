# Desafio Técnico - [Shooper](https://landing.shopper.com.br/)

## Índice
- [Desafio Técnico - Shooper](#desafio-técnico---shooper)
  - [Índice](#índice)
  - [Contexto](#contexto)
  - [Tecnologias utilizadas](#tecnologias-utilizadas)
    - [Front-End](#front-end)
    - [Back-End](#back-end)
    - [Banco de Dados](#banco-de-dados)
    - [Testes](#testes)
    - [Boas práticas](#boas-práticas)
  - [Setup de ambiente](#setup-de-ambiente)
    - [Requisitos para rodar o projeto](#requisitos-para-rodar-o-projeto)
    - [Executando o projeto localmente](#executando-o-projeto-localmente)
  - [Testes e Linters](#testes-e-linters)
    - [Executando Testes](#executando-testes)
    - [Executando ESLint e Stylelint](#executando-eslint-e-stylelint)
  - [Estrutura do projeto](#estrutura-do-projeto)

## Contexto

Dada a necessidade em empresas de e-commerce de uma ferramenta uma ferramenta para atualização massiva de preços que mantenha a integridade das regras de negócio.

Surge então, a ideia de utilizar um arquivo CSV com os ajustes de preços e uma aplicação para validação de preços mínimos e reajustes dentro de limites específicos, estabelecendo a necessidade de atualização de preços em pacotes de produtos, garantindo que os reajustes sejam refletidos nos componentes do pacote de forma coerente.

A ferramenta desenvolvida visa facilitar a atualização de preços, mantendo a competitividade da loja e garantindo a precisão dos dados, evitando erros que possam impactar negativamente o negócio.

## Tecnologias utilizadas

### Front-End

- **[Styled Components](https://styled-components.com/):** Biblioteca para estilização de componentes em React.
- **[React Papaparse](https://react-papaparse.js.org/):** Utilizado para análise de arquivos CSV no frontend.

### Back-End

- **[Express](https://expressjs.com/pt-br/):** Framework web rápido, flexível e minimalista para Node.js.
- **[dotenv](https://www.npmjs.com/package/dotenv):** Carrega variáveis de ambiente de um arquivo `.env` para process.env.
- **[restify-errors](https://www.npmjs.com/package/restify-errors):** Fornece uma maneira fácil de criar erros HTTP no Express.
- **[express-async-errors](https://www.npmjs.com/package/express-async-errors):** Middleware para tratamento de erros assíncronos no Express.

### Banco de Dados

- **[MySQL](https://www.mysql.com/):** Banco de dados relacional utilizado para armazenamento de dados.
- **[Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma):** ORM (Object-Relational Mapping) moderno e intuitivo para Node.js e TypeScript.

### Testes

- **[Jest](https://jestjs.io/pt-BR/):** Framework de teste de JavaScript com foco na simplicidade.
- **[Supertest](https://www.npmjs.com/package/supertest):** Biblioteca de teste de HTTP para Node.js, usado para testar APIs.
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/):** Utilizado para testar componentes React de forma mais realista.

### Boas práticas

- **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):** Convenção para mensagens de commit que facilita a geração automática de changelogs.
- **[ESLint](https://eslint.org/):** Ferramenta de análise de código estática para identificar e relatar padrões problemáticos no código JavaScript.
- **[Stylelint](https://stylelint.io/):** Linter para CSS/SCSS/Less para garantir consistência e evitar erros no estilo.

## Setup de ambiente

### Requisitos para rodar o projeto

- **Node.js:** Versão mínima `v18.19.0`. [Instalação do Node.js](https://nodejs.org/en).
- **Docker:** [Instalação do Docker](https://docs.docker.com/engine/install/).
- **Docker Compose:** [Instalação do Docker Compose](https://docs.docker.com/compose/install/).

### Executando o projeto localmente

1. **Clone o repositório:**
  ```bash
  git@github.com:thalles-carneiro/desafio-shopper.git
  ```

2. **Navegue até o repositório do projeto:**
  ```bash
  cd desafio-shopper
  ```

3. **Instale as dependências:**
  ```bash
  npm install
  ```

4. **Renomeie o arquivo `backend/.env.example` para `backend/.env` apenas:**
  ```bash
  mv backend/.env.example backend/.env
  ```

  *⚠️ Lembre-se de alterar as informações no arquivo .env para as configurações na sua máquina.*

  - Onde está `<NOME DE USUÁRIO DO BANCO>` substitua pelo nome de usuário do banco de dados, geralmente será o **`root`**.

  - Onde está `<SENHA DE ACESSO DO BANCO>` substitua dependendo do comando que irá executar para subir a aplicação, caso utilize `npm run start` deve usar a senha que está configurada para o uso do MySQL, já ao rodar o comando `npm run compose:up` pode usar algo padrão como **`my-secret-pw`**.

  - Onde está `<HOST DO BANCO DE DADOS>` substitua dependendo do comando que irá executar para subir a aplicação, caso utilize `npm run start` deve usar **`localhost`**, já ao rodar o comando `npm run compose:up` deve usar **`db`**.

5. **Inicie a aplicação usando o Docker:**

  *O Docker deve estar iniciado na máquina para funcionar o comando abaixo:*
  ```bash
  npm run compose:up
  ```

  *⚠️ Caso não tenha instalado o Docker, inicie a aplicação com o comando:*
  ```bash
  npm run start
  ```

6. **Acesse a aplicação:**
  ```bash
    http://localhost:5173
  ```

## Testes e Linters

### Executando Testes

- **Testes no Front-End:**

  - Navegar até a pasta:
  ```bash
  cd frontend
  ```

  - Executar apenas os testes:
  ```bash
  npm run test
  ```

  - Conferir a cobertura dos testes:
  ```bash
  npm run test:coverage
  ```

*⚠️ Para conseguir executar os testes, é necessário que o servidor esteja rodando junto, basta seguir os passos para executar o projeto localmente: `npm run start` ou `npm run compose:up` se tiver o Docker e Docker Compose instalados*

### Executando ESLint e Stylelint

Este projeto possui ESLint e Stylelint configurados já com scripts para executá-los, use os seguintes comandos:

- **Linters no Front-End:**

  - Navegar até a pasta:
  ```bash
  cd frontend
  ```

  - Executar ESLint e Stylelint:
  ```bash
  npm run lint
  npm run lint:styles
  ```

- **Linter no Back-End:**

  - Navegar até a pasta:
  ```bash
  cd backend
  ```

  - Executar ESLint:
  ```bash
  npm run lint
  ```

*⚠️ Para conseguir executar os linters, é necessário que as dependências estejam instaladas, basta seguir os passos para executar o projeto localmente: `npm run start` ou `npm run compose:up` se tiver o Docker e Docker Compose instalados*

## Estrutura do projeto

- **Front-End:**

  ```css
  frontend/
  │
  ├── src/
  │   ├── components/
  │   │   ├── form/
  │   │   │   ├── form.tsx
  │   │   │   └── styles.ts
  │   │   ├── table/
  │   │   │   ├── table.tsx
  │   │   │   └── styles.ts
  │   │   └── ...
  │   │
  │   ├── services/
  │   │   └── api.ts
  │   │
  │   ├── tests/
  │   │   ├── unit/
  │   │   │   ├── Button.test.tsx
  │   │   │   ├── Footer.test.tsx/
  │   │   │   ├── Form.test.tsx/
  │   │   │   └── ...
  │   │   ├── mocks/
  │   │   │   ├── fetch.ts
  │   │   │   ├── csvFileValid.ts
  │   │   │   ├── responseToValidFile.ts
  │   │   │   └── ...

- **Back-End:**
  ```css
  backend/
  │
  ├── src/
  │   ├── controllers/
  │   │   └── products.controller.ts
  │   │
  │   ├── interfaces/
  │   │   ├── product.interface.ts
  │   │   └── ...
  │   │
  │   ├── models/
  │   │   ├── connection.ts
  │   │   └── products.model.ts
  │   │
  │   ├── prisma/
  │   │   ├── migrations/
  │   │   ├── schema.prisma
  │   │   └── ...
  │   │
  │   ├── routes/
  │   │   └── products.routes.ts
  │   │
  │   ├── services/
  │   │   └── products.service.ts
  │   │
  │   └── tests/
  │       ├── mocks/
  │       │   ├── express.ts
  │       │   └── ...
  │       ├── unit/
  │       │   ├── controllers/
  │       │   ├── services/
  │       │   ├── utils/
  │       │   └── ...
  │       └── ...
