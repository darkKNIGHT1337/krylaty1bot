const { Markup } = require('telegraf');

const mainKeyboard = () => Markup.keyboard([
  ['🔑 Приватный канал'],
  ['📊 Копитрейдинг'],
  ['📹 Бесплатный видео-урок'],
  ['💬 Отзывы'],
  ['✍️ Написать мне']
]).resize(true);

const backKeyboard = () => Markup.keyboard([['🔙 Назад в меню']]).resize(true);

module.exports = { mainKeyboard, backKeyboard };