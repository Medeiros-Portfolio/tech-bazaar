import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  create(user: Prisma.UserCreateInput) : Promise<User>

  getById(id: number) : Promise<User>
  getUser(userQuery: Prisma.UserWhereInput): Promise<User>
  getUsers(userQuery: Prisma.UserFindManyArgs): Promise<User[]>

  update(email:string, user: Prisma.UserUpdateInput) : Promise<User>

  delete(email: string) : Promise<User>
}