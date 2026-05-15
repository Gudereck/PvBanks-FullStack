# 🏦 PvBanks - FullStack Banking Dashboard

![Banner do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-success)
![Angular](https://img.shields.io/badge/Frontend-Angular%2018%2B-DD0031?logo=angular)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=spring)
![AI Assisted](https://img.shields.io/badge/Desenvolvido%20com-IA%20(Google%20Gemini)-8A2BE2)

O **PvBanks** é um sistema bancário simulado e completo (FullStack) projetado para oferecer uma experiência de usuário *premium*, moderna e focada em finanças. Com uma estética minimalista *Dark/Black & White*, o painel permite o gerenciamento de transações, análise de gastos com gráficos, controle de segurança e acompanhamento de investimentos conectados a indicadores reais.

> 🤖 **Nota sobre o Desenvolvimento:** Grande parte das novas funcionalidades de interface, gráficos, roteamento avançado, refatoração e da estrutura de Segurança JWT no backend foram desenvolvidas de forma automatizada (pair-programming) com o auxílio de **Inteligência Artificial (Google Gemini / Antigravity)**.

---

## ✨ Principais Funcionalidades

### 🖥️ Frontend (Interface do Usuário)
*   **Tema Dark & White Moderno:** Estilização desenvolvida do zero em SCSS (`variables.scss`), sem depender de bibliotecas engessadas de componentes.
*   **Análises Financeiras (Analytics):** Gráficos dinâmicos de Receitas vs Despesas e Distribuição de Gastos criados com `ng2-charts` (Chart.js).
*   **Investimentos:** Acompanhamento da carteira com integração **real** à API do Banco Central do Brasil para puxar a Taxa Selic/CDI ao vivo.
*   **Transações:** Histórico inteligente com filtros avançados (por texto, data e tipo).
*   **Segurança e Configurações:** Telas interativas para gerenciamento de perfil, autenticação de dois fatores (2FA) e dispositivos conectados.
*   **Dashboard Layout Modular:** Sistema de rotas aninhadas onde o menu lateral (Sidebar) se mantém estático e rápido.

### ⚙️ Backend (API)
*   **Spring Security & JWT:** O sistema conta com filtros avançados (JwtFilter) para garantir que apenas usuários logados tenham acesso aos seus próprios saldos e históricos.
*   **Módulos Sólidos:** Controladores independentes para `Autenticação`, `Transações` e `Investimentos`.
*   **DTOs:** O tráfego de dados é enxuto, retornando Resumos Financeiros calculados diretamente da API.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
*   **Node.js** (v18+) e **Angular CLI** instalados.
*   **Java 17+** e **Gradle** instalados.

### 1. Rodando o Backend (Spring Boot)
1. Abra um terminal e navegue até a pasta do backend:
   ```bash
   cd Backend/Finanças
   ```
2. Caso o banco de dados (MySQL/PostgreSQL) já esteja configurado no seu `application.properties`, rode a aplicação via Gradle:
   ```bash
   ./gradlew bootRun
   ```
   *O backend iniciará na porta `8080` (http://localhost:8080).*

### 2. Rodando o Frontend (Angular)
1. Abra um novo terminal e navegue até a pasta do frontend:
   ```bash
   cd Fontend
   ```
2. Instale as dependências (caso seja a primeira vez):
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
   *O frontend ficará disponível em `http://localhost:4200`.*

---

## 🛠️ Tecnologias Utilizadas

| Frontend | Backend |
| :--- | :--- |
| Angular (TypeScript) | Java |
| SCSS / CSS Vanilla | Spring Boot |
| Chart.js / ng2-charts | Spring Security (JWT) |
| API Banco Central (HTTPClient) | Gradle |

---

Desenvolvido com o objetivo de construir uma arquitetura limpa, escalável e de alto impacto visual. 🚀
