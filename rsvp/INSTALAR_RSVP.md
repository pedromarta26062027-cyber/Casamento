# Ativar as confirmações de presença

O site continua alojado no GitHub Pages. A folha Google Sheets é privada, e só o serviço de gravação recebe as respostas. Não existe uma operação que permita ler a lista através do site.

## Publicar a ligação na tua conta Google

1. Abrir https://docs.google.com/spreadsheets/d/1tBRx5AE-YUx45vUgRXRA6agPOi1IvIx6vrD2IBRmU_o/edit
2. Escolher **Extensões → Apps Script**.
3. Substituir o conteúdo de `Código.gs` pelo ficheiro [`Code.gs`](Code.gs) desta pasta e guardar.
4. Escolher **Implementar → Nova implementação → Aplicação Web**.
5. Em **Executar como**, escolher **Eu**. Em **Quem tem acesso**, escolher **Qualquer pessoa**, para os convidados não precisarem de iniciar sessão.
6. Autorizar a execução do teu script na tua conta Google e implementar. A folha não deve ser partilhada publicamente.
7. Copiar o endereço da aplicação Web terminado em `/exec` e enviá-lo ao ChatGPT. Esse endereço será colocado em `docs/rsvp-config.js`.

Depois de ligar, testar uma resposta fictícia e uma correção com o mesmo contacto, verificar as linhas em **Respostas** e os totais em **Resumo**, e apagar a linha de teste antes de enviar aos convidados.

## Comportamento

- Uma linha por email ou telemóvel normalizado. O mesmo contacto atualiza a linha, sem criar duplicados. Esta regra é por contacto, não autentica a identidade de quem responde.
- Se a pessoa não vai, os campos acompanhantes, crianças, alimentação, boleias e mensagem são ignorados; outros comentários são mantidos.
- O total inclui quem responde, acompanhantes e crianças.
- O serviço valida os dados e recusa respostas depois de 30/04/2027 às 23:59, hora de Lisboa.
- O site confirma apenas após receber um recibo de gravação do Google. Uma falha ou ausência de recibo mantém os dados no formulário e não mostra sucesso.
- Texto introduzido por convidados é protegido contra execução como fórmula na folha.

## Verificação

Testes locais cobrem gravação, correção sem duplicação, normalização de contactos, validação, recusa, comentários, falha de gravação e recibos com origem e nonce verificados. O teste real do fluxo Google/GitHub só pode ser concluído depois da publicação da aplicação Web.
