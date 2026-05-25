// bot/src/handlers/channelJoin.js

const content = require('../config/content');
const { mainKeyboard } = require('../utils/keyboards');

const CHANNEL_ID = -1003514446429; // ←←← ИЗМЕНИ НА РЕАЛЬНЫЙ ID КАНАЛА !!

const sendWelcomeToNewMember = async (ctx, user) => {
    try {
        console.log(`[CHANNEL JOIN] → Отправляем приветствие пользователю ${user.id} (@${user.username || 'no_username'})`);

        if (content.welcome?.videoNoteId) {
            await ctx.sendVideoNote(content.welcome.videoNoteId, {
                reply_markup: mainKeyboard().reply_markup
            });
        } else {
            await ctx.reply('👋 Добро пожаловать в канал!\n\nНажми кнопку ниже для главного меню:', mainKeyboard());
        }
    } catch (error) {
        console.error('[CHANNEL JOIN] Ошибка отправки сообщения:', error.message);
    }
};

const registerChannelJoinHandler = (bot) => {
    bot.on('chat_member', async (ctx) => {
        try {
            const { chat, from, old_chat_member, new_chat_member } = ctx.update.chat_member;

            if (chat.id !== CHANNEL_ID) return;

            const joined = 
                (old_chat_member.status === 'left' || old_chat_member.status === 'kicked') &&
                (new_chat_member.status === 'member' || new_chat_member.status === 'administrator');

            if (joined) {
                console.log(`✅ ЗАФИКСИРОВАНО ВСТУПЛЕНИЕ: ${from.id}`);
                await sendWelcomeToNewMember(ctx, from);
            }
        } catch (error) {
            console.error('❌ Ошибка channelJoin:', error.message);
        }
    });

    console.log(`[CHANNEL JOIN] Обработчик запущен для канала ${CHANNEL_ID}`);
};

module.exports = { registerChannelJoinHandler };