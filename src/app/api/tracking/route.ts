import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  // Simple mock: if code contains 'BR' return success, else not found
  const isSuccess = code?.toUpperCase().includes('BR');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  if (isSuccess) {
    // mock tracking timeline
    const data = {
      code: code.toUpperCase(),
      status: 'success',
      timeline: [
        { label: 'Objeto Postado', time: 'Sexta às 09:10', description: 'O remetente entregou seu pacote aos Correios.' },
        { label: 'Em Trânsito', time: 'Ontem às 14:15', description: 'De: Centro de Distribuição (SP) Para: Unidade Local' },
        { label: 'Saiu para Entrega ao Destinatário', time: 'Hoje às 08:32', description: 'Sua encomenda está no caminhão da última milha.' }
      ]
    };
    return NextResponse.json(data);
  }

  return NextResponse.json({ code: code.toUpperCase(), status: 'not_found' }, { status: 404 });
}
