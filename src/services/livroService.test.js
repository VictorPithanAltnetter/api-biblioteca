const livroService = require("./livroService");
const pool = require("../database/connection");

jest.mock("../database/connection");

describe("livroService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("criar", () => {

        test("deve criar um livro", async () => {

            pool.query.mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        titulo: "O Hobbit",
                        ativo: true
                    }
                ]
            });

            const resultado = await livroService.criar("O Hobbit");

            expect(resultado).toEqual({
                id: 1,
                titulo: "O Hobbit",
                ativo: true
            });

            expect(pool.query).toHaveBeenCalledWith(
                "INSERT INTO livros (titulo) VALUES ($1) RETURNING *",
                ["O Hobbit"]
            );
        });

    });

    describe("listar", () => {

        test("deve retornar os livros ativos", async () => {

            pool.query.mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        titulo: "O Hobbit",
                        ativo: true
                    },
                    {
                        id: 2,
                        titulo: "Harry Potter",
                        ativo: true
                    }
                ]
            });

            const resultado = await livroService.listar();

            expect(resultado).toEqual([
                {
                    id: 1,
                    titulo: "O Hobbit",
                    ativo: true
                },
                {
                    id: 2,
                    titulo: "Harry Potter",
                    ativo: true
                }
            ]);

            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM livros WHERE ativo = TRUE"
            );
        });

    });

    describe("buscarPorId", () => {

        test("deve retornar um livro existente", async () => {

            pool.query.mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        titulo: "O Hobbit",
                        ativo: true
                    }
                ]
            });

            const resultado = await livroService.buscarPorId(1);

            expect(resultado).toEqual({
                id: 1,
                titulo: "O Hobbit",
                ativo: true
            });

            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM livros WHERE id = $1 AND ativo = TRUE",
                [1]
            );
        });

        test("deve retornar undefined quando o livro não existir", async () => {

            pool.query.mockResolvedValue({
                rows: []
            });

            const resultado = await livroService.buscarPorId(999);

            expect(resultado).toBeUndefined();
        });

    });

    describe("atualizar", () => {

        test("deve atualizar um livro", async () => {

            pool.query.mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        titulo: "O Hobbit Atualizado",
                        ativo: true
                    }
                ]
            });

            const resultado = await livroService.atualizar(
                1,
                "O Hobbit Atualizado"
            );

            expect(resultado).toEqual({
                id: 1,
                titulo: "O Hobbit Atualizado",
                ativo: true
            });

            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE livros SET titulo = $1 WHERE id = $2 AND ativo = TRUE RETURNING *",
                ["O Hobbit Atualizado", 1]
            );
        });

    });

    describe("excluir", () => {

        test("deve desativar um livro", async () => {

            pool.query.mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        titulo: "O Hobbit",
                        ativo: false
                    }
                ]
            });

            const resultado = await livroService.excluir(1);

            expect(resultado).toEqual({
                id: 1,
                titulo: "O Hobbit",
                ativo: false
            });

            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE livros SET ativo = FALSE WHERE id = $1 AND ativo = TRUE RETURNING *",
                [1]
            );
        });

    });

});