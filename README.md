# trh-okr

![Logo image](/img/trh-okr-bot-logo.png)

Bot++ for å skaffe tall til Trondheims-avdelingens OKR-er.

## Bruk

- [https://`host`/kok/](https://host/kok/) - henter antall poster på trh-kompetanse med kok forrige måned
- [https://`host`/kok/`YYYY-MM-DD`](https://host/kok/YYYY-MM-DD) - henter antall poster på trh-kompetanse med kok måneden før angitt dato

## Kjøremiljø

### Miljøvariabler

Boten trenger følgende miljøvariabler i miljøet for å kunne kjøre. Legg de i en `/.env`-fil for å kjøre lokalt.

- `SLACK_BOT_TOKEN` - Dette er boten, sett fra Slack Workspacet
- `SLACK_SIGNING_SECRET` - Unik streng som identifiserer appen
- `KOMPIS_CHANNEL` - Slack-kanalen boten skal lete etter kok i
- `AIRTABLE_BASE` - Airtable-base der nøkkelresultatene ligger
- `AIRTABLE_API_KEY` - API-nøkkel til Airtable-basen referert over
- `AIRTABLE_TABLE` - Tabellen i Airtable der nøkkelresultatene ligger