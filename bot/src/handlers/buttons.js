/**
 * Обработчики нажатий на кнопки (Inline Keyboard Actions)
 */

const content = require('../config/content');
const { mainKeyboard, sectionKeyboard } = require('../utils/keyboards');

/**
 * Форматирует сообщение для раздела
 * @param {Object} section - объект раздела из content.js
 * @returns {string} отформатированный текст
 */
const formatSectionMessage = (section) => {
  return `${section.title}\n\n${section.description}`;
};

/**
 * Регистрирует все обработчики кнопок в боте
 * @param {import('telegraf').Telegraf} bot
 */
const registerButtonHandlers = (bot) => {

  // ============================================================
  // ОБРАБОТЧИКИ 4 ОСНОВНЫХ РАЗДЕЛОВ
  // ============================================================

  // Кнопка: Про приват
  bot.action('section_about_private', async (ctx) => {
    try {
      await ctx.answerCbQuery();
      const section = content.sections.about_private;
      await ctx.editMessageText(
        formatSectionMessage(section),
        {
          parse_mode: 'Markdown',
          ...sectionKeyboard(section.videoUrl),
        }
      );
    } catch (error) {
      console.error('[ERROR] section_about_private:', error.message);
    }
  });

  // Кнопка: Копитрейдинг
  bot.action('section_copy_trading', async (ctx) => {
    try {
      await ctx.answerCbQuery();
      const section = content.sections.copy_trading;
      await ctx.editMessageText(
        formatSectionMessage(section),
        {
          parse_mode: 'Markdown',
          ...sectionKeyboard(section.videoUrl),
        }
      );
    } catch (error) {
      console.error('[ERROR] section_copy_trading:', error.message);
    }
  });

  // Кнопка: Бесплатный видеоурок
  bot.action('section_free_lesson', async (ctx) => {
    try {
      await ctx.answerCbQuery();
      const section = content.sections.free_lesson;
      await ctx.editMessageText(
        formatSectionMessage(section),
        {
          parse_mode: 'Markdown',
          ...sectionKeyboard(section.videoUrl),
        }
      );
    } catch (error) {
      console.error('[ERROR] section_free_lesson:', error.message);
    }
  });

  // Кнопка: Наш инструмент
  bot.action('section_our_tool', async (ctx) => {
    try {
      await ctx.answerCbQuery();
      const section = content.sections.our_tool;
      await ctx.editMessageText(
        formatSectionMessage(section),
        {
          parse_mode: 'Markdown',
          ...sectionKeyboard(section.videoUrl),
        }
      );
    } catch (error) {
      console.error('[ERROR] section_our_tool:', error.message);
    }
  });

  // ============================================================
  // КНОПКА "НАЗАД" — возврат в главное меню
  // ============================================================
  bot.action('back_to_main', async (ctx) => {
    try {
      await ctx.answerCbQuery();
      await ctx.editMessageText(
        content.mainMenu.welcomeText,
        {
          parse_mode: 'Markdown',
          ...mainKeyboard(),
        }
      );
    } catch (error) {
      console.error('[ERROR] back_to_main:', error.message);
    }
  });

};

module.exports = { registerButtonHandlers };
