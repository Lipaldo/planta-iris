let dados = [];
let labels = [];

document.getElementById("toggleTheme").onclick = () => {
    document.body.classList.toggle("light");
};

// ✅ Comando único para carregar CSV automaticamente
async function carregarCSV() {
    try {
        const response = await fetch("iris.csv");
        const csvText = await response.text();
        
        processarCSV(csvText);
        document.getElementById("csvStatus").innerText = "✅ CSV carregado com sucesso!";
    } catch (e) {
        document.getElementById("csvStatus").innerText = "❌ Erro ao carregar CSV.";
    }
}

function processarCSV(texto) {
    const linhas = texto.trim().split("\n");
    linhas.shift(); // remove cabeçalho

    dados = [];
    labels = [];

    for (let linha of linhas) {
        const c = linha.split(",");
        dados.push([+c[0], +c[1], +c[2], +c[3]]);
        labels.push(c[4]);
    }

    const mapa = {};
    let id = 0;

    labels = labels.map(l => {
        if (!mapa[l]) mapa[l] = id++;
        return mapa[l];
    });
}

async function treinar() {
    if (dados.length === 0) {
        alert("Carregue o CSV primeiro!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");

    const xs = tf.tensor2d(dados);
    const ys = tf.oneHot(tf.tensor1d(labels, "int32"), 3);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 4, activation: "relu", inputShape: [4] }));
    model.add(tf.layers.dense({ units: 4, activation: "relu" }));
    model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

    model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"]
    });

    const history = await model.fit(xs, ys, {
        epochs: 200,
        batchSize: 10,
        validationSplit: 0.25
    });

    gerarGraficoLossAcc(history);
    gerarMatriz(model, xs, labels);

    document.getElementById("loading").classList.add("hidden");
}

// ✅ Novo: Gráfico combinado (Loss + Accuracy)
function gerarGraficoLossAcc(hist) {
    new Chart(document.getElementById("lossAccChart"), {
        type: "line",
        data: {
            labels: hist.history.loss.map((_, i) => i + 1),
            datasets: [
                { label: "Loss", data: hist.history.loss, borderColor: "red", tension: 0.2 },
                { label: "Val Loss", data: hist.history.val_loss, borderColor: "orange", tension: 0.2 },
                { label: "Acurácia", data: hist.history.acc || hist.history.accuracy, borderColor: "lime", tension: 0.2 }
            ]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
            scales: { x: { ticks: { color: "white" } }, y: { ticks: { color: "white" } } }
        }
    });
}

// ✅ Novo: Matriz de confusão com gráfico de barras
function gerarMatriz(model, xs, labels) {
    const preds = model.predict(xs).argMax(1).arraySync();

    const matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    preds.forEach((p, i) => matrix[labels[i]][p]++);

    new Chart(document.getElementById("matrixChart"), {
        type: "bar",
        data: {
            labels: ["Classe 0", "Classe 1", "Classe 2"],
            datasets: [
                { label: "Verdadeiro 0", data: matrix[0], backgroundColor: "cyan" },
                { label: "Verdadeiro 1", data: matrix[1], backgroundColor: "magenta" },
                { label: "Verdadeiro 2", data: matrix[2], backgroundColor: "yellow" }
            ]
        },
        options: {
            plugins: { legend: { labels: { color: "white" } } },
            scales: { x: { ticks: { color: "white" } }, y: { ticks: { color: "white" } } }
        }
    });
}
