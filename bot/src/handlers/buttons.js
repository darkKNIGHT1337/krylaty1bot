const content = require('../config/content');
const { mainKeyboard, backKeyboard } = require('../utils/keyboards');
const { Markup } = require('telegraf');   // ← добавили эту строку

const registerButtonHandlers = (bot) => {

  console.log('[BUTTONS] Stable version with Reviews');

  bot.action('video_private', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithVideo(content.videos.privateChannel.fileId, {
      caption: '',
      reply_markup: backKeyboard().reply_markup
    });
    await ctx.deleteMessage().catch(() => {});
  });

  bot.action('video_copy', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithVideo(content.videos.copytrading.fileId, {
      caption: '',
      reply_markup: backKeyboard().reply_markup
    });
    await ctx.deleteMessage().catch(() => {});
  });

  bot.action('video_lesson', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithVideo(content.videos.freeLesson.fileId, {
      caption: '',
      reply_markup: backKeyboard().reply_markup
    });
    await ctx.deleteMessage().catch(() => {});
  });

  // Отзывы — исправленная версия
  bot.action('reviews', async (ctx) => {
    await ctx.answerCbQuery();
    
    await ctx.reply('💬 Отзывы наших учеников:', {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.url('📖 Посмотреть все отзывы', content.reviewsUrl)],
        [Markup.button.callback('← Назад в меню', 'back_to_main')]
      ]).reply_markup
    });

    await ctx.deleteMessage().catch(() => {});
  });

  bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage().catch(() => {});

    await ctx.replyWithVideoNote(
      content.welcome.videoNoteId,
      { reply_markup: mainKeyboard().reply_markup }
    );
  });
};

module.exports = { registerButtonHandlers };