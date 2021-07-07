import {
  createServer,
  Model,
  Factory,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import faker from "faker";
type Filial = {
  nome: string;
  total_funcionarios: number;
};
type User = {
  email: string;
  nome: string;
};
type Funcionario = {
  nome: string;
  nome_filial: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      aplication: ActiveModelSerializer,
    },
    models: {
      filial: Model.extend<Partial<Filial>>({}),
      user: Model.extend<Partial<User>>({}),
      funcionario: Model.extend<Partial<Funcionario>>({}),
    },
    factories: {
      user: Factory.extend({
        nome(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
      }),
      filial: Factory.extend({
        nome(i: number) {
          return `Filial ${i + 1}`;
        },
        total_funcionarios() {
          return faker.datatype.number();
        },
      }),
      funcionario: Factory.extend({
        nome(i: number) {
          return `Raul ${i + 1}`;
        },
        nome_filial(i: number) {
          return `Filial ${i + 1}`;
        },
      }),
    },
    seeds(server) {
      server.createList("user", 10);
      server.createList("filial", 5);
      server.createList("funcionario", 6);
    },
    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/filials", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        const total = schema.all("filial").length;
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const filiais = this.serialize(schema.all("filial")).filials.slice(
          pageStart,
          pageEnd
        );

        return new Response(
          200,
          { "x-total-count": String(total) },
          { filiais }
        );
      });

      this.post("/filials", function (schema, request) {
        let attrs = JSON.parse(request.requestBody).filial;

        if (attrs.nome) {
          return this.serialize(schema.create("filial", attrs));
        } else {
          return new Response(
            400,
            { some: "header" },
            { errors: ["name cannot be blank"] }
          );
        }
      });

      this.put("/filials/:id", function (schema, request) {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody).filial;

        return this.serialize(schema.find("filial", id).update(attrs));
      });

      this.del("/filials/:id", function (schema, request) {
        let id = request.params.id;
        schema.find("filial", id).destroy();
        return null;
      });

      this.get("/funcionarios");

      this.get("/funcionarios", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        const total = schema.all("funcionario").length;
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const funcionarios = this.serialize(
          schema.all("funcionario")
        ).funcionarios.slice(pageStart, pageEnd);

        return new Response(
          200,
          { "x-total-count": String(total) },
          { funcionarios }
        );
      });

      this.post("/funcionarios", function (schema, request) {
        let attrs = JSON.parse(request.requestBody).funcionario;

        if (attrs.nome) {
          return this.serialize(schema.create("funcionario", attrs));
        } else {
          return new Response(
            400,
            { some: "header" },
            { errors: ["name cannot be blank"] }
          );
        }
      });

      this.put("/funcionarios/:id", function (schema, request) {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody).filial;

        return this.serialize(schema.find("funcionario", id).update(attrs));
      });

      this.del("/funcionarios/:id", function (schema, request) {
        let id = request.params.id;
        schema.find("funcionario", id).destroy();
        return null;
      });

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
