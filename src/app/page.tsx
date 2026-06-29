"use client";

import { useMemo, useState } from "react";
import type { Group, Match } from "@/data/world-cup-2026";
import { useWorldCupData } from "@/hooks/useWorldCupData";
import { getFlag } from "@/lib/flags";
import styles from "./page.module.css";

type Tab = "results" | "groups" | "knockout" | "schedule";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "results", label: "Results", icon: "⚽" },
  { id: "groups", label: "Groups", icon: "📊" },
  { id: "knockout", label: "Knockout", icon: "🏆" },
  { id: "schedule", label: "Schedule", icon: "📅" },
];

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatUpdatedAt(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function MatchCard({ match }: { match: Match }) {
  const finished = match.status === "finished";
  const live = match.status === "live";
  const winnerHome =
    finished && match.homeScore !== undefined && match.awayScore !== undefined
      ? match.homeScore > match.awayScore
      : false;
  const winnerAway =
    finished && match.homeScore !== undefined && match.awayScore !== undefined
      ? match.awayScore > match.homeScore
      : false;

  return (
    <article
      className={`${styles.matchCard} ${live ? styles.matchCardLive : ""}`}
    >
      <div className={styles.matchMeta}>
        <span>{formatDate(match.date)}</span>
        <span>{match.time}</span>
      </div>
      <p className={styles.matchRound}>{match.round}</p>
      <div className={styles.matchTeams}>
        <div className={`${styles.teamRow} ${winnerHome ? styles.winner : ""}`}>
          <span className={styles.flag}>{getFlag(match.home)}</span>
          <span className={styles.teamName}>{match.home}</span>
          {finished || live ? (
            <span className={styles.score}>{match.homeScore ?? 0}</span>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>
        <div className={`${styles.teamRow} ${winnerAway ? styles.winner : ""}`}>
          <span className={styles.flag}>{getFlag(match.away)}</span>
          <span className={styles.teamName}>{match.away}</span>
          {finished || live ? (
            <span className={styles.score}>{match.awayScore ?? 0}</span>
          ) : null}
        </div>
      </div>
      <p className={styles.venue}>{match.venue}</p>
      {live ? (
        <span className={`${styles.badge} ${styles.badgeLive}`}>
          Live {match.minute ? `${match.minute}'` : ""}
        </span>
      ) : null}
      {!finished && !live ? (
        <span className={styles.badge}>Upcoming</span>
      ) : null}
    </article>
  );
}

function ResultsView({
  results,
  live,
}: {
  results: Match[];
  live: Match[];
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Latest Results</h2>
        <p>Auto-updating match scores</p>
      </div>

      {live.length > 0 ? (
        <>
          <h4 className={styles.subheading}>Live now</h4>
          <div className={styles.matchList}>
            {live.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </>
      ) : null}

      <div className={styles.matchList}>
        {results.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}

function GroupsView({ groups }: { groups: Group[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Group Standings</h2>
        <p>Updated from live tournament data</p>
      </div>
      <div className={styles.groupGrid}>
        {groups.map((group) => (
          <article key={group.id} className={styles.groupCard}>
            <h3>Group {group.id}</h3>
            <div className={styles.table}>
              <div className={`${styles.tableRow} ${styles.tableHead}`}>
                <span>#</span>
                <span>Team</span>
                <span>P</span>
                <span>GD</span>
                <span>Pts</span>
              </div>
              {group.teams.map((team, index) => (
                <div
                  key={team.name}
                  className={`${styles.tableRow} ${team.qualified ? styles.qualified : ""}`}
                >
                  <span>{index + 1}</span>
                  <span className={styles.tableTeam}>
                    <span>{getFlag(team.name)}</span>
                    {team.name}
                  </span>
                  <span>{team.played}</span>
                  <span>
                    {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}
                    {team.goalsFor - team.goalsAgainst}
                  </span>
                  <span className={styles.points}>{team.points}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function KnockoutView({ matches }: { matches: Match[] }) {
  const finished = matches.filter((match) => match.status === "finished");
  const live = matches.filter((match) => match.status === "live");
  const upcoming = matches.filter((match) => match.status === "scheduled");

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Round of 32</h2>
        <p>Knockout stage bracket</p>
      </div>

      {live.length > 0 ? (
        <>
          <h4 className={styles.subheading}>Live now</h4>
          <div className={styles.matchList}>
            {live.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </>
      ) : null}

      {finished.length > 0 ? (
        <>
          <h4 className={styles.subheading}>Completed</h4>
          <div className={styles.matchList}>
            {finished.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </>
      ) : null}

      <h4 className={styles.subheading}>Still to play</h4>
      <div className={styles.matchList}>
        {upcoming.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}

function ScheduleView({ matches }: { matches: Match[] }) {
  const grouped = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const match of matches) {
      const existing = map.get(match.date) ?? [];
      existing.push(match);
      map.set(match.date, existing);
    }
    return [...map.entries()];
  }, [matches]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Upcoming Matches</h2>
        <p>Knockout stage schedule</p>
      </div>
      {grouped.map(([date, dayMatches]) => (
        <div key={date} className={styles.dayBlock}>
          <h3 className={styles.dayHeading}>{formatDate(date)}</h3>
          <div className={styles.matchList}>
            {dayMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function Home() {
  const [tab, setTab] = useState<Tab>("results");
  const { data, loading, error, refresh } = useWorldCupData();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.trophy}>🏆</span>
          <div>
            <p className={styles.kicker}>FIFA World Cup</p>
            <h1>2026 Results</h1>
          </div>
          {data?.live.length ? (
            <span className={styles.livePill}>Live</span>
          ) : null}
        </div>
        <p className={styles.subtitle}>
          {data?.tournament.host ?? "USA · Canada · Mexico"}
        </p>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {data?.tournament.stage ?? "Round of 32"}
            </span>
            <span className={styles.statLabel}>Current stage</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {data?.live.length ?? 0}
            </span>
            <span className={styles.statLabel}>Live matches</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {data?.source === "live" ? "Live" : "Cached"}
            </span>
            <span className={styles.statLabel}>Data source</span>
          </div>
        </div>
        <div className={styles.syncRow}>
          <span>
            {data?.lastSyncedAt
              ? `Updated ${formatUpdatedAt(data.lastSyncedAt)}`
              : "Syncing scores..."}
          </span>
          <button
            type="button"
            className={styles.refreshButton}
            onClick={() => void refresh()}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
        {error ? <p className={styles.errorBanner}>{error}</p> : null}
      </header>

      <main className={styles.main}>
        {loading && !data ? (
          <div className={styles.loadingState}>Loading live scores...</div>
        ) : null}

        {data ? (
          <>
            {tab === "results" ? (
              <ResultsView results={data.results} live={data.live} />
            ) : null}
            {tab === "groups" ? <GroupsView groups={data.groups} /> : null}
            {tab === "knockout" ? (
              <KnockoutView matches={data.knockout} />
            ) : null}
            {tab === "schedule" ? (
              <ScheduleView matches={data.upcoming} />
            ) : null}
          </>
        ) : null}
      </main>

      <nav className={styles.bottomNav} aria-label="Main navigation">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.navButton} ${tab === item.id ? styles.navActive : ""}`}
            onClick={() => setTab(item.id)}
            aria-current={tab === item.id ? "page" : undefined}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <aside className={styles.installHint}>
        <strong>Add to iPhone:</strong> tap Share → Add to Home Screen
      </aside>
    </div>
  );
}
