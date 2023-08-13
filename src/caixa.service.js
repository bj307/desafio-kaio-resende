import cardapio from "./cardapio.json";

export class CaixaService {
  static processarItens(itens) {
    return itens.map((item) => {
      const [nome, quantidade] = item.split(",");
      return [nome, parseInt(quantidade)];
    });
  }

  static validarItens(pedidos) {
    for (const pedido of pedidos) {
      const [item, quantidade] = pedido;
      const itemExiste = cardapio[item];
      if (!itemExiste) {
        return "Item inválido!";
      }
    }
  }

  static calcularValorDoPedido(pedidos) {
    let total = 0;

    for (const pedido of pedidos) {
      const [item, quantidade] = pedido;

      total += cardapio[item].valor * quantidade;
    }

    return total;
  }

  static calcularDesconto(pagamento, total) {
    if (pagamento === "dinheiro") {
      total *= 0.95;
    } else if (pagamento === "credito") {
      total *= 1.03;
    }

    return total;
  }

  static validarExtras(pedidos) {
    const extras = ["chantily", "queijo"];
    const principais = {
      chantily: "cafe",
      queijo: "sanduiche",
    };

    for (const [extra, quantidade] of pedidos) {
      if (extras.includes(extra)) {
        const itemPrincipal = principais[extra];
        if (!pedidos.some(([item]) => item === itemPrincipal)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }
  }
}
