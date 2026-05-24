const { mainKeyboard } = require('../utils/keyboards');
const content = require('../config/content');

const sendWelcome = async (ctx, user = null) => {
  const chatId = user ? user.id : ctx.from.id;

  try {
    await ctx.telegram.sendVideoNote(chatId, content.welcome.videoNoteId);
    
    await ctx.telegram.sendMessage(chatId, content.welcome.text, {
      parse_mode: 'Markdown',
      reply_markup: mainKeyboard().reply_markup
    });
  } catch (err) {
    console.error('Ошибка sendWelcome:', err.message);
    await ctx.telegram.sendMessage(chatId, "Ошибка загрузки приветствия. Попробуй /start");
  }
};

const register = (bot) => {
  bot.start(async (ctx) => {
    await sendWelcome(ctx);
  });
};

module.exports = {
  register,
  sendWelcome
};