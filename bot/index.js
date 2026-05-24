require('dotenv').config();
const { createBot } = require('./src/bot');

console.log('[BOT] Инициализация бота...');

const bot = createBot();

bot.launch()
  .then(() => {
    console.log('[BOT] Бот успешно запущен и готов к работе!');
  })
  .catch((err) => {
    console.error('[BOT] Ошибка запуска:', err);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));