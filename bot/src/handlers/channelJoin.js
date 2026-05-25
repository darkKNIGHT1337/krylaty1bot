const { sendWelcome } = require('../commands/start');

const registerChannelJoinHandler = (bot) => {
    
    bot.on('chat_member', async (ctx) => {
        const { chat, from, old_chat_member, new_chat_member } = ctx.update.chat_member;

        // Проверяем, что это наш канал
        if (chat.type !== 'channel') return;

        // Проверяем, что пользователь только что вступил
        const wasNotMember = old_chat_member.status === 'left' || 
                            old_chat_member.status === 'kicked';
        
        const isNowMember = new_chat_member.status === 'member' || 
                           new_chat_member.status === 'administrator';

        if (wasNotMember && isNowMember) {
            console.log(`[CHANNEL JOIN] Новый пользователь @${from.username || from.id} зашёл в канал`);

            try {
                // Отправляем точно такое же приветствие, как при /start
                await sendWelcome(ctx, from);
            } catch (err) {
                console.error('Ошибка отправки приветствия новому участнику:', err.message);
            }
        }
    });
};

module.exports = { registerChannelJoinHandler };