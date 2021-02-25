import { Request as Req, Response as Res } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
class UserController {
    async create(req: Req, res: Res) {
        const { name, email } = req.body;

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
