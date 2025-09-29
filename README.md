# Desafio Front-End UX Software - Marketplace

![Licença](https://img.shields.io/badge/licença-MIT-blue.svg)

Aplicação web de um marketplace online desenvolvida como parte do processo seletivo para a vaga de Desenvolvedor Front-End na UX Software.

---

## 🚀 Demonstração

**🔗 Link para o Deploy:** *[Inserir o link da Vercel aqui quando fizermos o deploy]*

---

## 📋 Funcionalidades Implementadas

* **Autenticação de Usuário:**
    * Cadastro de novos usuários com validação de senha e máscara de campos (CPF e Telefone).
    * Login com tratamento de credenciais inválidas.
    * Fluxo de navegação protegido: a página de produtos só é acessível para usuários logados.
* **Gerenciamento de Produtos (CRUD):**
    * Listagem de produtos da API com paginação.
    * Criação de novos produtos por administradores, incluindo upload de imagem. [cite: 33]
    * Edição dos dados de produtos existentes. [cite: 36]
    * Deleção de produtos com diálogo de confirmação. [cite: 37]
* **Carrinho de Compras:**
    * Adicionar produtos ao carrinho. [cite: 39]
    * Visualização do carrinho em um painel lateral com lista de itens e valor total. [cite: 40]
    * Aumentar, diminuir e remover itens do carrinho.
* **Experiência do Usuário (UX):**
    * Layout totalmente responsivo, adaptável a telas de celulares, tablets e desktops.
    * Notificações "toast" para feedback de sucesso e erro. [cite: 20]
    * Ícones para visualização de senha e interações no carrinho.
    * Indicadores de "loading" durante o carregamento de dados.

---

## 🛠️ Tecnologias Utilizadas

* **Next.js** [cite: 12]
* **React**
* **TypeScript** [cite: 12]
* **Tailwind CSS** para estilização. [cite: 13]
* **Axios** para comunicação com a API.
* **React Toastify** para notificações.
* **@react-input/mask** para máscaras de input.

---

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto no seu ambiente de desenvolvimento.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* O back-end [marketplace-api](https://github.com/ux-software/marketplace-api) deve estar configurado e rodando localmente na porta `3001`.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/desafio-ux-software-frontend.git](https://github.com/seu-usuario/desafio-ux-software-frontend.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd desafio-ux-software-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente:**
    * Este projeto não requer variáveis de ambiente (`.env`) no lado do cliente, pois a URL da API (`http://localhost:3001`) está configurada diretamente no serviço do Axios para fins de desenvolvimento. [cite: 47]

5.  **Execute a aplicação:**
    ```bash
    npm run dev
    ```

6.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 📬 Contato

* **Nome:** Pedro Henrique do Nascimento Silva
* **LinkedIn:** https://www.linkedin.com/in/pedro-silva-dev-2002-js/
* **GitHub:** https://github.com/pedrohenrique-23