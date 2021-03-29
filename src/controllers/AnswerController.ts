import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController{

    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            return response.status(400).json({
                error: "Survey User does not exists!"
            });
        }
            surveyUser.value = Number(value);
            
            await surveysUsersRepository.save(surveyUser);

            return response.json(surveyUser);
    }
}

export { AnswerController }