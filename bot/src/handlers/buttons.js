const { backKeyboard, mainKeyboard } = require('../utils/keyboards');
const content = require('../config/content');

const register = (bot) => {

  bot.hears('🔑 Приватный канал', async (ctx) => {
    await ctx.replyWithVideo(content.privateChannel.videoId, {
      caption: content.privateChannel.text,
      parse_mode: 'Markdown',
      reply_markup: backKeyboard().reply_markup
    }).catch(() => ctx.reply("Видео скоро будет добавлено"));
  });

  bot.hears('📊 Копитрейдинг', async (ctx) => {
    await ctx.replyWithVideo(content.copytrading.videoId, {
      caption: content.copytrading.text,
      parse_mode: 'Markdown',
      reply_markup: backKeyboard().reply_markup
    }).catch(() => ctx.reply("Видео скоро будет добавлено"));
  });

  bot.hears('📹 Бесплатный видео-урок', async (ctx) => {
    await ctx.replyWithVideo(content.freeLesson.videoId, {
      caption: content.freeLesson.text,
      parse_mode: 'Markdown',
      reply_markup: backKeyboard().reply_markup
    }).catch(() => ctx.reply("Видео скоро будет добавлено"));
  });

  bot.hears('💬 Отзывы', async (ctx) => {
    await ctx.reply(content.reviews.text, {
      parse_mode: 'Markdown',
      reply_markup: backKeyboard().reply_markup
    });
  });

  bot.hears('✍️ Написать мне', async (ctx) => {
    await ctx.reply('Напиши мне напрямую:\n\n@твой_юзернейм', {
      reply_markup: backKeyboard().reply_markup
    });
  });

  bot.hears('🔙 Назад в меню', async (ctx) => {
    await ctx.reply('Главное меню:', {
      reply_markup: mainKeyboard().reply_markup
    });
  });
};

module.exports = { register };