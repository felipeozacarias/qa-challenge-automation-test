# language: pt
@web @ecommerce
Funcionalidade: Fluxo de produtos no Automation Exercise

  Cenario: Buscar produto existente
    Dado que acesso a pagina de produtos do Automation Exercise
    Quando realizo a busca pelo produto "dress"
    Entao devo visualizar produtos relacionados a busca "dress"

  Cenario: Adicionar produto ao carrinho
    Dado que acesso a pagina de produtos do Automation Exercise
    Quando adiciono o primeiro produto disponivel ao carrinho
    Entao devo visualizar a confirmacao de produto adicionado ao carrinho

  Cenario: Validar item na tela de checkout
    Dado que estou autenticado com um usuario de teste valido no Automation Exercise
    E que acesso a pagina de produtos do Automation Exercise
    Quando adiciono o primeiro produto disponivel ao carrinho
    E acesso o carrinho de compras
    E prossigo para o checkout
    Entao devo visualizar o produto incluido na tela de checkout
