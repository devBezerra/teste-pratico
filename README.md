# Documentação de ambientação da aplicação:
## Api e Banco:
-  Após estar na pasta da api rodar os seguintes comandos:
```
cp .env.example .env
docker compose -up --build
```

## FRONT:
- Usando node 22+
```
npm install
npm start
```
# Informações da aplicação
- Com o intuito de tornar mais completo o teste, decidi por criar também um modulo de lojas para criação, edição de remoção das mesmas para uso no módulo de produtos;
- Todos os items armazenados no banco possuem uma validação de descrição única;
- Um produto não pode ser vinculado duas vezes à mesma loja;
- O valor do preço do produto vendido na loja não pode ser maior que o valor de custo do mesmo.
