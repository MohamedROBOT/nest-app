import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../common';

export const Public = (val = true) => SetMetadata(IS_PUBLIC_KEY, val);
