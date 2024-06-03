import { PrismaClient } from "@prisma/client";
import { container, delay } from "tsyringe";
import { UserRepository } from "../../modules/user-management/repositories/UserRepository";
import { CreateUserUseCase } from "../../modules/user-management/useCases/createUser/CreateUser.useCase";
import { CreateUserController } from "../../modules/user-management/useCases/createUser/CreateUser.controller";
import { IUserRepository } from "../../modules/user-management/interfaces/IUserRepository";

container.register<PrismaClient>("PrismaClient", {
  useValue: new PrismaClient()
})

container.register<IUserRepository>("UserRepository", {
  useClass: UserRepository
})

container.register<CreateUserUseCase>("CreateUserUseCase", {
  useClass: CreateUserUseCase
})

container.register<CreateUserController>("CreateUserController", {
  useClass: CreateUserController
})