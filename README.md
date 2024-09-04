# Projeto de Mesclagem de PDFs

## Descrição
Este projeto é uma aplicação web para mesclagem de múltiplos arquivos PDF. O usuário pode fazer upload de PDFs, fornecer um e-mail e receber o arquivo final mesclado. A aplicação também permite visualizar um histórico das mesclagens realizadas,além de oferecer uma página de relatórios com gráficos mostrando o número de mesclagens por dia.

## Tecnologias Utilizadas
- **Front-end**: Next.js, React, Context API, Tailwind CSS, Chart.js (para gráficos)
- **Back-end**: Spring Boot, Java, JPA, Flyway
- **Banco de Dados**: MySQL
- **Outras**: PDFBox para manipulação de PDFs, Docker (opcional), Postman para testar a API

## Requisitos
- **Node.js** (versão >= 18)
- **Java 17**
- **MySQL 8.0**
- **Maven**

## Configuração e Execução

### Backend
1. Clone o repositório:
   ```bash
   git clone https://github.com/kerleypablo/power_pdf.git
   cd power_pdf/api


 2.  Configure o banco de dados MySQL:

- Crie um banco de dados com o nome mescladorpdf.
- Atualize as credenciais no arquivo src/main/resources/application.properties:
    ```bash
  spring.datasource.url=jdbc:mysql://localhost:3306/mescladorpdf
  spring.datasource.username=SEU_USUARIO
  spring.datasource.password=SUA_SENHA

3. Execute o projeto:

   ```bash
   ./mvnw spring-boot:run
- Acesse a API no endereço: http://localhost:8080.

### Frontend
1. Navegue até a pasta do front-end:

   ```bash
   cd ../front

2. Instale as dependências:

   ```bash
   npm install

   Configure a variável de ambiente para apontar a URL correta da API:

3. Crie um arquivo .env.local na pasta front com o seguinte conteúdo:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8080

4. Execute a aplicação:

   ```bash
   npm run dev
   
 4. Acesse a aplicação no navegador: http://localhost:3000.

### Funcionalidades
- Upload e mesclagem de múltiplos arquivos PDF
- Validação de e-mail do usuário
- Histórico de mesclagens
- Download de arquivos mesclados

- Para testar a API, você pode utilizar o Postman ou outra ferramenta similar.

- Relatório com gráficos: A aplicação agora conta com uma página de relatórios que exibe um gráfico de barras representando o número de mesclagens feitas por dia.

  ### Página de Relatórios
A página de relatórios pode ser acessada em: /merge/relatorios
O gráfico é gerado utilizando o Chart.js, exibindo as datas e o total de mesclagens realizadas em cada dia.

### Como Contribuir
Contribuições são bem-vindas! Para contribuir:

Faça um fork do projeto.
Crie uma branch com sua funcionalidade (git checkout -b minha-funcionalidade).
Faça um commit (git commit -m 'Minha nova funcionalidade').
Envie para o branch (git push origin minha-funcionalidade).
Abra um Pull Request.
