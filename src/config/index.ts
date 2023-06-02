export default () => ({
    port: process.env.PORT || 8085,
    api: {
        name: process.env.API_NAME || 'API Rest Test BB Digital',
        description: process.env.API_DESCRIPTION || 'Desarrollador Omar Isalgue Begue',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'token_test',
        expireIn: '30m',
    },
});
