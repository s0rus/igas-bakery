import { AnyNode } from 'cheerio';

export type HtmlLike = string | AnyNode | AnyNode[] | Buffer;

export type RawBakeryStatus = {
  date: string;
  participantsString: string;
  resultString: string;
};

export type BakeryStatus = {
  bagels: number;
  baguettes: number;
  bageledOpponents: Record<string, number>;
  baguettedOpponents: Record<string, number>;
};

export type RawNextMatch = {
  tournament: string;
  opponent: string;
  round: string;
  startTime: string;
};
