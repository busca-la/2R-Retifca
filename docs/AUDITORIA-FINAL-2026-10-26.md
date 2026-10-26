# 2R — auditoria e otimização final

Data: 26/10/2026. Branch local: `codex/auditoria-otimizacao-2r`.
Base auditada: `da69bb1c3e9574919ca492bf1933e9b2ffd3bf63`, correspondente ao `main` consultado no início.

As alterações estão preparadas para revisão, sem push, merge ou deploy. A identidade, composição, cores, fontes, fotografia da hero, galeria e canais comerciais foram preservados.

## Escopo e limite de acesso

A inspeção de código, capturas iniciais e três medições de referência precederam as alterações de implementação. Foram examinados React/Vite, componentes, CSS, mídia, lockfile, testes, CI, metadados e configuração Vercel.

O proxy do ambiente respondeu **HTTP 403 ao CONNECT** para `2r-retifca.vercel.app` e `www.brabus.com`. Por isso, esta é uma auditoria **da aplicação local compilada a partir do repositório**, não uma auditoria concluída da produção. Não se presume que o deploy atual corresponda ao mesmo commit. A comparação visual atual com BRABUS está **NÃO TESTADO**; as referências históricas em outros documentos não foram usadas como evidência desta execução.

Os domínios `2r-retifca.vercel.app`, `www.brabus.com` e `brabus.com` foram adicionados ao rascunho de rede, preservando o preset existente. Isso não aplicou a liberação ao runtime. Para concluir a parte externa, aplicar a mudança nas configurações do ambiente e repetir a captura, os links externos e a medição da URL publicada.

Evidências locais, relatórios brutos e scripts de verificação estão em `/workspace/audit-2r/`. Esses artefatos estão fora do checkout e não acompanham um clone Git separado.

## Problemas comprovados e correções

| Prioridade | Evidência | Correção |
| --- | --- | --- |
| Alta | PNG da hero com 2.062.665 bytes; `srcset` declarava duas larguras para o mesmo arquivo; dimensões declaradas também divergiam do PNG de 1448×1086. Lighthouse mobile: 74, LCP próximo de 13,3 s nas três execuções locais. | Variantes AVIF e fallback WebP de 640, 960 e 1448px, dimensões corretas, `sizes` coerente e preload responsivo. Nenhuma mudança de fundo ou enquadramento. |
| Média | Fotografias de serviços e cartões pequenos carregavam os originais completos; Lighthouse apontava desperdício de resolução. | Previsualizações WebP de 480/800px, conforme largura original. O visor preserva os arquivos completos. |
| Média | Depois de navegar pela galeria/vídeos e enviar o formulário vazio no mobile, o primeiro campo inválido podia ficar a 1,42px do topo, atrás do cabeçalho de 78px. [Captura do defeito](/workspace/audit-2r/after/focus-error-before-fix.png). | Após renderizar os erros, foco sem rolagem nativa e centralização do campo. Na repetição mobile, o campo ficou a 344,42px do topo. |
| Média | Página e JSON-LD publicavam horários específicos; README e documentação registravam discrepância e necessidade de confirmação com a empresa. | Removidas as horas não confirmadas da interface e do schema; CTA para confirmar pelo WhatsApp. Nenhum novo horário foi inventado. |
| Média | `summary_large_image` apontava para ícone de 180×180, apesar da imagem social de 1200×630 já existir. | Open Graph, Twitter e imagem do negócio apontam para `og-2r.jpg`, com dimensões e descrição correspondentes. |
| Baixa | CSS de `.hero-contact-note`, `.hours-panel`, descrições antigas da galeria e keyframe da foto não era usado pelo DOM atual. | Removidas essas regras; a hero principal deixa de ficar transparente durante a animação inicial. |

Não foram encontrados links internos sem alvo, erro de JavaScript, arquivo HTTP ausente ou falha de build nos cenários executados. O `npm audit --json` retornou **zero vulnerabilidades**, incluindo as dependências de desenvolvimento. Isso descreve a resposta do registry nesta execução, não uma garantia permanente.

## Melhorias preventivas, distintas de defeitos observados

