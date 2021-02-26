import { Request as Req, Response as Res } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup';

class UserController {
    async create(req: Req, res: Res) {
        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json(error);
        }

        const userRepository = await getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({
                error: "User already exists!",
            });
        }

        const user = userRepository.create({
            name,
            email
        });

        await userRepository.save(user);

        return res.status(201).json(user);
    }
}

export { UserController };

/**
 *  // if (! await schema.isValid(req.body))
        //     return res.status(400).json({ error: "Validation failed!" });
-----------------------------------------------------------------------------
     const schema = yup.object().shape({
            name: yup.string().required("nome é obrigatório"),
            email: yup.string().email().required("email incorreto")
        });
 */