require('dotenv').config();
const { Telegraf } = require('telegraf');

const { registerStartCommand } = require('./commands/start');
const { registerButtonHandlers } = require('./handlers/buttons');
const { registerChannelJoinHandler } = require('./handlers/channelJoin');

const createBot = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.use((ctx, next) => {
    if (ctx.message?.video) {
      console.log('\n🔥 ОБЫЧНОЕ ВИДЕО ПОЛУЧЕНО!');
      console.log('FILE_ID:', ctx.message.video.file_id);
      console.log('Длина:', ctx.message.video.file_id.length);
      console.log('Размер:', ctx.message.video.file_size);
    }

    if (ctx.message?.video_note) {
      console.log('\n🔵 ВИДЕО-КРУЖОК ПОЛУЧЕН!');
      console.log('FILE_ID:', ctx.message.video_note.file_id);
    }

    if (ctx.callbackQuery) {
      console.log(`[CALLBACK] Нажата кнопка: ${ctx.callbackQuery.data}`);
    }

    return next();
  });

  registerStartCommand(bot);
  registerButtonHandlers(bot);
  registerChannelJoinHandler(bot);

  return bot;
};

module.exports = { createBot };