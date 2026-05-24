/**
 * Клавиатуры для бота
 */

const { Markup } = require('telegraf');

// Главное меню
const mainKeyboard = () => {
  return Markup.keyboard([
    ['🔑 Приватный канал'],
    ['📊 Копитрейдинг'],
    ['📹 Бесплатный видео-урок'],
    ['💬 Отзывы'],
    ['✍️ Написать мне']
  ]).resize(true);
};

// Кнопка "Назад" в разделах
const backKeyboard = () => {
  return Markup.keyboard([['🔙 Назад в меню']]).resize(true);
};

module.exports = {
  mainKeyboard,
  backKeyboard
};