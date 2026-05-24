const { backKeyboard, mainKeyboard } = require('../utils/keyboards');
const content = require('../config/content');

/**
 * Регистрация всех обработчиков кнопок
 */
const register = (bot) => {

  // ==================== ГЛАВНОЕ МЕНЮ ====================

  bot.hears('🔑 Приватный канал', async (ctx) => {
    try {
      await ctx.replyWithVideo(content.privateChannel.videoId, {
        caption: content.privateChannel.text,
        parse_mode: 'Markdown',
        reply_markup: backKeyboard().reply_markup
      });
    } catch (err) {
      await ctx.reply("Видео ещё не загружено. Скоро добавлю.");
    }
  });

  bot.hears('📊 Копитрейдинг', async (ctx) => {
    try {
      await ctx.replyWithVideo(content.copytrading.videoId, {
        caption: content.copytrading.text,
        parse_mode: 'Markdown',
        reply_markup: backKeyboard().reply_markup
      });
    } catch (err) {
      await ctx.reply("Видео ещё не загружено. Скоро добавлю.");
    }
  });

  bot.hears('📹 Бесплатный видео-урок', async (ctx) => {
    try {
      await ctx.replyWithVideo(content.freeLesson.videoId, {
        caption: content.freeLesson.text,
        parse_mode: 'Markdown',
        reply_markup: backKeyboard().reply_markup
      });
    } catch (err) {
      await ctx.reply("Видео ещё не загружено. Скоро добавлю.");
    }
  });

  bot.hears('💬 Отзывы', async (ctx) => {
    await ctx.reply(content.reviews.text, {
      parse_mode: 'Markdown',
      reply_markup: backKeyboard().reply_markup
    });
  });

  bot.hears('✍️ Написать мне', async (ctx) => {
    await ctx.reply('✍️ Напиши мне напрямую 👇\n\n@твой_юзернейм', {
      reply_markup: backKeyboard().reply_markup
    });
  });

  // ==================== КНОПКА НАЗАД ====================

  bot.hears('🔙 Назад в меню', async (ctx) => {
    await ctx.reply('🔄 Возвращаемся в главное меню...', {
      reply_markup: mainKeyboard().reply_markup
    });
  });

};

module.exports = { register };