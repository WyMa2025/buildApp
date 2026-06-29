import {
  GROUPS,
  KNOCKOUT_MATCHES,
  RECENT_RESULTS,
  TOURNAMENT,
  UPCOMING_MATCHES,
  type Group,
  type Match,
} from "@/data/world-cup-2026";
import { normalizeTeamName } from "@/lib/team-names";

export type WorldCupPayload = {
  tournament: typeof TOURNAMENT & { updatedAt: string };
  results: Match[];
  live: Match[];
  upcoming: Match[];
  knockout: Match[];
  groups: Group[];
  source: "live" | "fallback";
  lastSyncedAt: string;
};

type ExternalMatch = {
  id: number;
  round: string;
  group: string;
  team1: string;
  team2: string;
  status: "finished" | "live" | "upcoming";
  score: [number, number] | null;
  live_minute: number | null;
  date: string;
  time: string;
  ground: string;
};

type ExternalStandings = Record<
  string,
  Array<{
    team: string;
    p: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
    pts: number;
  }>
>;

const API_BASE = "https://wcup2026.org/api/data.php";
const CACHE_TTL_MS = 15_000;

let cachedPayload: WorldCupPayload | null = null;
let cacheExpiresAt = 0;

function formatRound(round: string, group: string): string {
  if (group) {
    return `${group} · ${round}`;
  }
  return round;
}

function mapStatus(status: ExternalMatch["status"]): Match["status"] {
  if (status === "live") {
    return "live";
  }
  if (status === "finished") {
    return "finished";
  }
  return "scheduled";
}

function mapExternalMatch(match: ExternalMatch): Match {
  const mapped: Match = {
    id: String(match.id),
    date: match.date,
    time: match.time,
    home: normalizeTeamName(match.team1),
    away: normalizeTeamName(match.team2),
    round: formatRound(match.round, match.group),
    venue: match.ground,
    status: mapStatus(match.status),
  };

  if (match.score) {
    mapped.homeScore = match.score[0];
    mapped.awayScore = match.score[1];
  }

  if (match.status === "live" && match.live_minute !== null) {
    mapped.minute = match.live_minute;
  }

  return mapped;
}

function mapStandings(standings: ExternalStandings): Group[] {
  return Object.entries(standings).map(([groupName, teams]) => {
    const id = groupName.replace("Group ", "");
    const qualifiedCount = id.length === 1 ? 2 : 2;

    return {
      id,
      teams: teams.map((team, index) => ({
        name: normalizeTeamName(team.team),
        played: team.p,
        won: team.w,
        drawn: team.d,
        lost: team.l,
        goalsFor: team.gf,
        goalsAgainst: team.ga,
        points: team.pts,
        qualified: index < qualifiedCount,
      })),
    };
  });
}

function dedupeMatches(matches: Match[]): Match[] {
  const statusPriority: Record<Match["status"], number> = {
    live: 3,
    finished: 2,
    scheduled: 1,
  };
  const byId = new Map<string, Match>();

  for (const match of matches) {
    const existing = byId.get(match.id);
    if (
      !existing ||
      statusPriority[match.status] > statusPriority[existing.status]
    ) {
      byId.set(match.id, match);
    }
  }

  return [...byId.values()];
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function sortByDateDesc(matches: Match[]): Match[] {
  return [...matches].sort((a, b) => {
    const aTime = new Date(`${a.date}T12:00:00`).getTime();
    const bTime = new Date(`${b.date}T12:00:00`).getTime();
    return bTime - aTime;
  });
}

function sortByDateAsc(matches: Match[]): Match[] {
  return [...matches].sort((a, b) => {
    const aTime = new Date(`${a.date}T12:00:00`).getTime();
    const bTime = new Date(`${b.date}T12:00:00`).getTime();
    return aTime - bTime;
  });
}

function isKnockoutMatch(match: Match): boolean {
  return /round of|quarter|semi|final|third place/i.test(match.round);
}

async function fetchExternal<T>(action: string): Promise<T | null> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(`${API_BASE}?action=${action}`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; WorldCupApp/1.0)",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        await sleep(250 * (attempt + 1));
        continue;
      }

      const raw = await response.text();
      if (raw.startsWith("<!DOCTYPE") || raw.startsWith("<html")) {
        await sleep(250 * (attempt + 1));
        continue;
      }

      const data = JSON.parse(raw) as { ok: boolean };
      if (!data.ok) {
        return null;
      }

      return data as T;
    } catch {
      await sleep(250 * (attempt + 1));
    }
  }

  return null;
}

