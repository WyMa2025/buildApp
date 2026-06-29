"use client";

import { useMemo, useState } from "react";
import {
  GROUPS,
  KNOCKOUT_MATCHES,
  RECENT_RESULTS,
  TOURNAMENT,
  UPCOMING_MATCHES,
  type Match,
} from "@/data/world-cup-2026";
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

function MatchCard({ match }: { match: Match }) {
  const finished = match.status === "finished";
  const winnerHome =
    finished && match.homeScore !== undefined && match.awayScore !== undefined
      ? match.homeScore > match.awayScore
      : false;
  const winnerAway =
    finished && match.homeScore !== undefined && match.awayScore !== undefined
      ? match.awayScore > match.homeScore
      : false;

  return (
    <article className={styles.matchCard}>
      <div className={styles.matchMeta}>
        <span>{formatDate(match.date)}</span>
        <span>{match.time}</span>
      </div>
      <p className={styles.matchRound}>{match.round}</p>
      <div className={styles.matchTeams}>
        <div className={`${styles.teamRow} ${winnerHome ? styles.winner : ""}`}>
          <span className={styles.flag}>{getFlag(match.home)}</span>
          <span className={styles.teamName}>{match.home}</span>
          {finished ? (
            <span className={styles.score}>{match.homeScore}</span>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>
        <div className={`${styles.teamRow} ${winnerAway ? styles.winner : ""}`}>
          <span className={styles.flag}>{getFlag(match.away)}</span>
          <span className={styles.teamName}>{match.away}</span>
          {finished ? (
            <span className={styles.score}>{match.awayScore}</span>
          ) : null}
        </div>
      </div>
      <p className={styles.venue}>{match.venue}</p>
      {!finished ? <span className={styles.badge}>Upcoming</span> : null}
    </article>
  );
}

function ResultsView() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Latest Results</h2>
        <p>Most recent finished matches</p>
      </div>
      <div className={styles.matchList}>
        {RECENT_RESULTS.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}

function GroupsView() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Group Standings</h2>
        <p>Final tables after Matchday 3</p>
      </div>
      <div className={styles.groupGrid}>
        {GROUPS.map((group) => (
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

function KnockoutView() {
  const finished = KNOCKOUT_MATCHES.filter((match) => match.status === "finished");
  const upcoming = KNOCKOUT_MATCHES.filter((match) => match.status === "scheduled");

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Round of 32</h2>
        <p>Knockout stage bracket</p>
      </div>

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

function ScheduleView() {
  const grouped = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const match of UPCOMING_MATCHES) {
      const existing = map.get(match.date) ?? [];
      existing.push(match);
      map.set(match.date, existing);
    }
    return [...map.entries()];
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Upcoming Matches</h2>
        <p>Round of 32 schedule</p>
      </div>
      {grouped.map(([date, matches]) => (
        <div key={date} className={styles.dayBlock}>
          <h3 className={styles.dayHeading}>{formatDate(date)}</h3>
          <div className={styles.matchList}>
            {matches.map((match) => (
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

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.trophy}>🏆</span>
          <div>
            <p className={styles.kicker}>FIFA World Cup</p>
            <h1>2026 Results</h1>
          </div>
        </div>
        <p className={styles.subtitle}>{TOURNAMENT.host}</p>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{TOURNAMENT.stage}</span>
            <span className={styles.statLabel}>Current stage</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>48</span>
            <span className={styles.statLabel}>Teams</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>104</span>
            <span className={styles.statLabel}>Matches</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {tab === "results" ? <ResultsView /> : null}
        {tab === "groups" ? <GroupsView /> : null}
        {tab === "knockout" ? <KnockoutView /> : null}
        {tab === "schedule" ? <ScheduleView /> : null}
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
