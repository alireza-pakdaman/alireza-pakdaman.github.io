import snapshot from './github-snapshot.json';
import { profile } from './profile';

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
}

/**
 * Fetched once at build time. Falls back to the committed snapshot if the
 * GitHub API is unreachable or rate-limited, so a build never fails on it.
 */
export async function getRepos(): Promise<{ repos: Repo[]; live: boolean }> {
  try {
    const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const all = (await res.json()) as (Repo & { fork: boolean })[];
    const repos = all
      .filter((r) => !r.fork)
      .map(({ name, description, language, stargazers_count, html_url, pushed_at }) => ({
        name,
        description,
        language,
        stargazers_count,
        html_url,
        pushed_at,
      }));
    if (repos.length === 0) throw new Error('empty response');
    return { repos, live: true };
  } catch {
    return { repos: snapshot as Repo[], live: false };
  }
}

export function languageStats(repos: Repo[], top = 6): { language: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of repos) {
    if (!r.language) continue;
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const head = sorted.slice(0, top).map(([language, count]) => ({ language, count }));
  const rest = sorted.slice(top).reduce((sum, [, c]) => sum + c, 0);
  if (rest > 0) head.push({ language: 'Other', count: rest });
  return head;
}