- CSP na configuração Vercel: recursos do próprio site, scripts do próprio domínio, sem plugins/objetos, base externa, embedding ou submissão nativa do formulário. Estilos inline continuam permitidos para preservar as interações existentes. O formulário continua preparando uma navegação ao WhatsApp pelo JavaScript.
- Fallbacks `vh` antes de `svh`/`dvh`, para navegadores sem as unidades recentes. A regra que oculta a barra durante o menu não depende mais do suporte a `:has`.
- Descrição local e região do endereço incluem Alto Paraná, mantendo `areaServed` em Ciudad del Este. Não se ampliou a área comercial nem se inventaram serviços, experiência, certificações ou avaliações.

Não houve adição de dependências ao projeto. React, React DOM e Lucide têm uso observado; não foi identificada uma dependência que pudesse ser removida com segurança. A maior parte do JavaScript restante é a base React. Divisão adicional de código fica como melhoria opcional: a meta de desempenho foi alcançada sem atrasar a galeria ou criar placeholders.

## Desempenho antes/depois

Lighthouse **12.8.2**, Chromium **154.0.8037.57**, build de produção servido pelo mesmo `vite preview` local. Três execuções antes e três depois, com o mesmo perfil mobile: viewport 412×823, DPR 1,75, rede simulada de 1.638,4 Kbit/s, RTT de 150ms e multiplicador de CPU 4. As execuções finais não tiveram a suíte de navegador rodando em paralelo. Nenhuma das seis execuções Lighthouse apresentou `runWarnings`.

Valores abaixo são medianas. São medições de laboratório local; não incluem a latência real, cache/CDN, headers efetivos da Vercel ou usuários em Ciudad del Este.

| Métrica | Antes | Depois | Meta |
| --- | ---: | ---: | --- |
| Lighthouse Performance mobile | 74 | 97 | ≥90: atingida localmente |
| LCP | 13,285 s | 2,407 s | ≤2,5 s: atingida nas três execuções finais |
| TBT | 20 ms | 4,5 ms | Métrica de laboratório, não substitui INP |
| CLS | 0,000048 | 0,000142 | ≤0,1: atingida; pequena variação preservada no relatório |
| Transferência medida pelo Lighthouse | 2.600.782 bytes | 422.627 bytes | Redução de 83,75% |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 | Escopo dos checks automáticos |
| INP de usuários reais | **NÃO TESTADO** | **NÃO TESTADO** | Precisa de medição em campo |

| Execução | Antes: score / LCP / TBT | Depois: score / LCP / TBT |
| --- | --- | --- |
| 1 | 74 / 13,285 s / 20 ms | 97 / 2,407 s / 4,5 ms |
| 2 | 74 / 13,289 s / 9 ms | 97 / 2,481 s / 11 ms |
| 3 | 74 / 13,285 s / 22 ms | 97 / 2,406 s / 4 ms |

A hero agora ocupa 20.341 bytes em AVIF de 640px, 38.853 bytes a 960px e 73.628 bytes a 1448px. O teste confirmou uma única variante baixada no carregamento inicial, sem duplicação pelo preload. O fallback WebP também foi decodificado e validado separadamente.

A observação Event Timing durante os fluxos locais com CPU 4× registrou eventos de até 120ms. É uma amostra de interações automatizadas, **não uma medição ou aprovação de INP**.

Resumo bruto: [metrics-summary.json](/workspace/audit-2r/metrics-summary.json). Relatórios Lighthouse: [antes, HTML](/workspace/audit-2r/before/lighthouse-mobile-1.report.html) e [depois, HTML](/workspace/audit-2r/after/lighthouse-mobile-1.report.html). Os JSONs das seis execuções estão nas pastas `before/` e `after/`.

## Jornada comercial e evidência visual

1. **Entrada e proposta — saudável após a otimização.** Em seis tamanhos de tela, o CTA principal ficou visível e a hero terminou na primeira tela; não houve rolagem horizontal. Preto/amarelo, tipografia e composição permaneceram reconhecíveis. [Desktop antes](/workspace/audit-2r/before/01-hero-desktop.png) e [desktop depois](/workspace/audit-2r/after/01-hero-desktop.png).

   Antes, mobile:

   ![Hero mobile antes](/workspace/audit-2r/before/01-hero-mobile.png)

   Depois, mobile:

   ![Hero mobile depois](/workspace/audit-2r/after/01-hero-mobile.png)

