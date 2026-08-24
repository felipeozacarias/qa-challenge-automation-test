# language: pt
@web @login
Funcionalidade: Login de usuario no Automation Exercise
  Como usuario
  Quero validar comportamentos positivos e negativos de autenticacao
  Para assegurar acesso controlado ao e-commerce

  @smoke @critical
  Cenario: Realizar login com credenciais validas
    Dado que possuo um usuario de teste valido no Automation Exercise
    E acesso a pagina de login do Automation Exercise
    Quando informo as credenciais validas
    E aciono a opcao de login
    Entao devo visualizar o usuario autenticado no sistema

  @negative
  Cenario: Impedir login com credenciais invalidas
    Dado que acesso a pagina de login do Automation Exercise
    Quando informo credenciais invalidas
    E aciono a opcao de login
    Entao devo visualizar uma mensagem de credenciais invalidas
    E devo permanecer nao autenticado
