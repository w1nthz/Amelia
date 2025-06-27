let salario = 0;
    let totalGastos = 0;

    window.onload = function () {
      const savedSalario = localStorage.getItem("salario");
      const savedGastos = localStorage.getItem("gastos");

      if (savedSalario !== null) {
        salario = parseFloat(savedSalario);
        document.getElementById("salario").value = salario;
      }

      if (savedGastos !== null) {
        totalGastos = parseFloat(savedGastos);
      }

      mostrarTotal();
    };

    function salvarDados() {
      localStorage.setItem("salario", salario);
      localStorage.setItem("gastos", totalGastos);
    }

    function getInputValue(id) {
      const valor = parseFloat(document.getElementById(id).value);
      return isNaN(valor) ? 0 : valor;
    }

    function adicionarGasto(tipo) {
      const valor = getInputValue(tipo);
      if (valor > 0) {
        totalGastos += valor;
        salvarDados();
        document.getElementById("resultado").innerText = `Adicionado R$ ${valor.toFixed(2)} em ${tipo}`;
      } else {
        alert("Digite um valor válido para " + tipo);
      }
    }

    function calcularSalarioFinal() {
      salario = getInputValue("salario");
      const fixo = getInputValue("gastoFixo");
      const investimento = getInputValue("investimento");
      const imprevisto = getInputValue("imprevisto");

      const total = fixo + investimento + imprevisto;
      totalGastos = total;
      const saldoFinal = salario - total;

      salvarDados();

      document.getElementById("resultado").innerText =
        `Salário: R$ ${salario.toFixed(2)}\n` +
        `Total de gastos: R$ ${total.toFixed(2)}\n` +
        `💰 Saldo final: R$ ${saldoFinal.toFixed(2)}`;
    }

    function mostrarTotal() {
      document.getElementById("resultado").innerText =
        `Total de gastos registrados: R$ ${totalGastos.toFixed(2)}`;
    }

    function deletar() {
      salario = 0;
      totalGastos = 0;
      localStorage.clear();
      document.getElementById("salario").value = "";
      document.getElementById("gastoFixo").value = "";
      document.getElementById("investimento").value = "";
      document.getElementById("imprevisto").value = "";
      document.getElementById("resultado").innerText = "Todos os valores foram apagados.";
    }