/**
 * Инициализация и запуск Telegram-бота
 */

require('dotenv').config();
const { Telegraf } = require('telegraf');

const { registerStartCommand } = require('./commands/start');
const { registerButtonHandlers } = require('./handlers/buttons');

/**
 * Создаёт и настраивает экземпляр бота
 * @returns {import('telegraf').Telegraf}
 */
const createBot = () => {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    throw new Error('BOT_TOKEN не задан в файле .env');
  }

  const bot = new Telegraf(token);

  // ============================================================
  // Middleware: логирование входящих сообщений (при DEBUG=true)
  // ============================================================
  if (process.env.DEBUG === 'true') {
    bot.use(async (ctx, next) => {
      const type = ctx.updateType;
      const from = ctx.from?.username || ctx.from?.id || 'unknown';
      console.log(`[${new Date().toISOString()}] ${type} from @${from}`);

      // Полезно для получения file_id видео-кружков
      if (ctx.message?.video_note) {
        console.log('[DEBUG] Получен video_note, file_id:', ctx.message.video_note.file_id);
      }

      return next();
    });
  }

  // ============================================================
  // Регистрация команд и обработчиков
  // ============================================================
  registerStartCommand(bot);
  registerButtonHandlers(bot);

  // ============================================================
  // Обработка неизвестных команд
  // ============================================================
  bot.on('text', async (ctx) => {
    // Игнорируем команды — они обрабатываются выше
    if (ctx.message.text.startsWith('/')) return;

    // На любой другой текст — показываем главное меню
    const { mainKeyboard } = require('./utils/keyboards');
    const content = require('./config/content');
    await ctx.replyWithMarkdown(content.mainMenu.welcomeText, mainKeyboard());
  });

  // ============================================================
  // Глобальный обработчик ошибок
  // ============================================================
  bot.catch((err, ctx) => {
    console.error(`[BOT ERROR] Update ${ctx.updateType}:`, err.message);
  });

  return bot;
};

/**
 * Запускает бота в режиме polling или webhook
 * @param {import('telegraf').Telegraf} bot
 */
const startBot = (bot) => {
  const mode = process.env.BOT_MODE || 'polling';

  if (mode === 'webhook') {
    // ============================================================
    // WEBHOOK режим (для продакшена: Railway, Render, VPS)
    // ============================================================
    const webhookUrl = process.env.WEBHOOK_URL;
    const port = parseInt(process.env.WEBHOOK_PORT || '3000', 10);

    if (!webhookUrl) {
      throw new Error('WEBHOOK_URL не задан в .env при BOT_MODE=webhook');
    }

    // Запускаем без await — bot.launch() не резолвится при работе
    bot.launch({
      webhook: {
        domain: webhookUrl,
        port,
      },
    });

    console.log(`[BOT] Запущен в режиме webhook на порту ${port}`);
    console.log(`[BOT] Webhook URL: ${webhookUrl}`);

  } else {
    // ============================================================
    // POLLING режим (для локальной разработки)
    // ============================================================
    // Запускаем без await — bot.launch() держит event loop до остановки
    bot.launch();
    console.log('[BOT] Запущен в режиме polling (long polling)');
  }

  console.log('[BOT] Бот успешно запущен и готов к работе!');
};

module.exports = { createBot, startBot };
