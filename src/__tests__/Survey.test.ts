import request from "supertest";
import { app } from "../app";

import createConnection from '../database'

describe("Surveys", ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () =>{
        const response = await request(app).post("/surveys").send({
           title: "Title ex",
           description: "Description Example",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to create a new survey", async () =>{
      await request(app).get("/surveys").send({
           title: "Title ex",
           description: "Description Example",
        });

        const response = await request(app).get("/survets");

        expect(response.body.length).toBe(2);
    });

});