# language: pt
@api @trello
Funcionalidade: Consulta de recurso na API do Trello
  Como QA
  Quero validar respostas positivas e negativas de um servico HTTP
  Para assegurar status code, contrato e tratamento controlado de erros

  @smoke @critical @contract
  Cenario: Validar status code, schema e campo name da estrutura list
    Dado que possuo o endpoint da API do Trello
    Quando envio uma requisicao GET para consultar o recurso
    Entao o status code da resposta deve ser 200
    E a resposta deve respeitar o schema esperado da action do Trello
    E devo exibir o conteudo do campo name da estrutura list
    E o valor do campo name da estrutura list deve ser "Professional"

  @negative @contract
  Cenario: Consultar action com identificador valido mas inexistente
    Dado que possuo um identificador de action com formato valido mas inexistente
    Quando envio uma requisicao GET para consultar o recurso
    Entao o status code da resposta deve ser 404
    E o content type da resposta deve conter "text/plain"
    E o corpo da resposta deve conter a mensagem "The requested resource was not found."

  @negative @contract
  Cenario: Consultar action com identificador malformado
    Dado que possuo um identificador de action malformado
    Quando envio uma requisicao GET para consultar o recurso
    Entao o status code da resposta deve ser 400
    E o content type da resposta deve conter "text/plain"
    E o corpo da resposta deve conter a mensagem "invalid id"
