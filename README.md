# PEQUENO PASSO | Natal Premium 2026

Loja de Natal desenvolvida em React 19, TanStack Start e Tailwind CSS v4.

## O que está implementado

- Identidade **PEQUENO PASSO**, página inicial com campanha de Natal premium, navegação responsiva e vitrine editorial.
- Coleção com **35 novas propostas em rascunho**, mais três itens que já existiam no código, preservados como rascunhos para verificação de preços e fotos.
- Caixa Mágica do Papai Noel e Fantasia Clássica em páginas de detalhes distintas; luzes organizadas em Pisca-Piscas, Cortinas/Cascatas e Fitas LED.
- Busca e filtros por categoria, links funcionais para os detalhes e recomendações da mesma coleção.
- Imagem SVG **conceitual** da Caixa Mágica. A composição física do kit continua pendente.
- Formulário de CEP preparado para orçamentos reais, sem inventar estimativas.
- Compra protegida: itens sem status publicado, preço real e URL de checkout HTTPS nunca exibem botão de pagamento.

## Como ativar cada produto

Edite `src/data/products.ts`. Cada item precisa ter, após conferência junto ao fornecedor:

1. `name`, `description`, `image` oficial correspondente ao SKU e `details` factuais.
2. `price` confirmado e disponibilidade sincronizada com o fornecedor (o catálogo estático **não controla estoque**).
3. `checkoutUrl` HTTPS **criado por você** no sistema de pagamento escolhido.
4. Altere `status: "rascunho"` para `status: "publicado"` somente após concluir as verificações. Produtos de exemplo permanecem em rascunho para não comunicar disponibilidade falsa.

**Atenção:** a verificação `isPurchasable` oculta CTAs no frontend; não substitui a validação de preços, estoque e pedidos no backend do checkout.

## Frete e garantia: pendências de integração

A faixa de frete grátis está explicitamente marcada como **benefício em configuração**. Ainda não se aplica desconto no checkout porque este repositório não possui backend de pedidos, identidade de compradores ou integração logística. Isso deve ser resolvido na plataforma real de checkout, que será fornecida pelo lojista.

A interface do CEP aceita a variável opcional `VITE_SHIPPING_QUOTE_ENDPOINT` (URL de uma API sua). Ela envia `POST` JSON com `{"cep":"12345678"}`. A API deve retornar status 200 e:

```json
{
  "cep": "12345678",
  "carrier": "Nome confirmado da transportadora",
  "price": 19.90,
  "estimatedDays": 8,
  "guaranteedUnderSevenDays": false,
  "firstPurchaseFreeApplied": false
}
```

Este contrato é **apenas para exibir uma cotação**, não para confirmar nem cobrar frete. A autoridade de desconto deve estar no servidor de checkout, nunca no JavaScript ou no armazenamento local. Para frete grátis na primeira compra, esse servidor precisa autenticar o comprador, consultar pedidos confirmados/estornados conforme as regras comerciais, reservar/aplicar o benefício de modo atômico e impedir reutilização mesmo com cliques concorrentes. A regra deve especificar limites por CPF/e-mail/conta e tratamento de cancelamentos, respeitando proteção de dados.

**Garantia de menos de 7 dias:** permanece desativada até existir cobertura verificável por CEP, definição de dias corridos e horário de corte, prazo de postagem, condições de exceção, reembolso e fluxo operacional real. A API deve retornar `guaranteedUnderSevenDays: true` **somente** para pedidos elegíveis a essa política, com prazo real inferior a sete dias. Não anunciar uma garantia por simples estimativa da transportadora.

**Reembolso:** configurar o processo real no provedor de pagamento e os eventos de pedido/entrega com atendimento e rastreabilidade. O frontend sozinho não consegue processar reembolsos de forma segura.

## Publicação e testes

```bash
bun install --frozen-lockfile
bun run test
bun run build
```

A sincronização com Lovable ocorre quando as alterações alcançam a branch `main`, conforme configuração do projeto. Nunca enviar chaves privadas para o código do navegador.

## Confirmações ainda necessárias

- Fornecedor, SKUs, estoque, dimensões, preços reais, imagens oficiais e variações de todos os produtos.
- Conteúdo exato da Caixa Mágica e acessórios efetivamente inclusos na fantasia.
- URLs de checkout de cada item e plataforma de pagamentos/gestão de pedidos.
- Transportadora, CEPs atendidos, prazos reais, regras de frete grátis e política de reembolso.
- Dados de contato e políticas comerciais/legais da loja.

**Importante:** propostas catalogadas em rascunho não são ofertas de produtos disponíveis para compra.
