/**
 * Инициализация Telegram-бота
 */

require('dotenv').config();
const { Telegraf } = require('telegraf');

const { registerStartCommand } = require('./commands/start');
const { registerButtonHandlers } = require('./handlers/buttons');
const { registerChannelJoinHandler } = require('./handlers/channelJoin'); // ← важно

/**
 * Создаёт и настраивает бота
 */
const createBot = () => {
    const token = process.env.BOT_TOKEN;

    if (!token) {
        throw new Error('BOT_TOKEN не задан в .env файле!');
    }

    const bot = new Telegraf(token);

    // Логирование (если DEBUG=true)
    if (process.env.DEBUG === 'true') {
        bot.use(async (ctx, next) => {
            console.log(`[${new Date().toISOString()}] ${ctx.updateType}`);
            return next();
        });
    }

    // Регистрация обработчиков
    registerStartCommand(bot);
    registerButtonHandlers(bot);
    registerChannelJoinHandler(bot);     // ← обработчик вступления в канал

    // Обработка обычных текстовых сообщений
    bot.on('text', async (ctx) => {
        if (ctx.message.text.startsWith('/')) return;
        const content = require('./config/content');
        const { mainKeyboard } = require('./utils/keyboards');
        await ctx.replyWithMarkdown(content.mainMenu.welcomeText, mainKeyboard());
    });

    return bot;
};

module.exports = { createBot };