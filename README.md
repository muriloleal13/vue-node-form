# Vue Node Form

Este projeto demonstra como utilizar Vue 3 + Composition API e um servidor NodeJS que renderiza inicialmente um formulário estático de cadastro de usuários e recebe os dados do registro via uma API.

Pode ser acessado tanto via WebService em: https://vue-node-form.onrender.com/registration como também via clone do repositório.

## Getting Started 🚀

Para esta aplicação foi utilizado apenas Vue 3 + Composition API e Setup Hook, sem uso de frameworks externos como Vue Router, Quasar ou demais.

Também não foram utilizados frameworks para gerenciamento de estado, requisições HTTP ou frameworks de estilo como TailwindCSS.

O objetivo deste projeto é entender e utilizar conceitos básicos do Vue e JavaScript, sem auxílio de frameworks para facilitar o trabalho, e assim entendendo melhor todo o processo de uma aplicação pura.

O projeto foi buildado, gerando um arquivo na pasta dist. Sendo assim, ao rodar o servidor NodeJS e acessar /registration, é feita uma requisicao GET que retorna o formulario em client/dist/index.html e a aplicação Vue é exibida.

### Requirements 📋

_Node.js._

_Vue.js._

### Run Application 🔧

_Clone the repository._

```sh
git clone https://github.com/muriloleal13/vue-node-form.git
```

_Install dependencies._

```sh

npm install

```

## Run Test ⚙️

```sh

npm run build-client

npm start

```

O projeto será executado e estará acessível em `http://localhost:3000`, sendo que, para testes, a parte frontend pode ser acessada em:

```sh

cd ./client/vue-registration

npm run dev

```

## Autor ✒️

- **Murilo Leal** - [muriloleal13](https://github.com/muriloleal13)

---
