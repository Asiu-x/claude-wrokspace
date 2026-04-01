#!/bin/bash
# Claude Code PreToolUse Hook —— 在 Claude 编辑文件前自动创建 git 快照
# 仅在有未提交变更时才创建 commit

REPO_DIR="/Users/xccx/Documents/claude"
cd "$REPO_DIR" || exit 0

# 检查是否有变更（已修改或未跟踪的文件）
if git diff --quiet HEAD 2>/dev/null && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    # 没有变更，跳过
    exit 0
fi

# 获取触发工具名称（从环境变量）
TOOL_NAME="${CLAUDE_TOOL_NAME:-unknown}"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 添加所有变更并提交
git add -A
git commit -m "[auto] pre-claude-edit 快照 ($TOOL_NAME) - $TIMESTAMP" --quiet 2>/dev/null

exit 0
