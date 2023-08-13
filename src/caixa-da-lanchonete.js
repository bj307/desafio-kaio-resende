import { CaixaController } from "./caixa.controller.js";

export class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    try {
      const controller = new CaixaController();
      const resultado = controller.calcularValorTotal(metodoDePagamento, itens);
      return resultado;
    } catch (error) {
      return error;
    }
  }
}

// const metodoDePagamento = "credito";
// const itens = ["cafe,1"];

// const caixa = new CaixaDaLanchonete();
// const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itens);

// console.log(resultado);
