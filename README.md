# Sistema de Cálculo de Horas Complementares

Este projeto foi desenvolvido como parte do trabalho da disciplina de **Desenvolvimento Web**, a pedido do professor **Willyan Michel Ferreira**, para o curso de **Engenharia da Computação** da UEMG. O sistema permite o cálculo e gerenciamento de horas complementares, seguindo as regras estabelecidas no PPC do curso.

## Funcionalidades Principais

- **Cadastro de Atividades:** Insira descrição, categoria (Ensino, Extensão, Pesquisa), tipo específico de atividade e horas dedicadas.
- **Cálculo de Horas Aproveitadas:** O sistema calcula automaticamente as horas aproveitadas com base nas regras de aproveitamento e limites máximos.
- **Respeito aos Limites:** Garante que o total de horas por categoria não ultrapasse 90h e respeita os limites individuais de cada tipo de atividade.
- **Interface Simples:** Design intuitivo e fácil de usar.

## Regras Implementadas

- Limite máximo de **90 horas** por categoria (Ensino, Extensão, Pesquisa).
- Limites específicos para cada tipo de atividade (ex.: Projeto de Extensão tem limite de 40h com 10% de aproveitamento).
- Ignora valores excedentes aos limites, garantindo conformidade com as regras.

## Como Usar

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` no navegador.
3. Insira os dados das atividades no formulário e veja os resultados em tempo real.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript

## Observações

Este sistema foi desenvolvido para uso local e não inclui banco de dados. Todos os dados são processados diretamente no navegador.

---

Desenvolvido para a disciplina de **Desenvolvimento Web** sob orientação do professor **Willyan Michel Ferreira**. 😊
