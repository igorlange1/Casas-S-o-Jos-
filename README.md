# Casas São José - Site Oficial

Site institucional e catálogo de modelos para a **Casas São José**, especializada em casas de madeira nobre e alvenaria com mais de 40 anos de tradição.

## 🚀 Tecnologias
- HTML5 / CSS3 (Tailwind CSS)
- JavaScript (Vanilla)
- PHP (API Bridge para Webhooks)
- Google Tag Manager & Google Ads Integration

## 🛠️ Funcionalidades
- **Catálogo Dinâmico:** Gerenciado via `js/data.js`.
- **Integração com Make.com:** Envio seguro de leads via PHP.
- **WhatsApp Dinâmico:** Mensagens personalizadas para cada modelo.
- **Segurança:** Proteção contra spam (Honeypot) e Rate Limiting.
- **SEO Otimizado:** Meta tags e estrutura preparada para rankeamento.

## 📦 Como Instalar (Via GitHub + cPanel Git Version Control)

Este projeto está configurado para **Deploy Automático** no cPanel.

1. **No cPanel:** Vá em "Git Version Control" e crie um novo repositório apontando para o seu link do GitHub.
2. **Deploy Automático:** O arquivo `.cpanel.yml` incluído na raiz cuidará de copiar os arquivos para a `public_html` toda vez que você fizer um commit no GitHub.
3. **Caminhos:** Por padrão, o script de deploy tenta enviar para `public_html`. Se o seu usuário do cPanel for diferente ou a pasta for outra, você pode editar o arquivo `.cpanel.yml`.

## 🛠️ Configuração Manual (Importante)
Após o primeiro "Pull" no cPanel:
- Edite o arquivo `api/config.php` diretamente no Gerenciador de Arquivos do cPanel para inserir o seu webhook definitivo.

## 💻 Desenvolvimento Local
Este projeto utiliza um servidor Express simples para simular o ambiente PHP durante o desenvolvimento aqui no editor.
```bash
npm install
npm run dev
```

---
*Desenvolvido para Casas São José.*
