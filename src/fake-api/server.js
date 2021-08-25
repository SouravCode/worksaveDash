import { Server } from "miragejs";

import fixtures from "./src/fixtures";
import routes from "./src/routes";
import models from "./src/models";
import seeds from "./src/seeds";

const config = environment => {
  const config = {
    environment,
    models,
    routes,
    seeds
  };

  if (Object.keys(fixtures).length) {
    config.fixtures = fixtures;
  }

  return config;
};

export default function makeFakeServer({ environment = "development" } = {}) {
  return new Server(config(environment));
}
