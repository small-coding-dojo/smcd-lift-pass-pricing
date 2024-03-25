import { assert, expect } from "chai";
import request from "supertest-as-promised";
import { createApp } from "../src/prices";

describe("prices", () => {
  let app, connection;

  beforeEach(async () => {
    ({ app, connection } = await createApp());
  });

  afterEach(async () => {
    await connection.end();
  });

  describe("get", () => {
    it("does something", async () => {
      const response = await request(app).get("/prices?type=1jour");

      var expectedResult = { cost: 35 }; // change this to make the test pass
      expect(response.body).deep.equal(expectedResult);
    });

    [{ age: 5, expected: 0 }].forEach((testCase) => {
      it(`Some kids are free`, async () => {
        const response = await request(app).get(`/prices?age=${testCase.age}`);

        var expectedResult = { cost: testCase.expected };
        expect(response.body).deep.equal(expectedResult);
      });
    });

    [{ age: 4, date: "2024-02-26", type: "night", expected: 0 }].forEach(
      (testCase) => {
        it(`unable to cover 79, night rate for kids`, async () => {
          const response = await request(app).get(
            `/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`
          );

          var expectedResult = { cost: testCase.expected };
          expect(response.body).deep.equal(expectedResult);
        });
      }
    );

    [{ age: 21, date: "2019-02-18", type: "1jour", expected: 35 }].forEach(
      (testCase) => {
        it(`cover 39-44`, async () => {
          const response = await request(app).get(
            `/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`
          );

          var expectedResult = { cost: testCase.expected };
          expect(response.body).deep.equal(expectedResult);
        });
      }
    );

    [{ age: 21, date: "2024-02-26", type: "1jour", expected: 23 }].forEach(
      (testCase) => {
        it(`cover 51, Mondays seem to be reduced by 35%`, async () => {
          const response = await request(app).get(
            `/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`
          );

          var expectedResult = { cost: testCase.expected };
          expect(response.body).deep.equal(expectedResult);
        });
      }
    );

    [{ age: 14, date: "2024-02-26", type: "1jour", expected: 25 }].forEach(
      (testCase) => {
        it(`cover 56, some kids do have to pay`, async () => {
          const response = await request(app).get(
            `/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`
          );

          var expectedResult = { cost: testCase.expected };
          expect(response.body).deep.equal(expectedResult);
        });
      }
    );

    [{ age: 65, date: "2024-02-26", type: "1jour", expected: 18 }].forEach(
      (testCase) => {
        it(`cover 63-64, seniors pay less`, async () => {
          const response = await request(app).get(
            `/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`
          );

          var expectedResult = { cost: testCase.expected };
          expect(response.body).deep.equal(expectedResult);
        });
      }
    );

    [{ age: 65, date: "2024-02-26", type: "night", expected: 8 }].forEach(
      (testCase) => {
        it(`cover 72-74, seniors seem to pay 40% at night`, async () => {
          const response = await request(app).get(
            `/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`
          );

          var expectedResult = { cost: testCase.expected };
          expect(response.body).deep.equal(expectedResult);
        });
      }
    );

    [{ age: 63, date: "2024-02-26", type: "night", expected: 19 }].forEach(
      (testCase) => {
        it(`cover 76, night rate`, async () => {
          const response = await request(app).get(
            `/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`
          );

          var expectedResult = { cost: testCase.expected };
          expect(response.body).deep.equal(expectedResult);
        });
      }
    );

    it("does crash something", async () => {
      const response = await request(app).get("/prices?type=irgendeinquatsch");

      expect(response.statusCode).deep.equal(500);
    });

  });

  describe("put", () => {
    it("does something", async () => {
      await request(app).put("/prices?cost=1111&type=puttest");
      const assertResponse = await request(app).get("/prices?type=puttest");
      expect(assertResponse.statusCode).equal(200);
      expect(assertResponse.body).deep.equal({cost: 1111});

      const putResponse = await request(app).put("/prices?cost=10&type=puttest");

      const testResponse = await request(app).get("/prices?type=puttest");

      expect(testResponse.statusCode).equal(200);
      expect(testResponse.body).deep.equal({cost: 10});

    });
  });


  describe("new feature", () => {
    it("irgendwas", async () => {
      var actualResult = await request(app).get("/prices?count=10&type=1jour");
      const expectedResult = {cost:350};
      expect(actualResult.body).deep.equal(expectedResult);
    });
  });
});
