export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 8000,
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-chat',
  },
});
