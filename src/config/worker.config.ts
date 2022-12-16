export default () => ({
  worker: {
    port: parseInt(process.env.WORKER_PORT ? process.env.WORKER_PORT : '3001'),
  },
});
