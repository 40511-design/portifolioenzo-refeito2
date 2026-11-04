# Portfólio — Enzo Sekiya

Portfólio responsivo feito com **HTML, CSS e JavaScript puro**, com estética escura, detalhes em verde-limão, tipografia editorial, animações suaves e elementos gráficos criados em CSS.

## Arquivos

- `index.html` — estrutura, conteúdo e seções.
- `style.css` — identidade visual, layout responsivo e animações.
- `script.js` — menu mobile, modo claro/escuro com preferência salva, revelação ao rolar, navegação ativa, brilho do cursor e botão de copiar e-mail.

## Como visualizar

1. Extraia o ZIP.
2. Abra `index.html` no navegador.
3. Para editar, abra a pasta no VS Code.

As fontes Manrope e DM Mono são carregadas do Google Fonts. Se estiver sem internet, o site usa fontes de fallback.

## Como publicar no Netlify

1. Entre no painel do Netlify.
2. Abra o site que deseja atualizar.
3. Vá à área de deploys.
4. Arraste a pasta extraída (a pasta que contém `index.html`, `style.css` e `script.js`) para a área de deploy manual, ou conecte o repositório Git.
5. Abra a URL publicada e teste no celular e no computador.

## Personalizações importantes

- Confira o e-mail `enzoysw58@gmail.com` no `index.html` antes de publicar.
- Atualize os projetos e os links quando tiver repositórios ou demonstrações públicas. Os cards atuais descrevem conceitos e exercícios de estudo; eles não fingem ser produtos finalizados.
- Para adicionar um projeto, duplique um bloco `<article class="project-card reveal">` dentro de `#projetos` e ajuste título, descrição e tecnologias.
- O menu usa links para IDs de seção; mantenha os IDs se mudar os nomes dos links.

## Tema claro e escuro

O botão no cabeçalho alterna entre os temas. A escolha fica salva no navegador e, na primeira visita, o site tenta respeitar a preferência de aparência do sistema.

## Acessibilidade e performance

- Layout adaptável para telas pequenas.
- Menu mobile com `aria-expanded`, nome acessível e suporte à tecla Escape.
- Respeita `prefers-reduced-motion`.
- Animações com `IntersectionObserver`.
- Não usa bibliotecas JavaScript externas.
