const { parseISO, format, differenceInDays } = require('date-fns');
const RECEBIVEIS = [
  { codigo: '1H01R6HA1', dataEmissao: '2023-05-02', dataVencimento: '2023-08-09', valor: '146.99' },
  { codigo: '1H01R6HB1', dataEmissao: '2023-05-02', dataVencimento: '2023-05-08', valor: '592.18' },
  { codigo: '1H01R6HC1', dataEmissao: '2023-05-03', dataVencimento: '2023-06-28', valor: '98.20' },
  { codigo: '1H01R6HD1', dataEmissao: '2023-05-06', dataVencimento: '2023-09-19', valor: '726.01' },
  { codigo: '1H01R6HE1', dataEmissao: '2023-05-02', dataVencimento: '2023-05-08', valor: '81.88' },
  { codigo: '1H01R6HF1', dataEmissao: '2023-05-03', dataVencimento: '2023-07-15', valor: '221.34' },
  { codigo: '1H01R6HG1', dataEmissao: '2023-05-02', dataVencimento: '2023-07-25', valor: '711.98' },
  { codigo: '1H01R6HH1', dataEmissao: '2023-05-05', dataVencimento: '2023-10-10', valor: '100.27' },
  { codigo: '1H01R6HI1', dataEmissao: '2023-05-02', dataVencimento: '2023-10-12', valor: '3021.83' },
  { codigo: '1H01R6HJ1', dataEmissao: '2023-05-03', dataVencimento: '2023-09-19', valor: '1930.76' }
];

//("1 - Print a soma agrupando as mesmas datas de vencimentos");
const agrupadoPorDataVencimento = RECEBIVEIS.reduce((acumulador, recebivel) => {
    const { dataVencimento, valor } = recebivel;
    acumulador[dataVencimento] = (acumulador[dataVencimento] || 0) + parseFloat(valor);
    return acumulador;
  }, {});
  
  console.log(agrupadoPorDataVencimento);

//("2 - Print a soma dos recebiveis ja vencidos");
const dataAtual = new Date();

let somaRecebiveisVencidos = 0;

RECEBIVEIS.forEach(recebivel => {
  const dataVencimento = parseISO(recebivel.dataVencimento);

  if (dataVencimento < dataAtual) {
    somaRecebiveisVencidos += parseFloat(recebivel.valor);
  }
});

console.log(`Soma dos recebíveis vencidos: ${somaRecebiveisVencidos}` );

//("3 - Formate para moeda Real o valor do recebivel com vencimento 25/07/2023");

const dataVencimentoDesejada = parseISO('2023-07-25');

RECEBIVEIS.forEach(recebivel => {
  const dataVencimento = parseISO(recebivel.dataVencimento);
  const valor = parseFloat(recebivel.valor);

  if (dataVencimento.getTime() === dataVencimentoDesejada.getTime()) {
    const valorFormatado = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    console.log(`O valor em formato real é igual a  ${valorFormatado}`); 
  }
});

//("4 - Print o prazo em dias entre emissao e vencimento do recebivel com vencimento 12/10/2023");

const dataVencimentoProcurada = '2023-10-12';
const recebivelProcurado = RECEBIVEIS.find(recebivel => recebivel.dataVencimento === dataVencimentoProcurada);

if (recebivelProcurado) {
  const { dataEmissao, dataVencimento } = recebivelProcurado;
  const prazoEmDias = differenceInDays(parseISO(dataVencimento), parseISO(dataEmissao));
  console.log(`O prazo em dias entre a emissão e o vencimento do recebível com vencimento ${dataVencimentoProcurada} é de ${prazoEmDias} dias`);
} else {
  console.log('Recebível não encontrado');
}

//("5 - Print a concatenação de todos os campos do recebivel separando por ;");
const concatenacaoValores = RECEBIVEIS.map(recebivel =>
  Object.values(recebivel).join(';')
).join('\n');

console.log(`A concatenação dos valores separando por ';' é \n ${concatenacaoValores}`);

//("6 - Formate a data 2023-06-25 do recebivel para o formato dd/MM/yyyy")

const dataRecebivel = '2023-06-25';
const dataFormatada = format(new Date(dataRecebivel + 'T00:00:00'), 'dd/MM/yyyy');
console.log(dataFormatada); // Saída: '25/06/2023'

/* "7 - Dado uma lista da variável `valores` abaixo, acrescente um novo valor de acordo com as regras a seguir:");
   -  R$5,90 para valores menor e igual que R$100,00");
   -  R$15,00 para valores menor que R$20,00");
   -  R$4,33 para valores maior que R$100,00");
   -  R$2,10 para valores maior que R$200,00");
   -  R$3,55 para valores igual que R$150,00");
   Print o novo resultado na saída da condição de validação e no final print a soma de todos os novos valores da lista");
*/

for (let i = 0; i < RECEBIVEIS.length; i++) {
  const valor = parseFloat(RECEBIVEIS[i].valor);

  if (valor <= 100) {
    RECEBIVEIS[i].valorNovo = (valor + 5.9).toFixed(2);
  } else if (valor < 200) {
    RECEBIVEIS[i].valorNovo = (valor + 15).toFixed(2);
  } else if (valor === 150) {
    RECEBIVEIS[i].valorNovo = (valor + 3.55).toFixed(2);
  } else {
    RECEBIVEIS[i].valorNovo = (valor + 4.33).toFixed(2);
  }
  console.log(`Novo valor para o código ${RECEBIVEIS[i].codigo}: R$${RECEBIVEIS[i].valorNovo}`);
}
// Calcular a soma de todos os novos valores
let somaNovosValores = 0;
for (let i = 0; i < RECEBIVEIS.length; i++) {
somaNovosValores += parseFloat(RECEBIVEIS[i].valorNovo);
}
console.log(`Soma dos novos valores: R$${somaNovosValores.toFixed(2)}`);