# planta-iris
🌸 Classificação da Planta Íris — Rede Neural Artificial + Projeto Web

Este projeto teve como objetivo classificar as três espécies da famosa Planta Íris utilizando uma Rede Neural Artificial (RNA). Inicialmente desenvolvido em Python, o projeto passou por uma transformação para se tornar totalmente visual e acessível no navegador, usando apenas tecnologias Web.

🎯 Objetivo do Projeto

Desenvolver um classificador de espécies da Íris usando uma Rede Neural Artificial.

Converter o projeto original em Python para um formato Web didático.

Permitir que o usuário visualize previsões diretamente no navegador.

Demonstrar conceitos fundamentais de classificação supervisionada.

🧠 Arquitetura da Rede Neural

A versão original em Python utilizava:

Camada de Entrada: 4 neurônios (características botânicas da Íris)

Camada Oculta: 8 neurônios (ReLU)

Camada de Saída: 3 neurônios (softmax para classificação)

A versão Web utiliza TensorFlow.js para reaplicar essa arquitetura diretamente no navegador.

🛠️ Tecnologias Utilizadas
✅ Python + TensorFlow/Keras (versão inicial)

Construção e treino da RNA

Pré-processamento do dataset

Avaliação e métricas iniciais

✅ TensorFlow.js (versão web)

Reimplementação do modelo em JavaScript

Predição local, direto no navegador

Execução totalmente client-side

✅ HTML + CSS + JavaScript

Interface limpa e responsiva

Botões e inputs para carregar dados e exibir previsões

Estrutura simples e didática para fins educacionais

✅ Chart.js (opcional)

Visualização de métricas e comportamento do modelo

📘 O que Eu Aprendi

Durante o projeto, pude consolidar e aprofundar diversos conhecimentos importantes:

✅ Como funciona uma RNA para classificação multiclasse.

✅ Diferença entre softmax, one-hot encoding e função de custo categórica.

✅ Como adaptar um projeto Python para rodar totalmente no navegador.

✅ Como manipular modelos em TensorFlow.js e converter fluxos de ML para ambientes Web.

✅ Como construir uma interface visual para demonstrar:

Entrada dos dados

Predição

Resultado final

✅ Resultado Final

O resultado foi um projeto Web funcional, onde o usuário pode:

Inserir valores das 4 medidas da planta Íris

Obter instantaneamente a espécie prevista

Visualizar o funcionamento de uma RNA de forma clara e intuitiva

Tudo isso sem backend, funcionando 100% no navegador.

O projeto é ideal para fins educativos, demonstrações em sala de aula, estudos individuais e introdução ao uso de redes neurais na Web.