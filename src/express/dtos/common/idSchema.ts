import { z } from 'zod';

export const idSchema = z.preprocess(
    (value) => Number(value),
    z.number({
        invalid_type_error: 'Id must be a number',
    }),
);