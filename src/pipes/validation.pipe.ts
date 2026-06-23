import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly zodSchema: ZodSchema) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    console.log(value);
    try {
      const parsedValue = await this.zodSchema.parseAsync(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path[0],
        }));

        throw new BadRequestException({
          message: 'Validation Error',
          errors,
        });
      }
    }
  }
}
