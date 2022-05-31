import 'dotenv/config'
import bolt from '@slack/bolt';
import dayjs from 'dayjs';
import Airtable from 'airtable';

const { App, ExpressReceiver } = bolt;

const PORT = process.env.PORT || 3000;

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver
});

(async () => {
    await app.start(PORT);
    console.log(`trh-okr-bot running on port ${PORT}`);
})();

receiver.router.post("/slack/events", (req, res) => {
    if (req?.body?.challenge) res.send({ challenge });
});

receiver.router.get("/kok/*", async (req, res) => {
    try {
        const KOK_TRESHOLD = 5;
        var now = dayjs()
        if (req?.params[0] != '') {
            now = dayjs(req.params[0])
        }

        // TODO: Generer priors, gå gjennom alle måneder fra 1.1.2020
        const startOfLastMonth = now.subtract(1, 'month').startOf('month');
        const startOfLastMonthFormatted = startOfLastMonth.format('YYYY-MM-DD');
        const startOfThisMonth = now.startOf('month').subtract(1, 'second');
        // TODO: Paginer dersom mange poster...
        const history = await app.client.conversations.history({
            channel: process.env.KOMPIS_CHANNEL,
            limit: 100,
            oldest: startOfLastMonth.unix(),
            latest: startOfThisMonth.unix()
        });

        const datePrintPattern = 'YYYY-MM-DDTHH:mm:ss [Z]';
        console.log(`${history.messages.length} messages found in ${process.env.KOMPIS_CHANNEL} between ${startOfLastMonth.format(datePrintPattern)} and ${startOfThisMonth.format(datePrintPattern)}`);

        let numberOfPostsWithKok = 0;
        history.messages.forEach(message => {
            if (message.reply_users_count >= KOK_TRESHOLD) {
                numberOfPostsWithKok++;
            } else {
                const users = message.reactions?.flatMap((reaction) => reaction.users);
                const numberOfUniqueReactionUsers = new Set(users).size;
                if (numberOfUniqueReactionUsers >= KOK_TRESHOLD) {
                    numberOfPostsWithKok++;
                }
            }
        });

        const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE);
        base(process.env.AIRTABLE_TABLE).select({
            maxRecords: 1,
            filterByFormula: `IS_SAME({Måned}, DATETIME_PARSE("${startOfLastMonthFormatted}", "YYYY-MM-DD"))`
        }).firstPage((error, records) => {
            if (error) { console.error(error); res.send(error); return; }
            const record = {
                "Måned": startOfLastMonthFormatted,
                "Kok": numberOfPostsWithKok
            };
            if (records?.length === 1) {
                base(process.env.AIRTABLE_TABLE).update(records[0].id, record, error => {
                    if (error) { console.error(error); res.send(error); return; }
                });
                // TODO: oppdatere KR om ble kalt uten parametere
            } else {
                base(process.env.AIRTABLE_TABLE).create(record, error => {
                    if (error) { console.error(error); res.send(error); return; }
                });
            }
        });

        const result = `${numberOfPostsWithKok} posts with kok between ${startOfLastMonth.format(datePrintPattern)} and ${startOfThisMonth.format(datePrintPattern)}`;
        console.log(result);
        res.send(result);

    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
