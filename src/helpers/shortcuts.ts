export const resOK = (data: object) => ({
    status: 'ok',
    data
});

export const resNOK = (message: string) => ({
    status: 'nok',
    message
});
