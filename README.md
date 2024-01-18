# Eduardo Dembicki

API Rest usada para criar urls encurtadas.

# servidores

|Ambiente | Url  | Banco |
|---|---|---|
|PROD| localhost:3000 | sqlite |

# tecnologias

* NestJS
* Node.js  
* SQLite3
* Swagger
* JWT / Passport


## Inicialização Projeto

1. Clonar o projeto
`git clone https://github.com/edembicki/encurtador_url.git`

2. Instalar as dependências
`yarn`

3. Gerar build de produção
`yarn build`

4. Executar em modo de produção
`yarn start:prod`


## Utilização Projeto

# swagger

> http://localhost:3000/api

Através da documentação OpenAPI do Swagger voce pode acessar todos os endpoints.

### `/api/v1/auth/login`
Endpoint responsável por gerar autenticação Bearer através de username e password:

```
Utilizar: 
{
  "username": "open",
  "password": "finance"
}
```

### `/api/v1/urls`
Este endpoint mostra a lista de URLs disponíveis no banco de dados.
Acessível somente para usuários autenticados.

### `/api/v1/urls/{id}`
Este endpoint remove uma URL da lista disponíveis no banco de dados.
Acessível somente para usuários autenticados.

### `/api/v1/shortner-uris`
Este endpoint gera uma URL encurtada á partir da URL inserida.
Acessível a qualquer usuário.

### `/api/v1/{shortUri}`
Este endpoint retorna uma URL original á partir da URL encurtada.
Acessível a qualquer usuário.

## Testes
Visualização dos testes
`yarn test --coverage`
