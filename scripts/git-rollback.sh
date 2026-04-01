#!/bin/bash
# 回滚辅助脚本 —— 查看历史快照并回滚
# 用法：
#   ./git-rollback.sh list [数量]        列出最近的快照
#   ./git-rollback.sh show <commit>      查看某个快照的变更内容
#   ./git-rollback.sh file <文件> <commit>  回滚单个文件到指定版本
#   ./git-rollback.sh to <commit>        回滚整个项目到指定版本
#   ./git-rollback.sh diff <commit>      对比当前与指定版本的差异

REPO_DIR="/Users/xccx/Documents/claude"
cd "$REPO_DIR" || exit 1

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # 无颜色

case "$1" in
    list)
        COUNT="${2:-20}"
        echo -e "${BLUE}最近 ${COUNT} 个快照：${NC}"
        echo "────────────────────────────────────────────────────"
        git log --oneline --format="%C(yellow)%h%C(reset) %C(green)%ci%C(reset) %s" -n "$COUNT"
        echo "────────────────────────────────────────────────────"
        echo -e "${YELLOW}提示：复制左侧的 commit hash 用于回滚操作${NC}"
        ;;

    show)
        if [ -z "$2" ]; then
            echo -e "${RED}用法：$0 show <commit-hash>${NC}"
            exit 1
        fi
        echo -e "${BLUE}快照 $2 的变更内容：${NC}"
        git show --stat "$2"
        ;;

    file)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${RED}用法：$0 file <文件路径> <commit-hash>${NC}"
            echo "示例：$0 file frontend/src/App.tsx abc1234"
            exit 1
        fi
        FILE="$2"
        COMMIT="$3"
        # 先备份当前版本
        echo -e "${YELLOW}回滚文件：${FILE} → 版本 ${COMMIT}${NC}"
        git checkout "$COMMIT" -- "$FILE"
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}已回滚。变更已暂存，可用 git diff --cached 查看。${NC}"
            echo -e "${YELLOW}如需撤销回滚：git checkout HEAD -- ${FILE}${NC}"
        else
            echo -e "${RED}回滚失败，请检查文件路径和 commit hash。${NC}"
        fi
        ;;

    to)
        if [ -z "$2" ]; then
            echo -e "${RED}用法：$0 to <commit-hash>${NC}"
            exit 1
        fi
        COMMIT="$2"
        echo -e "${YELLOW}即将回滚整个项目到版本：${COMMIT}${NC}"
        echo -e "${YELLOW}当前未提交的变更将先被保存为快照。${NC}"
        read -p "确认回滚？(y/N) " CONFIRM
        if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
            echo "已取消。"
            exit 0
        fi
        # 先保存当前状态
        git add -A
        git commit -m "[auto] 回滚前快照 - $(date '+%Y-%m-%d %H:%M:%S')" --quiet 2>/dev/null
        # 创建回滚 commit（不是 reset，保留历史）
        git revert --no-commit "$COMMIT"..HEAD 2>/dev/null
        if [ $? -eq 0 ]; then
            git commit -m "[rollback] 回滚到版本 ${COMMIT} - $(date '+%Y-%m-%d %H:%M:%S')"
            echo -e "${GREEN}回滚完成。历史记录已保留，可随时再次回滚。${NC}"
        else
            echo -e "${RED}自动回滚遇到冲突，请手动解决：${NC}"
            git diff --name-only --diff-filter=U
            echo -e "${YELLOW}解决后运行：git add -A && git commit${NC}"
            echo -e "${YELLOW}放弃回滚：git revert --abort${NC}"
        fi
        ;;

    diff)
        if [ -z "$2" ]; then
            echo -e "${RED}用法：$0 diff <commit-hash>${NC}"
            exit 1
        fi
        echo -e "${BLUE}当前与版本 $2 的差异：${NC}"
        git diff "$2" --stat
        echo ""
        read -p "查看详细差异？(y/N) " SHOW_DETAIL
        if [ "$SHOW_DETAIL" = "y" ] || [ "$SHOW_DETAIL" = "Y" ]; then
            git diff "$2"
        fi
        ;;

    *)
        echo -e "${BLUE}Git 回滚辅助工具${NC}"
        echo ""
        echo "用法："
        echo "  $0 list [数量]            列出最近的快照（默认20个）"
        echo "  $0 show <commit>          查看某个快照的变更内容"
        echo "  $0 file <文件> <commit>   回滚单个文件到指定版本"
        echo "  $0 to <commit>            回滚整个项目到指定版本"
        echo "  $0 diff <commit>          对比当前与指定版本的差异"
        echo ""
        echo "示例："
        echo "  $0 list 10"
        echo "  $0 file frontend/src/App.tsx abc1234"
        echo "  $0 to abc1234"
        ;;
esac
