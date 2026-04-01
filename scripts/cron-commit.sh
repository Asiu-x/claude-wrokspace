#!/bin/bash
# 定时自动提交脚本 —— 由 cron 每 30 分钟调用
# 仅在有变更时提交，无变更则静默退出

REPO_DIR="/Users/xccx/Documents/claude"
LOG_FILE="$REPO_DIR/scripts/.cron-commit.log"
cd "$REPO_DIR" || exit 1

# 检查是否有变更
if git diff --quiet HEAD 2>/dev/null && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 无变更，跳过" >> "$LOG_FILE"
    exit 0
fi

# 统计变更文件数
CHANGED=$(git diff --name-only HEAD 2>/dev/null | wc -l | tr -d ' ')
UNTRACKED=$(git ls-files --others --exclude-standard | wc -l | tr -d ' ')
TOTAL=$((CHANGED + UNTRACKED))

# 提交
git add -A
git commit -m "[auto] cron 定时快照 - ${TOTAL} 个文件变更 - $(date '+%Y-%m-%d %H:%M:%S')" --quiet 2>/dev/null

# 推送到远程（如果配置了远程仓库）
if git remote | grep -q origin; then
    git push origin main --quiet 2>/dev/null
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 已提交 ${TOTAL} 个文件变更" >> "$LOG_FILE"
exit 0
