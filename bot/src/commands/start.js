const { mainKeyboard } = require('../utils/keyboards');
const content = require('../config/content');

/**
 * Отправляет полное приветствие (видео-кружок + меню)
 */
const sendWelcome = async (ctx, user = null) => {
  const targetUserId = user ? user.id : ctx.from.id;

  try {
    // Отправляем видео-кружок
    await ctx.telegram.sendVideoNote(targetUserId, content.welcome.videoNoteId, {
      protect_content: false
    });

    // Отправляем текст + главное меню
    await ctx.telegram.sendMessage(targetUserId, content.welcome.text, {
      parse_mode: 'Markdown',
      reply_markup: mainKeyboard().reply_markup
    });

    console.log(`Приветствие отправлено пользователю ${targetUserId}`);
  } catch (err) {
    console.error('Ошибка sendWelcome:', err.message);
  }
};

/**
 * Регистрация команды /start
 */
const register = (bot) => {
  bot.start(async (ctx) => {
    await sendWelcome(ctx);
  });
};

module.exports = {
  register,
  sendWelcome
};