2. **Navegação — saudável nos testes locais.** Âncoras existentes, menu abre/fecha, Escape funciona e o conteúdo de fundo fica inerte. Os destinos de telefone, Maps, Facebook e WhatsApp foram inspecionados. Respostas dos serviços externos permanecem **NÃO TESTADO** pela restrição de rede.

   ![Menu mobile depois](/workspace/audit-2r/after/05-mobile-menu.png)

3. **Trabalhos e ampliação — saudável nos testes locais.** Alternância entre 4 e 7 fotografias; visor com setas, Home/End, Escape, contenção de Tab e devolução de foco. Os vídeos só baixam ao reproduzir; ao iniciar o segundo, o primeiro pausa. [Galeria antes](/workspace/audit-2r/before/02-gallery.png) e [galeria depois](/workspace/audit-2r/after/02-gallery.png).

   ![Visor com fotografia original depois](/workspace/audit-2r/after/03-photo-dialog.png)

4. **Consulta e WhatsApp — defeito de foco corrigido.** Nome e consulta vazios ou só com espaços são rejeitados. Acentos, pontuação, quebra de linha e texto semelhante a HTML permanecem dados codificados na URL, sem execução. A navegação do formulário preenchido foi interceptada no navegador; nenhuma mensagem externa foi enviada.

   ![Formulário com erros e campo visível depois](/workspace/audit-2r/after/04-form-errors.png)

As capturas exibidas foram geradas e inspecionadas nesta execução. Capturas transitórias durante a animação do visor foram rejeitadas e refeitas antes de usar a evidência.

## Testes executados

| Verificação | Resultado e limite |
| --- | --- |
| `npm test`, Node 22.23.4 | 3 testes existentes aprovados; zero falhas ou skips. |
| `npm run build` | Aprovado. Preloads e `srcset` resolvidos para os arquivos com hash; PNG fonte não entra no bundle. |
| Navegador sobre build final | 6 cenários aprovados: 320×568, 360×640, 390×844, 768×1024, 844×390 e 1440×960, com CPU 4×. |
| Navegação/contato/galeria/formulário | Aprovados nos seis cenários, incluindo foco após erros e navegação de teclado no visor. |
| Vídeos | Reprodução local de ambos, ausência de download inicial e pausa do anterior confirmadas no cenário mobile. |
| Movimento reduzido | Desativação das animações de título e transformação da hero confirmada no desktop. |
| AVIF / fallback WebP | Ambos decodificados; uma só variante de hero no carregamento inicial. |
| Axe-core, WCAG 2/2.1/2.2 A/AA | Zero violações automáticas nos cenários mobile e desktop com formulário aberto. Há verificações incompletas de contraste que requerem inspeção manual. |
| CSP proposta | Headers emulados no Chromium sobre o build: zero violações nos fluxos reais; script inline executável de teste foi bloqueado. Não comprova os headers do deploy. |
| SEO/arquivos locais | Canonical, robots, sitemap, schema, telefone e destinos WhatsApp coerentes; imagem social e logo retornaram HTTP 200 local. |
| Console/rede | Zero erros de aplicação ou respostas HTTP de erro durante os fluxos; nenhum serviço externo é contatado antes da navegação de contato. |
| `npm audit --json` | Zero vulnerabilidades retornadas. Manifests e lockfile não mudaram. |
| Gerador opcional de imagens | Comandos documentados executados com sharp 0.35.5; os 18 arquivos foram reproduzidos byte a byte. |
| `git diff --check` | Aprovado. |

Scripts/evidências: [verificação de navegador](/workspace/audit-2r/verify.cjs), [resultado de navegador](/workspace/audit-2r/after/browser.json), [log](/workspace/audit-2r/after/browser-test.log), [testes unitários](/workspace/audit-2r/after/unit-tests.log), [build](/workspace/audit-2r/after/build.log), [audit npm](/workspace/audit-2r/before/npm-audit.json).

Para repetir a medição neste ambiente:

```bash
cd /workspace/2R-Retifca
export PATH="/workspace/.cache/2r-node22/node_modules/node/bin:$PATH"
npm run build
# Em outro processo retido: npm run preview -- --port 4173 --strictPort
CHROME_PATH=/usr/bin/chromium /workspace/.cache/2r-audit-tools/node_modules/.bin/lighthouse http://127.0.0.1:4173/ --chrome-flags='--headless --no-sandbox' --output=json --output=html --output-path=/tmp/2r-lighthouse
```

