require('dotenv').config();
const { Telegraf } = require('telegraf');

const startCommand = require('./commands/start');
const buttonHandlers = require('./handlers/buttons');

const createBot = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  // Расширенное логирование
  bot.use((ctx, next) => {
    if (ctx.message?.video_note) {
      console.log('🔥 VIDEO_NOTE FILE_ID:', ctx.message.video_note.file_id);
    }
    return next();
  });

  // Регистрация
  startCommand.register(bot);
  buttonHandlers.register(bot);

  // Автоприветствие при подписке на канал
  bot.on('chat_member', async (ctx) => {
    const { chat, new_chat_member, old_chat_member } = ctx.chatMember;
    
    const CHANNEL_ID = -1003633991198; // ←←← ИЗМЕНИ НА ID КАНАЛА!!!

    if (chat.id !== CHANNEL_ID) return;

    if (new_chat_member.status === 'member' && 
        ['left', 'kicked'].includes(old_chat_member.status)) {
      
      const user = new_chat_member.user;
      console.log(`Новый подписчик: ${user.id} (${user.first_name})`);

      try {
        await startCommand.sendWelcome(ctx, user);
      } catch (err) {
        console.error('Ошибка автоприветствия:', err.message);
      }
    }
  });

  bot.catch((err) => console.error('Bot Error:', err));

  return bot;
};

module.exports = { createBot };