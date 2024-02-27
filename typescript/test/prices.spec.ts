import {assert, expect} from 'chai';
import request from 'supertest-as-promised';
import {createApp} from "../src/prices"

describe('prices', () => {

    let app, connection

    beforeEach(async () => {
        ({app, connection} = await createApp());
    });

    afterEach(async () => {
        await connection.end()
    });

    it('does something', async () => {

        const response = await request(app)
            .get('/prices?type=1jour')

        var expectedResult = {cost: 35} // change this to make the test pass
        expect(response.body).deep.equal(expectedResult)
    });

    [{age: 5, expected: 0}].forEach((testCase) => {
        it(`Some kids are free`, async () => {

            const response = await request(app)
                .get(`/prices?age=${testCase.age}`)

            var expectedResult = {cost: testCase.expected}
            expect(response.body).deep.equal(expectedResult)
        });
    });

    [
        {age: 21, date: "2019-02-18", type: "1jour", expected: 35}
    ].forEach((testCase) => {
        it(`cover 39-44`, async () => {

            const response = await request(app)
                .get(`/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`)

            var expectedResult = {cost: testCase.expected}
            expect(response.body).deep.equal(expectedResult)
        });
    });

    [
        {age: 21, date: "2024-02-26", type: "1jour", expected: 23}
    ].forEach((testCase) => {
        it(`cover 51, Mondays seem to be reduced by 35%`, async () => {

            const response = await request(app)
                .get(`/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`)

            var expectedResult = {cost: testCase.expected}
            expect(response.body).deep.equal(expectedResult)
        });
    });

    [
        {age: 14, date: "2024-02-26", type: "1jour", expected: 25}
    ].forEach((testCase) => {
        it(`cover 56, some kids do have to pay`, async () => {

            const response = await request(app)
                .get(`/prices?age=${testCase.age}&date=${testCase.date}&type=${testCase.type}`)

            var expectedResult = {cost: testCase.expected}
            expect(response.body).deep.equal(expectedResult)
        });
    });

});
