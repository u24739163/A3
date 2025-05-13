export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    await $fetch(body, {
        method: 'GET',
        headers: 
        {
            'Authorization': `Bearer ${config.strapiToken}`,
            'Content-Type': 'application/json'
        },
    });

})