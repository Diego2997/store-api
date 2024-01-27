import * as Joi from 'joi';
const validateConfiguration = Joi.object({
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.number().required(),
  POSTGRES_PORT: Joi.number().required(),
});

export default validateConfiguration;
