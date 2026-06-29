export type MatchStatus = "finished" | "scheduled" | "live";

export type Match = {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  round: string;
  venue: string;
  status: MatchStatus;
};

export type GroupTeam = {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  qualified: boolean;
};

export type Group = {
  id: string;
  teams: GroupTeam[];
};

export const TOURNAMENT = {
  name: "FIFA World Cup 2026",
  host: "USA · Canada · Mexico",
  dates: "June 11 – July 19, 2026",
  stage: "Round of 32",
  updated: "June 29, 2026",
};

export const GROUPS: Group[] = [
  {
    id: "A",
    teams: [
      { name: "Mexico", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 0, points: 9, qualified: true },
      { name: "South Africa", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 4, qualified: true },
      { name: "South Korea", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 3, points: 3, qualified: false },
      { name: "Czech Republic", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 1, qualified: false },
    ],
  },
  {
    id: "B",
    teams: [
      { name: "Switzerland", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 3, points: 7, qualified: true },
      { name: "Canada", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 8, goalsAgainst: 3, points: 4, qualified: true },
      { name: "Bosnia and Herzegovina", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 6, points: 4, qualified: true },
      { name: "Qatar", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 10, points: 1, qualified: false },
    ],
  },
  {
    id: "C",
    teams: [
      { name: "Brazil", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 1, points: 7, qualified: true },
      { name: "Morocco", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 3, points: 7, qualified: true },
      { name: "Scotland", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 3, qualified: false },
      { name: "Haiti", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 8, points: 0, qualified: false },
    ],
  },
  {
    id: "D",
    teams: [
      { name: "United States", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 4, points: 6, qualified: true },
      { name: "Australia", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 4, qualified: true },
      { name: "Paraguay", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 4, points: 4, qualified: true },
      { name: "Turkey", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, points: 3, qualified: false },
    ],
  },
  {
    id: "E",
    teams: [
      { name: "Germany", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 10, goalsAgainst: 4, points: 6, qualified: true },
      { name: "Ivory Coast", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 2, points: 6, qualified: true },
      { name: "Ecuador", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 4, qualified: true },
      { name: "Curaçao", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 9, points: 1, qualified: false },
    ],
  },
  {
    id: "F",
    teams: [
      { name: "Netherlands", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 10, goalsAgainst: 4, points: 7, qualified: true },
      { name: "Japan", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 7, goalsAgainst: 3, points: 5, qualified: true },
      { name: "Sweden", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 7, goalsAgainst: 7, points: 4, qualified: true },
      { name: "Tunisia", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 12, points: 0, qualified: false },
    ],
  },
  {
    id: "G",
    teams: [
      { name: "Belgium", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 6, goalsAgainst: 2, points: 5, qualified: true },
      { name: "Egypt", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 5, goalsAgainst: 3, points: 5, qualified: true },
      { name: "Iran", played: 3, won: 0, drawn: 3, lost: 0, goalsFor: 3, goalsAgainst: 3, points: 3, qualified: false },
      { name: "New Zealand", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 4, goalsAgainst: 10, points: 1, qualified: false },
    ],
  },
  {
    id: "H",
    teams: [
      { name: "Spain", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 0, points: 7, qualified: true },
      { name: "Cape Verde", played: 3, won: 0, drawn: 3, lost: 0, goalsFor: 2, goalsAgainst: 2, points: 3, qualified: true },
      { name: "Uruguay", played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 3, goalsAgainst: 4, points: 2, qualified: false },
      { name: "Saudi Arabia", played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 1, goalsAgainst: 5, points: 2, qualified: false },
    ],
  },
  {
    id: "I",
    teams: [
      { name: "France", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 10, goalsAgainst: 2, points: 9, qualified: true },
      { name: "Norway", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 7, points: 6, qualified: true },
      { name: "Senegal", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 8, goalsAgainst: 6, points: 3, qualified: true },
      { name: "Iraq", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 12, points: 0, qualified: false },
    ],
  },
  {
    id: "J",
    teams: [
      { name: "Argentina", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 1, points: 9, qualified: true },
      { name: "Austria", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 6, goalsAgainst: 6, points: 4, qualified: true },
      { name: "Algeria", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 7, points: 4, qualified: true },
      { name: "Jordan", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 3, goalsAgainst: 8, points: 0, qualified: false },
    ],
  },
  {
    id: "K",
    teams: [
      { name: "Colombia", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 1, points: 7, qualified: true },
      { name: "Portugal", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 6, goalsAgainst: 1, points: 5, qualified: true },
      { name: "DR Congo", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 3, points: 4, qualified: true },
      { name: "Uzbekistan", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 11, points: 0, qualified: false },
    ],
  },
  {
    id: "L",
    teams: [
      { name: "England", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, points: 7, qualified: true },
      { name: "Croatia", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 5, points: 6, qualified: true },
      { name: "Ghana", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 4, qualified: true },
      { name: "Panama", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 0, goalsAgainst: 4, points: 0, qualified: false },
    ],
  },
];

