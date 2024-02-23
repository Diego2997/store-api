import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  //data se define en el controlador cuando se utiliza el decorador @GetUser
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  if (!user) {
    throw new InternalServerErrorException('User not found');
  }
  return !data ? user : user[data];
});