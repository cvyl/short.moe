import { z } from 'zod';

const anonUrl = z.object({
    url: z.string().url('URL must be a valid URL'),
});

export default anonUrl;