import { registerDecorator, ValidationOptions } from 'class-validator';

export const isValidDays = (validationOption?: ValidationOptions) => {
  return (object, propertyName) => {
    registerDecorator({
      name: 'CountOfDays',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'Incorrect count of days',
        ...validationOption,
      },
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          // regex days - max 365
          const regex =
            /^(?:[1-9]\d?|[12]\d{2}|3[0-5]\d|36[0-5])$\/^(?:[1-9]\d?|[12]\d{2}|3[0-5]\d|36[0-5])$/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
};
