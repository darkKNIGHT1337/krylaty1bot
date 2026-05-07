/**
 * Обработчик команды /start
 * Отправляет видео-кружок (если задан) и главное меню с кнопками.
 */

const content = require('../config/content');
const { mainKeyboard } = require('../utils/keyboards');

/**
 * Регистрирует команду /start в боте
 * @param {import('telegraf').Telegraf} bot
 */
const registerStartCommand = (bot) => {
  bot.start(async (ctx) => {
    try {
      const userId = ctx.from?.id;
      const userName = ctx.from?.first_name || 'друг';

      if (process.env.DEBUG === 'true') {
        console.log(`[START] User: ${userId} (${userName})`);

        // Логируем входящее сообщение для отладки (полезно при получении file_id)
        if (ctx.message?.video_note) {
          console.log('[DEBUG] video_note file_id:', ctx.message.video_note.file_id);
        }
      }

      // ============================================================
      // ШАГ 1: ОТПРАВКА ВИДЕО-КРУЖКА
      // ============================================================
      // Если VIDEO_NOTE_FILE_ID задан в content.js — отправляем кружок
      // Если не задан — этот блок пропускается, сразу показывается меню
      // ============================================================
      if (content.VIDEO_NOTE_FILE_ID) {
        await ctx.sendVideoNote(content.VIDEO_NOTE_FILE_ID);
      }

      // ============================================================
      // ШАГ 2: ОТПРАВКА ГЛАВНОГО МЕНЮ
      // ============================================================
      await ctx.replyWithMarkdown(
        content.mainMenu.welcomeText,
        mainKeyboard()
      );

    } catch (error) {
      console.error('[ERROR] /start command:', error.message);
      await ctx.reply('Произошла ошибка. Попробуйте ещё раз через несколько секунд.');
    }
  });
};

module.exports = { registerStartCommand };
