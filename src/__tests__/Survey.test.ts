import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        //await connection.runMigrations(); // erro não rodava os testes 
    });

    it('Should be able to create a new survey', async () => {
        const respose = await request(app).post('/surveys').send({
            title: "Exemplo",
            description: "Exemplo description ..."
        });

        expect(respose.status).toBe(201);
        expect(respose.body).toHaveProperty("id");
    });

    it('Should be able to get all surveys', async () => {
        await request(app).post('/surveys').send({
            title: "Exemplo2",
            description: "Exemplo2 description2 ..."
        });

        const response = await request(app).get('/surveys');

        expect(response.body.length).toBe(2);
    });
});