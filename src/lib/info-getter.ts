import { load } from 'cheerio';
import { SOURCE_URL } from './constants';
import { BakeryStatus, HtmlLike, RawBakeryStatus, RawNextMatch } from './types';

export async function getSourceHTML() {
  try {
    const req = await fetch(SOURCE_URL, {
      method: 'GET',
      cache: 'no-cache',
    });

    const html = await req.text();
    return html;
  } catch (error) {}
}

export function parseNextMatchInfo(html: HtmlLike) {
  const $ = load(html);
  const table = $('.result.gamedetail');

  const matches: RawNextMatch[] = [];

  table.find('tbody tr').each((_, row) => {
    const tournament = $(row).find('.first.noWrp.tl a').text().trim();
    const round = $(row).find('td[title]').text().trim() || 'R?';
    const startTime = $(row).find('.time.noWrp').text().trim();
    const participants = $(row).find('.t-name a').text().trim();
    const players = participants.split(' - ');
    const swiatekIndex = players.indexOf('Swiatek I.');

    const opponentIndex = swiatekIndex === 0 ? 1 : 0;
    const opponent = players[opponentIndex] || 'Waiting for opponent';

    if (tournament) {
      matches.push({ tournament, round, startTime, opponent });
    }
  });

  return matches;
}

export function getBakeryStats(html: HtmlLike) {
  const $ = load(html);
  const table = $('#matches-2024-1-data table.result.balance');

  const matches: RawBakeryStatus[] = [];

  table.find('tbody tr').each((_, row) => {
    const participantsString = $(row).find('.t-name').text().trim().replace(/\s+/g, ' ');

    if (participantsString.includes('Swiatek I.')) {
      const date = $(row).find('.first.time').text().trim();
      const resultString = $(row).find('.tl a').text().trim();

      matches.push({
        date,
        participantsString,
        resultString,
      });
    }
  });

  const bakery = matches.reduce<BakeryStatus>(
    (acc, v) => {
      const players = v.participantsString.split(' - ');
      const swiatekIndex = players.indexOf('Swiatek I.');

      if (swiatekIndex === -1) {
        return acc;
      }

      const opponentIndex = swiatekIndex === 0 ? 1 : 0;
      const opponentName = players[opponentIndex];

      const sets = v.resultString.split(', ');
      sets.forEach((set) => {
        const [, opponentGames] = set.split('-');
        if (opponentGames === '0') {
          acc.bagels++;
          acc.bageledOpponents[opponentName] = (acc.bageledOpponents[opponentName] || 0) + 1;
        } else if (opponentGames === '1') {
          acc.baguettes++;
          acc.baguettedOpponents[opponentName] = (acc.baguettedOpponents[opponentName] || 0) + 1;
        }
      });

      return acc;
    },
    {
      bagels: 0,
      baguettes: 0,
      bageledOpponents: {},
      baguettedOpponents: {},
    }
  );

  return bakery;
}
