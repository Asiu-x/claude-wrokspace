/**
 * 智能体广场（智能体平台）外链，仅按 Vite 构建模式 `import.meta.env.MODE` 选择：
 * - `production` → https://ai.fifedu.com/home
 * - 其他（development、test 等）→ https://gest.fifedu.com/home
 */
const AGENT_PLAZA_URL_TEST = 'https://gest.fifedu.com/home';
const AGENT_PLAZA_URL_PROD = 'https://ai.fifedu.com/home';

export function getAgentPlazaUrl(): string {
  return import.meta.env.MODE === 'production' ? AGENT_PLAZA_URL_PROD : AGENT_PLAZA_URL_TEST;
}
