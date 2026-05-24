require('dotenv').config();
const { Telegraf } = require('telegraf');

const startCommand = require('./commands/start');
const buttonHandlers = require('./handlers/buttons');

const createBot = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  // === СУПЕР ЛОГИРОВАНИЕ ===
  bot.use((ctx, next) => {
    console.log(`\n=== НОВОЕ СООБЩЕНИЕ ===`);
    console.log('Тип:', ctx.updateType);
    
    if (ctx.message?.video_note) {
      console.log('🔥 НАЙДЕН VIDEO NOTE!');
      console.log('FILE_ID:', ctx.message.video_note.file_id);
      console.log('Длина:', ctx.message.video_note.file_id.length);
    }

    return next();
  });

  startCommand.register(bot);
  buttonHandlers.register(bot);

  // Автоприветствие
  bot.on('chat_member', async (ctx) => {
    const { chat, new_chat_member, old_chat_member } = ctx.chatMember;
    const CHANNEL_ID = -1003633991198; // ← замени

    if (chat.id !== CHANNEL_ID) return;

    if (new_chat_member.status === 'member' && ['left', 'kicked'].includes(old_chat_member.status)) {
      await startCommand.sendWelcome(ctx, new_chat_member.user);
    }
  });

  return bot;
};

module.exports = { createBot };