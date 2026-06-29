const COUNTRY_CODES: Record<string, string> = {
  Mexico: "MX",
  "South Africa": "ZA",
  "South Korea": "KR",
  "Czech Republic": "CZ",
  Switzerland: "CH",
  Canada: "CA",
  "Bosnia and Herzegovina": "BA",
  Qatar: "QA",
  Brazil: "BR",
  Morocco: "MA",
  Scotland: "GB-SCT",
  Haiti: "HT",
  "United States": "US",
  Australia: "AU",
  Paraguay: "PY",
  Turkey: "TR",
  Germany: "DE",
  "Ivory Coast": "CI",
  Ecuador: "EC",
  "Curaçao": "CW",
  Netherlands: "NL",
  Japan: "JP",
  Sweden: "SE",
  Tunisia: "TN",
  Belgium: "BE",
  Egypt: "EG",
  Iran: "IR",
  "New Zealand": "NZ",
  Spain: "ES",
  "Cape Verde": "CV",
  Uruguay: "UY",
  "Saudi Arabia": "SA",
  France: "FR",
  Norway: "NO",
  Senegal: "SN",
  Iraq: "IQ",
  Argentina: "AR",
  Austria: "AT",
  Algeria: "DZ",
  Jordan: "JO",
  Colombia: "CO",
  Portugal: "PT",
  "DR Congo": "CD",
  Uzbekistan: "UZ",
  England: "GB-ENG",
  Croatia: "HR",
  Ghana: "GH",
  Panama: "PA",
};

function countryCodeToFlag(code: string): string {
  if (code.startsWith("GB-")) {
    return "🏴";
  }

  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0)),
    );
}

export function getFlag(team: string): string {
  const code = COUNTRY_CODES[team];
  return code ? countryCodeToFlag(code) : "⚽";
}

export function getInitials(team: string): string {
  return team
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}
