export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT ? process.env.APP_PORT : '3000'),
  },
});
