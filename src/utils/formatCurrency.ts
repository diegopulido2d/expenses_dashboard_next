export const formatCurrency = (value: number): string =>
  value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
