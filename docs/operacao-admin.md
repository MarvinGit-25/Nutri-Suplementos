# Operacao Admin e Suporte

Guia rapido para rotina de operacao da loja XNUTRI no dia a dia.

## Rotina diaria (15-30 min)

1. Acessar `Admin > Pedidos` e validar novos pedidos.
2. Verificar pedidos em `PENDING` com mais de 24h e acionar cliente quando necessario.
3. Confirmar se pedidos `PAID` estao com estoque consistente.
4. Revisar mensagens de suporte (contato/WhatsApp/e-mail).
5. Registrar incidentes em uma planilha interna (data, impacto, resolucao).

## Rotina semanal

1. Revisar produtos sem estoque e atualizar reposicao.
2. Revisar titulos, imagens e precos dos produtos mais vendidos.
3. Validar paginas institucionais (`/termos`, `/privacidade`, `/trocas`, `/contato`).
4. Testar uma compra de ponta a ponta em ambiente de homologacao.

## Protocolo de suporte

### 1) Pagamento aprovado e pedido nao atualizou
- Verificar logs do endpoint `/api/pagamento/webhook`.
- Validar status no painel Mercado Pago.
- Confirmar se pedido esta com `processed = true`.

### 2) Divergencia de estoque
- Conferir itens do pedido no admin.
- Confirmar se houve reenvio de webhook.
- Ajustar estoque manualmente no admin quando necessario e registrar motivo.

### 3) Produto com imagem quebrada
- Editar produto no admin e reenviar imagem.
- Confirmar URL da imagem no Cloudinary.

## Backup e continuidade

## Banco de dados
- Ativar backup automatico diario no provedor do banco.
- Definir retençao minima de 7 a 30 dias.
- Realizar teste de restauracao pelo menos 1 vez por mes.

## Aplicacao e operacao
- Guardar credenciais em cofre seguro (nao em codigo).
- Manter pelo menos 2 pessoas com acesso administrativo de emergencia.
- Documentar contatos tecnicos responsaveis (dev/infra/atendimento).

## Checklist rapido de release

- [ ] `npx prisma migrate deploy` executado no ambiente alvo
- [ ] Build e health-check da aplicacao concluido
- [ ] Fluxo de compra validado
- [ ] Webhook de pagamento testado
- [ ] Rotas institucionais revisadas