async function fetchLiveSources() {
  const resultsData = await fetchExternal<{ matches: ExternalMatch[] }>(
    "results",
  );
  await sleep(200);
  const todayData = await fetchExternal<{ matches: ExternalMatch[] }>("today");
  await sleep(200);
  const upcomingData = await fetchExternal<{ matches: ExternalMatch[] }>(
    "upcoming",
  );
  await sleep(200);
  const standingsData = await fetchExternal<{ standings: ExternalStandings }>(
    "standings",
  );

  return { resultsData, todayData, upcomingData, standingsData };
}

function matchKey(match: Match): string {
  const teams = [match.home, match.away].sort();
  return `${teams[0]}|${teams[1]}|${match.date}`;
}

function supplementSchedule(live: Match[], fallback: Match[]): Match[] {
  const covered = new Set(live.map(matchKey));
  const scheduledLive = live.filter((match) => match.status === "scheduled");
  const scheduledFallback = fallback.filter(
    (match) => match.status === "scheduled" && !covered.has(matchKey(match)),
  );

  return sortByDateAsc([...scheduledLive, ...scheduledFallback]);
}

function supplementKnockout(live: Match[], fallback: Match[]): Match[] {
  const covered = new Set(live.map(matchKey));
  const liveKnockout = live.filter(isKnockoutMatch);
  const fallbackKnockout = fallback.filter(
    (match) => !covered.has(matchKey(match)),
  );

  return sortByDateAsc(dedupeMatches([...liveKnockout, ...fallbackKnockout]));
}

function getFallbackPayload(): WorldCupPayload {
  return {
    tournament: {
      ...TOURNAMENT,
      updatedAt: new Date().toISOString(),
    },
    results: RECENT_RESULTS,
    live: [],
    upcoming: UPCOMING_MATCHES,
    knockout: KNOCKOUT_MATCHES,
    groups: GROUPS,
    source: "fallback",
    lastSyncedAt: new Date().toISOString(),
  };
}

export async function getWorldCupData(): Promise<WorldCupPayload> {
  if (cachedPayload && cacheExpiresAt > Date.now()) {
    return cachedPayload;
  }

  const { resultsData, todayData, upcomingData, standingsData } =
    await fetchLiveSources();

  if (!resultsData && !todayData && !upcomingData && !standingsData) {
    return getFallbackPayload();
  }

  const results = (resultsData?.matches ?? []).map(mapExternalMatch);
  const today = (todayData?.matches ?? []).map(mapExternalMatch);
  const upcoming = (upcomingData?.matches ?? []).map(mapExternalMatch);
  const allMatches = dedupeMatches([...results, ...today, ...upcoming]);
  const live = allMatches.filter((match) => match.status === "live");
  const finished = sortByDateDesc(
    allMatches.filter((match) => match.status === "finished"),
  );
  const scheduled = supplementSchedule(allMatches, UPCOMING_MATCHES);
  const knockout = supplementKnockout(allMatches, KNOCKOUT_MATCHES);
  const groups = standingsData?.standings
    ? mapStandings(standingsData.standings)
    : GROUPS;

  const liveStage =
    live.length > 0
      ? "Live now"
      : scheduled.some(isKnockoutMatch)
        ? "Round of 32"
        : TOURNAMENT.stage;

  const payload: WorldCupPayload = {
    tournament: {
      ...TOURNAMENT,
      stage: liveStage,
      updated: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      updatedAt: new Date().toISOString(),
    },
    results: finished,
    live,
    upcoming: scheduled,
    knockout,
    groups,
    source: "live",
    lastSyncedAt: new Date().toISOString(),
  };

  cachedPayload = payload;
  cacheExpiresAt = Date.now() + CACHE_TTL_MS;

  return payload;
}
