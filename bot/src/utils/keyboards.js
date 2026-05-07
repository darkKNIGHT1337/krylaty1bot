/**
 * Клавиатуры (Inline Keyboard)
 * Все кнопки бота собираются здесь.
 */

const { Markup } = require('telegraf');
const content = require('../config/content');

/**
 * Главная клавиатура — 4 кнопки разделов + 2 ссылки внизу
 */
const mainKeyboard = () =>
  Markup.inlineKeyboard([
    // Ряд 1: Про приват | Копитрейдинг
    [
      Markup.button.callback(
        content.sections.about_private.buttonLabel,
        'section_about_private'
      ),
      Markup.button.callback(
        content.sections.copy_trading.buttonLabel,
        'section_copy_trading'
      ),
    ],
    // Ряд 2: Бесплатный видеоурок | Наш инструмент
    [
      Markup.button.callback(
        content.sections.free_lesson.buttonLabel,
        'section_free_lesson'
      ),
      Markup.button.callback(
        content.sections.our_tool.buttonLabel,
        'section_our_tool'
      ),
    ],
    // Ряд 3: Написать мне
    [Markup.button.url(content.links.dm.label, content.links.dm.url)],
    // Ряд 4: Отзывы
    [Markup.button.url(content.links.reviews.label, content.links.reviews.url)],
  ]);

/**
 * Клавиатура для страниц разделов — ссылка на видео + кнопка Назад
 * @param {string} videoUrl - ссылка на видео раздела
 */
const sectionKeyboard = (videoUrl) =>
  Markup.inlineKeyboard([
    [Markup.button.url(content.buttons.watchVideo, videoUrl)],
    [Markup.button.callback(content.buttons.back, 'back_to_main')],
  ]);

module.exports = { mainKeyboard, sectionKeyboard };
