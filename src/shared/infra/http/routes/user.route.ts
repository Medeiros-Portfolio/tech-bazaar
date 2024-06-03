import { Router } from "express";
import { CreateUserController } from "../../../../modules/user-management/useCases/createUser/CreateUser.controller";
import { container } from "tsyringe";

const createUserController = container.resolve<CreateUserController>("CreateUserController")

const userRoutes = Router()

userRoutes.post("/", createUserController.handle.bind(createUserController))

export { userRoutes }