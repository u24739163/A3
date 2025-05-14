import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    try {
        return await $fetch(body, {
            method: 'GET',
            headers: 
            {
                'Authorization': `Bearer ${config.strapiToken}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: ('API call failed ' + error.message),
        });
    }
})