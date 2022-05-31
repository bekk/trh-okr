# trh-okr

![Logo image](/img/trh-okr-bot-logo.png)

Bot++ for å skaffe tall til Trondheims-avdelingens OKR-er.

## Bruk

- [https://bekk-trh-okr-bot.herokuapp.com/kok/](https://bekk-trh-okr-bot.herokuapp.com/kok/) - henter antall poster på trh-kompetanse med kok forrige måned
- [https://bekk-trh-okr-bot.herokuapp.com/kok/`YYYY-MM-DD`](https://bekk-trh-okr-bot.herokuapp.com/kok/YYYY-MM-DD) - henter antall poster på trh-kompetanse med kok måneden før angitt dato

## Kjøremiljø



### Miljøvariabler

Boten trenger følgende miljøvariabler i miljøet for å kunne kjøre. Legg de i en `/.env`-fil for å kjøre lokalt.

- `SLACK_BOT_TOKEN` - Dette er boten, sett fra Slack Workspacet
- `SLACK_SIGNING_SECRET` - Unik streng som identifiserer appen
- `KOMPIS_CHANNEL` - Slack-kanalen boten skal lete etter kok i
- `AIRTABLE_BASE` - Airtable-base der nøkkelresultatene ligger
- `AIRTABLE_API_KEY` - API-nøkkel til Airtable-basen referert over
- `AIRTABLE_TABLE` - Tabellen i Airtable der nøkkelresultatene ligger
- `KEY_RESULT_RECORD_ID` - Id-en til det nøkkelresultatet som skal beveges
- `KEY_RESULT_CURRENT_VALUE` - Navnet på den kollonnen der dagens verdi av nøkkelresultatet er lagret