export const KNOCKOUT_MATCHES: Match[] = [
  {
    id: "r32-1",
    date: "2026-06-28",
    time: "12:00 PT",
    home: "South Africa",
    away: "Canada",
    homeScore: 0,
    awayScore: 1,
    round: "Round of 32",
    venue: "SoFi Stadium, Los Angeles",
    status: "finished",
  },
  {
    id: "r32-2",
    date: "2026-06-29",
    time: "12:00 CT",
    home: "Brazil",
    away: "Japan",
    homeScore: 2,
    awayScore: 1,
    round: "Round of 32",
    venue: "NRG Stadium, Houston",
    status: "finished",
  },
  {
    id: "r32-3",
    date: "2026-06-29",
    time: "16:30 ET",
    home: "Germany",
    away: "Paraguay",
    round: "Round of 32",
    venue: "Gillette Stadium, Boston",
    status: "scheduled",
  },
  {
    id: "r32-4",
    date: "2026-06-29",
    time: "21:00 CT",
    home: "Netherlands",
    away: "Morocco",
    round: "Round of 32",
    venue: "Estadio BBVA, Monterrey",
    status: "scheduled",
  },
  {
    id: "r32-5",
    date: "2026-06-30",
    time: "13:00 CT",
    home: "Ivory Coast",
    away: "Norway",
    round: "Round of 32",
    venue: "AT&T Stadium, Dallas",
    status: "scheduled",
  },
  {
    id: "r32-6",
    date: "2026-06-30",
    time: "17:00 ET",
    home: "France",
    away: "Sweden",
    round: "Round of 32",
    venue: "MetLife Stadium, New York",
    status: "scheduled",
  },
  {
    id: "r32-7",
    date: "2026-06-30",
    time: "21:00 CT",
    home: "Mexico",
    away: "Ecuador",
    round: "Round of 32",
    venue: "Estadio Azteca, Mexico City",
    status: "scheduled",
  },
  {
    id: "r32-8",
    date: "2026-07-01",
    time: "12:00 ET",
    home: "England",
    away: "DR Congo",
    round: "Round of 32",
    venue: "Mercedes-Benz Stadium, Atlanta",
    status: "scheduled",
  },
  {
    id: "r32-9",
    date: "2026-07-01",
    time: "16:00 PT",
    home: "Belgium",
    away: "Senegal",
    round: "Round of 32",
    venue: "Levi's Stadium, San Francisco",
    status: "scheduled",
  },
  {
    id: "r32-10",
    date: "2026-07-01",
    time: "20:00 PT",
    home: "United States",
    away: "Bosnia and Herzegovina",
    round: "Round of 32",
    venue: "Lumen Field, Seattle",
    status: "scheduled",
  },
  {
    id: "r32-11",
    date: "2026-07-02",
    time: "12:00 PT",
    home: "Spain",
    away: "Austria",
    round: "Round of 32",
    venue: "SoFi Stadium, Los Angeles",
    status: "scheduled",
  },
  {
    id: "r32-12",
    date: "2026-07-02",
    time: "16:00 PT",
    home: "Portugal",
    away: "Croatia",
    round: "Round of 32",
    venue: "SoFi Stadium, Los Angeles",
    status: "scheduled",
  },
  {
    id: "r32-13",
    date: "2026-07-02",
    time: "20:00 PT",
    home: "Switzerland",
    away: "Algeria",
    round: "Round of 32",
    venue: "BC Place, Vancouver",
    status: "scheduled",
  },
  {
    id: "r32-14",
    date: "2026-07-03",
    time: "13:00 CT",
    home: "Australia",
    away: "Egypt",
    round: "Round of 32",
    venue: "Arrowhead Stadium, Kansas City",
    status: "scheduled",
  },
  {
    id: "r32-15",
    date: "2026-07-03",
    time: "17:00 CT",
    home: "Argentina",
    away: "Cape Verde",
    round: "Round of 32",
    venue: "AT&T Stadium, Dallas",
    status: "scheduled",
  },
  {
    id: "r32-16",
    date: "2026-07-03",
    time: "21:00 CT",
    home: "Colombia",
    away: "Ghana",
    round: "Round of 32",
    venue: "Arrowhead Stadium, Kansas City",
    status: "scheduled",
  },
];

export const RECENT_RESULTS: Match[] = [
  ...KNOCKOUT_MATCHES.filter((match) => match.status === "finished"),
  {
    id: "gs-1",
    date: "2026-06-27",
    time: "22:00 CT",
    home: "Argentina",
    away: "Jordan",
    homeScore: 3,
    awayScore: 0,
    round: "Group J · Matchday 3",
    venue: "AT&T Stadium, Dallas",
    status: "finished",
  },
  {
    id: "gs-2",
    date: "2026-06-27",
    time: "19:30 ET",
    home: "Portugal",
    away: "Colombia",
    homeScore: 1,
    awayScore: 1,
    round: "Group K · Matchday 3",
    venue: "Hard Rock Stadium, Miami",
    status: "finished",
  },
  {
    id: "gs-3",
    date: "2026-06-27",
    time: "17:00 ET",
    home: "England",
    away: "Panama",
    homeScore: 2,
    awayScore: 0,
    round: "Group L · Matchday 3",
    venue: "MetLife Stadium, New York",
    status: "finished",
  },
  {
    id: "gs-4",
    date: "2026-06-26",
    time: "20:00 ET",
    home: "France",
    away: "Norway",
    homeScore: 4,
    awayScore: 1,
    round: "Group I · Matchday 3",
    venue: "Gillette Stadium, Boston",
    status: "finished",
  },
  {
    id: "gs-5",
    date: "2026-06-24",
    time: "19:00 CT",
    home: "Mexico",
    away: "Czech Republic",
    homeScore: 3,
    awayScore: 0,
    round: "Group A · Matchday 3",
    venue: "Estadio Azteca, Mexico City",
    status: "finished",
  },
];

export const UPCOMING_MATCHES = KNOCKOUT_MATCHES.filter(
  (match) => match.status === "scheduled",
);
