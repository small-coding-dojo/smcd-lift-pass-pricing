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

});
