import { z } from 'zod';

const urlSchema = z.object({
    slug: z.string().min(1, 'Slug must be at least 1 character long'),
    url: z.string().url('URL must be a valid URL'),
});

export default urlSchema;