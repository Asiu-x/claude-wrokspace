/**
 * 获取 public 目录下静态资源的完整路径
 * 自动拼接 VITE_BASE_PATH，兼容子路径部署
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // 去掉 path 开头的 /，避免双斜杠
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
