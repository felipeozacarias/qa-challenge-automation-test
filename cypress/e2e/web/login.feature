# language: pt
@web @login
Funcionalidade: Login de usuario no Automation Exercise
  Como usuario cadastrado
  Quero acessar a aplicacao com credenciais validas
  Para realizar compras no e-commerce

  Cenario: Realizar login com credenciais validas
    Dado que possuo um usuario de teste valido no Automation Exercise
    E acesso a pagina de login do Automation Exercise
    Quando informo as credenciais validas
    E aciono a opcao de login
    Entao devo visualizar o usuario autenticado no sistema
