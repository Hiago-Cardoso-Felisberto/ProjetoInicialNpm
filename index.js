const readline = require('readline');
const bash = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntarNumero(mensagem) {
    return new Promise((resolve) => {
        bash.question(mensagem, (resposta) => {
            resolve(parseInt(resposta));
        });
    });
}

async function main() {
    const totalNumeros = await perguntarNumero("Quantos números deseja somar? ");
    let somaPares = 0;

    for (let i = 0; i < totalNumeros; i++) {
        const numero = await perguntarNumero(`Qual o ${i + 1}º número? `);
        if (numero % 2 === 0) {
            somaPares += numero;
        }
    }

    console.log("A soma dos números pares é:", somaPares);
    bash.close();
}

main();


// ------------------------------(Começo do ex2)------------------------------ \\

const fs = require('fs');
const palavras = new Set(); 
const perguntarPalavra = () => {
    bash.question('Digite uma palavra (ou "sair" para finalizar): ', (resposta) => {
        const palavra = resposta.trim();
        if (palavra.toLowerCase() === 'sair') {
            const palavrasArray = Array.from(palavras);
            const jsonData = JSON.stringify(palavrasArray, null, 2);
            fs.writeFile('palavras.json', jsonData, (err) => {
                if (err) {
                    console.error('Erro ao salvar o arquivo:', err);
                } else {
                    console.log('Palavras salvas com sucesso no arquivo "palavras.json"!');
                }
                bash.close();
            });
        } else {
            if (palavra) {
                palavras.add(palavra);
            }
            perguntarPalavra();
        }
    });
};
perguntarPalavra();