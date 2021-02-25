import req from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it('Should be able to create a new user', async () => {
       const respose = await req(app).post('/users').send({
            email: "ne@exemplo.com",
            name: "Usuario de testes"
        });

        expect(respose.status).toBe(201);
    });

    it('Should not be able to create a user with exists email', async () => {
        const respose = await req(app).post('/users').send({
            email: "ne@exemplo.com",
            name: "Usuario de testes"
        });

        expect(respose.status).toBe(400);
    });
});