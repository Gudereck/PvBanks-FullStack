# 🏦 PVBanks - API de Gestão Financeira Pessoal

## 📌 Sobre o Projeto
O **PVBanks** é uma API RESTful desenvolvida para servir como o núcleo de um sistema de gestão financeira pessoal. A aplicação permite registrar, organizar e analisar transações financeiras, oferecendo uma visão clara do saldo do usuário em tempo real.

O projeto foi construído com foco em:
* ✅ Clean Code
* ✅ Boas práticas de arquitetura
* ✅ Escalabilidade
* ✅ Manutenibilidade

## 🧱 Arquitetura
O sistema segue o padrão de Arquitetura em Camadas, dividido em:
* **Controller** → Responsável pelas requisições HTTP
* **Service** → Onde ficam as regras de negócio
* **Repository** → Comunicação com o banco de dados

Essa separação garante um código mais organizado, testável e fácil de evoluir.

## 🚀 Tecnologias Utilizadas
* **Java 21+**
* **Spring Boot 3.x**
* **Spring Data MongoDB**
* **MongoDB**
* **Lombok**
* **Postman**

## ⚙️ Funcionalidades

**💰 Gestão de Transações**
* CRUD completo de receitas e despesas.
* Atualização e exclusão de registros.
* Histórico completo de transações.

**🏷️ Categorização**
* Classificação entre: `RECEITA` e `DESPESA`.

**📊 Resumo Financeiro**
* Endpoint `/resumo` que calcula:
  * Total de receitas
  * Total de despesas
  * Saldo final
* Implementado com **Java Streams** para maior eficiência e legibilidade.

**🧠 Regras de Negócio Centralizadas**
* Toda a lógica está isolada na camada Service.
* Controllers enxutos e focados apenas em HTTP.

## 🛣️ Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/transacoes` | Cria uma nova transação |
| `GET` | `/api/transacoes` | Lista todas as transações |
| `PUT` | `/api/transacoes/{id}` | Atualiza uma transação |
| `DELETE` | `/api/transacoes/{id}` | Remove uma transação |
| `GET` | `/api/transacoes/resumo` | Retorna o resumo financeiro |

### 📄 Exemplo de Resposta
**GET** `/api/transacoes/resumo`
```json
{
  "totalReceitas": 1842.35,
  "totalDespesas": 120.50,
  "saldoTotal": 1721.85
}
````
🛠️ Como Executar o Projeto
Pré-requisitos

Java 21+

Maven ou Gradle

MongoDB (local ou Atlas)

Passos

# Clone o repositório
git clone [https://github.com/Gudereck/PVBanks.git](https://github.com/Gudereck/PVBanks.git)

# Acesse a pasta
cd PVBanks

# Execute o projeto
./mvnw spring-boot:run

## 🔮 Melhorias Futuras
* [ ] Autenticação com JWT
* [ ] Controle de usuários (multi-conta)
* [ ] Filtros por data e categoria
* [ ] Dashboard com gráficos
* [ ] Testes automatizados (JUnit + Mockito)
* [ ] Deploy na nuvem (Render / AWS / Railway)

## 👨‍💻 Autor

**Gustavo de Deus Rocha Florentino** 🎓 Estudante de Sistemas de Informação  
☕ Desenvolvedor Back-end Java
