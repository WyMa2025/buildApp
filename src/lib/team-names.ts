const TEAM_ALIASES: Record<string, string> = {
  USA: "United States",
  "Bosnia & Herzegovina": "Bosnia and Herzegovina",
};

export function normalizeTeamName(name: string): string {
  return TEAM_ALIASES[name] ?? name;
}

export function teamsMatch(a: string, b: string): boolean {
  return normalizeTeamName(a) === normalizeTeamName(b);
}
