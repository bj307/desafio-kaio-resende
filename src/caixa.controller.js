import { CaixaService } from "./caixa.service.js";

export class CaixaController {
  calcularValorTotal(pagamento, pedidos) {
    try {
      const todosPedisos = CaixaService.processarItens(pedidos);

      if (todosPedisos.length === 0) {
        return "Não há itens no carrinho de compra!";
      }

      for (const [item, quantidade] of todosPedisos) {
        if (quantidade <= 0) {
          return "Quantidade inválida!";
        }
      }

      if (
        pagamento !== "dinheiro" &&
        pagamento !== "credito" &&
        pagamento !== "debito"
      ) {
        return "Forma de pagamento inválida!";
      }

      const validarItens = CaixaService.validarItens(todosPedisos);
      if (validarItens) {
        throw new Error(validarItens);
        return;
      }

      const validarExtras = CaixaService.validarExtras(todosPedisos);
      if (validarExtras) {
        throw new Error(validarExtras);
        return;
      }

      const valorTotal = CaixaService.calcularValorDoPedido(todosPedisos);
      const total = CaixaService.calcularDesconto(pagamento, valorTotal);

      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    } catch (error) {
      return error.message;
    }
  }
}
