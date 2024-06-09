import { z } from 'zod';

const urlSchema = z.object({
    slug: z.string()
    .trim()
    .min(1, 'Slug must be at least 1 character long')
    .refine(s => !s.includes(' '), 'Slug cannot contain spaces')
    .refine(s => s.length < 100, 'Slug must be less than 100 characters')
    .refine(s => s.length > 0, 'Slug must be at least 1 character long')
    .refine(s => /^[a-zA-Z0-9-_]*$/.test(s), 'Slug must only contain letters, numbers, dashes, and underscores'),
    url: z.string().url('URL must be a valid URL'),
});

export default urlSchema;