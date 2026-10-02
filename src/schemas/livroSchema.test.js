const { criarLivroSchema, atualizarLivroSchema } = require("./livroSchema");

describe("criarLivroSchema", () => {
  test("deve aceitar um título válido", () => {
    const resultado = criarLivroSchema.safeParse({
      titulo: "O Hobbit",
    });

    expect(resultado.success).toBe(true);
  });

  test("deve rejeitar título vazio", () => {
    const resultado = criarLivroSchema.safeParse({
      titulo: "",
    });

    expect(resultado.success).toBe(false);
  });

  test("deve rejeitar título que não seja string", () => {
    const resultado = criarLivroSchema.safeParse({
      titulo: 123,
    });

    expect(resultado.success).toBe(false);
  });
});

describe("atualizarLivroSchema", () => {
  test("deve aceitar um título válido", () => {
    const resultado = atualizarLivroSchema.safeParse({
      titulo: "Harry Potter",
    });

    expect(resultado.success).toBe(true);
  });

  test("deve rejeitar título vazio", () => {
    const resultado = atualizarLivroSchema.safeParse({
      titulo: "",
    });

    expect(resultado.success).toBe(false);
  });
});
