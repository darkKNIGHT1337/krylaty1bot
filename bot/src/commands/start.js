const content = require('../config/content');
const { mainKeyboard } = require('../utils/keyboards');

const registerStartCommand = (bot) => {
  bot.start(async (ctx) => {
    try {
      // Удаляем предыдущие сообщения бота, чтобы было чисто
      if (ctx.message) {
        await ctx.deleteMessage().catch(() => {});
      }

      if (content.welcome.videoNoteId) {
        await ctx.sendVideoNote(
          content.welcome.videoNoteId,
          { reply_markup: mainKeyboard().reply_markup }
        );
      } else {
        await ctx.reply('👋 Главное меню', mainKeyboard());
      }
    } catch (error) {
      console.error('[START]', error.message);
    }
  });
};

module.exports = { registerStartCommand };