Lighthouse, axe e sharp usados para auditoria foram instalados fora do checkout. Não integram o bundle nem as dependências da aplicação.

## Arquivos modificados

| Arquivo | Alteração |
| --- | --- |
| `src/main.jsx` | Hero responsiva, imagem de serviços, foco após erros e consulta de horário. |
| `src/media.js` | Variantes e previsualizações de mídia, originais preservados. |
| `src/WorkGallery.jsx` | `sizes` conforme grid e imagens menores nos cartões/miniaturas. |
| `src/styles.css` | Picture responsivo, retirada do fade da foto principal, fallbacks e limpeza de regras sem uso. |
| `src/WorkGallery.css` | Fallbacks de viewport e regras sem uso removidas. |
| `index.html` | Preload, compartilhamento, descrição local e dados estruturados sem horários não confirmados. |
| `vercel.json` | CSP adicionada; headers e cache existentes preservados. |
| `scripts/optimize-images.mjs` | Novo gerador opcional de variantes; não é etapa obrigatória do build. |
| `README.md` | Regeneração, origem das variantes e limites dos headers locais. |
| `docs/MEDIOS-V2.md` | Inventário corrigido para os arquivos atuais e tamanhos efetivos. |
| `docs/DIRECCION-DE-ARTE-V2.md` | Origem atual da hero e limite do registro histórico. |
| `docs/AUDITORIA-FINAL-2026-10-26.md` | Este relatório. |

Novas imagens em `src/assets/2r/` (18 arquivos):

```text
hero-motor-640.avif
hero-motor-960.avif
hero-motor-1448.avif
hero-motor-640.webp
hero-motor-960.webp
hero-motor-1448.webp
bloque-cilindros-06-480.webp
bloque-cilindros-06-800.webp
cabezal-terminado-05-480.webp
cabezal-terminado-05-800.webp
cepillado-tapa-02-480.webp
cepillado-tapa-07-480.webp
tapa-rectificada-01-480.webp
tapa-rectificada-01-800.webp
tapa-rectificada-03-480.webp
tapa-rectificada-03-800.webp
tapa-terminada-04-480.webp
tapa-terminada-04-800.webp
```

## Pendências reais e itens não testados

- **NÃO TESTADO — produção desktop/mobile e comparação BRABUS:** bloqueio de domínios no proxy. Aplicar a liberação de rede salva e repetir sobre as URLs externas antes da aprovação final de produção.
- **NÃO TESTADO — headers, cache e compartilhamento social efetivos da Vercel:** a configuração foi inspecionada e a CSP emulada localmente; nenhum deploy foi realizado. Conferir após um deploy autorizado.
- **NÃO TESTADO — INP em campo, CrUX/PageSpeed de produção e rede real no Paraguai:** Lighthouse local e eventos automatizados não substituem dados de usuários reais.
- **NÃO TESTADO — abertura nos apps reais de WhatsApp/telefone, retorno de Maps/Facebook, envio efetivo da mensagem:** URLs verificadas e navegação interceptada para evitar ações externas.
- **NÃO TESTADO — celulares físicos antigos, Safari, Firefox, leitor de tela e gesto de swipe físico:** Chromium com viewports/CPU emulados foi o navegador disponível. Fallbacks de CSS são preventivos; não equivalem a certificação nesses dispositivos.
- **Revisão manual de acessibilidade pendente:** o axe marcou contraste como incompleto em situações de texto vazado/pseudo-elementos/sobreposições. Inspeção visual e teclado foram feitos, mas não se declara conformidade WCAG completa.
- **Informação comercial:** confirmar o horário definitivo com 2R antes de voltar a publicar horas. A origem anterior da imagem fornecida para a hero não foi autenticada nesta auditoria; ela foi preservada, e nenhum material gerado foi acrescentado. Galeria e vídeos mantêm as fontes documentadas da oficina.
- **Medição de conversão real:** aumento de contatos não foi medido nem é presumido a partir de Lighthouse.

A revisão pode ser feita pela branch local e por este relatório. A publicação em produção continua dependendo da aprovação do usuário.
