export default () => ({
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379'),
  },
});
