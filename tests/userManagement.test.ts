import { Given, When, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import supertest from "supertest";

import { app } from "../src/shared/infra/http/app";
import { PORT } from "../src/config";
import { setupDatabase, teardownDatabase } from './support/setupDatabase'
import assert from "assert";

 let server: supertest.Agent

BeforeAll({
  timeout: 60 *  1000
}, async function () {
  await setupDatabase();

  server = supertest(app);
});

AfterAll({
  timeout: 60 * 1000
} ,async function () {
  await teardownDatabase();
});

Given(
  "a future user provides an email {string}",
  async function (email: string) {
    this.parameters.email = email;
  }
);

Given("a password {string}", function (password: string) {
  this.parameters.password = password;
});

When("the data is submitted", async function () {
  const randomPrefix = Math.random().toString(36).substring(2, 15) + "_"

  const payload = {
    email: `${randomPrefix}${this.parameters.email}`,
    password:  this.parameters.password,
  }

  const { statusCode, body } = await server.post("/users").send(payload);

  this.parameters.user = body;
  this.parameters.status = statusCode;
});

Then("the user is registered in the database", function () {
  const actual = this.parameters.status;
  const expected = 201;

  assert.equal(actual, expected);
});

Then("the password is hashed", function () {
  const actual = this.parameters.user.password;
  const expected = this.parameters.password;
  
  assert.notEqual(actual, expected);
});

Then("a validation error is returned with status {int}", function (int) {
  const actual = this.parameters.status;
  const expected = int;
  
  assert.equal(actual, expected)
});
