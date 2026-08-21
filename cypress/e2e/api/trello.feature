# language: pt
@api @trello @smoke @critical
Funcionalidade: Consulta de recurso na API do Trello
  Como QA
  Quero validar a resposta de um servico HTTP
  Para assegurar status code, contrato e conteudo esperado da resposta

  Cenario: Validar status code, schema e campo name da estrutura list
    Dado que possuo o endpoint da API do Trello
    Quando envio uma requisicao GET para consultar o recurso
    Entao o status code da resposta deve ser 200
    E a resposta deve respeitar o schema esperado da action do Trello
    E devo exibir o conteudo do campo name da estrutura list
    E o valor do campo name da estrutura list deve ser "Professional"
