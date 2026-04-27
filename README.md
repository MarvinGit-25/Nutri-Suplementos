# Nutri Suplementos

Aplicacao de e-commerce com Next.js, Prisma e Mercado Pago.

## Requisitos

- Node.js 20+
- Banco PostgreSQL acessivel
- Conta Mercado Pago (token + webhook secret)
- Conta Cloudinary (upload de imagens)

## Variaveis de ambiente

Crie um `.env` com os campos abaixo:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="uma-chave-longa-e-aleatoria"

MERCADOPAGO_ACCESS_TOKEN="APP_USR-..."
MERCADOPAGO_WEBHOOK_SECRET="chave-secreta-do-webhook"

CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

ADMIN_SETUP_SECRET="segredo-para-bootstrap-do-admin"
ADMIN_BOOTSTRAP_ENABLED="false"
SITE_URL="https://seu-dominio.com"
```

## Instalacao e execucao

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

## Scripts uteis

- `npm run dev`: ambiente local
- `npm run build`: build de producao
- `npm run start`: sobe app compilada
- `npm run lint`: valida qualidade de codigo

## Checklist de liberacao (go-live)

1. Garantir `MERCADOPAGO_WEBHOOK_SECRET` em producao.
2. Configurar webhook do Mercado Pago apontando para `/api/pagamento/webhook`.
3. Rodar `npx prisma migrate deploy` no ambiente de deploy.
4. Validar upload de imagem (Cloudinary).
5. Validar login admin e `ADMIN_SETUP_SECRET`.
6. Confirmar `SITE_URL` e `NEXTAUTH_URL` corretos.
7. Manter `ADMIN_BOOTSTRAP_ENABLED=false` em producao apos criar o admin inicial.

## Smoke test recomendado

1. Acessar loja, adicionar produtos e concluir checkout.
2. Verificar criacao do pedido no banco com status `PENDING`.
3. Simular/aprovar pagamento no Mercado Pago.
4. Confirmar webhook atualiza pedido para `PAID`.
5. Confirmar estoque reduz apenas uma vez (idempotencia).
6. Validar rotas publicas: `/rastreio`, `/termos`, `/privacidade`.

## Operacao e suporte

- Guia operacional admin: `docs/operacao-admin.md`

## Seguranca de autenticacao

- O bootstrap de admin (`/api/auth/register`) possui limite de tentativas por IP.
- O login por credenciais (`/api/auth/callback/credentials`) possui rate limit por IP para reduzir brute force.
