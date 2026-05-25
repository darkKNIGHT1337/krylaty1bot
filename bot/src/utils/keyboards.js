const { Markup } = require('telegraf');

const mainKeyboard = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('💎 Про приват', 'video_private'),
      Markup.button.callback('📊 Копитрейдинг', 'video_copy')
    ],
    [
      Markup.button.callback('🔑 Бесплатный видеоурок', 'video_lesson')
    ],
    [Markup.button.url('💬 Отзывы', 'https://t.me/krylaty_otzyv')],
    [Markup.button.url('✉️ Написать мне', 'https://t.me/krylaty_tyt')]
  ]);
};

const backKeyboard = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('← Назад в меню', 'back_to_main')]
  ]);
};

module.exports = { mainKeyboard, backKeyboard };