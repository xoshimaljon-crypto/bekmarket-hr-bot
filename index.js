const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("BOT_TOKEN topilmadi. Railway Variables ichiga BOT_TOKEN qo'shing.");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const employees = {
  "javohir": "KDV mahsulotlarini belgilangan qatorga terish va natijani guruhga yuborish.",
  "abdulatif": "Kassada odam ko‘payganda yordamga o‘tish va Benazir shirinliklar tartibini nazorat qilish.",
  "yaxyobek": "Kassa hisoboti, nasiyalar va Face ID tartibini nazorat qilish.",
  "gulbahor": "Tovar aylanishi, narx cheklarini tekshirish va hisobot yuborish."
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
`Assalomu alaykum. Men Bek Market HR yordamchi botiman.

Buyruqlar:
/vazifa ism
/qoidalar
/yordam`);
});

bot.onText(/\/vazifa (.+)/, (msg, match) => {
  const name = match[1].toLowerCase().trim();
  const task = employees[name];

  if (!task) {
    return bot.sendMessage(msg.chat.id, "Bu xodim bo‘yicha vazifa topilmadi. Ismni tekshirib qayta yozing.");
  }

  bot.sendMessage(msg.chat.id, `📌 ${match[1]} uchun vazifa:\n\n${task}`);
});

bot.onText(/\/qoidalar/, (msg) => {
  bot.sendMessage(msg.chat.id,
`Bek Market asosiy qoidalari:

1. Ishga kechikmaslik.
2. Face ID dan o‘tish majburiy.
3. Kassada kamomad bo‘lsa, tartib bo‘yicha qoplanadi.
4. Mijoz bilan hurmatli muomala qilish shart.
5. Topshiriq bajarilgach, "Topshiriq va bajarilgan ishlar" guruhiga hisobot yuboriladi.`);
});

bot.onText(/\/yordam/, (msg) => {
  bot.sendMessage(msg.chat.id,
`Foydalanish:

/vazifa javohir
/vazifa abdulatif
/vazifa yaxyobek
/vazifa gulbahor
/qoidalar`);
});

bot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;

  bot.sendMessage(msg.chat.id, "Savolingiz qabul qilindi. Hozircha /vazifa ism yoki /qoidalar buyrug‘idan foydalaning.");
});

console.log("Bek Market HR Bot ishga tushdi");
