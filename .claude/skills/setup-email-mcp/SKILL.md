---
name: setup-email-mcp
description: 一键安装配置邮件MCP服务器（支持IMAP企业邮箱）。当用户要求安装邮件MCP、配置邮件读取、或提到"/setup-email-mcp"时触发。
---

# 邮件MCP安装配置技能

## 概述
自动安装并配置 `@n24q02m/better-email-mcp` MCP服务器，支持通过IMAP协议连接企业邮箱，使Claude Code具备邮件读取、搜索、发送等能力。

## 执行步骤

### 第1步：收集邮箱信息
向用户询问以下信息（如果用户未提供）：
- **邮箱地址**（必填）：如 `user@example.com`
- **邮箱密码**（必填）：授权码或密码
- **IMAP服务器地址**（必填）：如 `mail.example.com`

常见IMAP服务器参考：
| 邮箱类型 | IMAP服务器 |
|---------|-----------|
| Gmail | imap.gmail.com |
| Outlook | outlook.office365.com |
| QQ邮箱 | imap.qq.com |
| 163邮箱 | imap.163.com |
| 企业自建 | 需用户提供 |

### 第2步：验证环境
运行以下命令确认 Node.js/npx 可用：
```bash
which npx && npx --version
```
如果 npx 不可用，提示用户先安装 Node.js。

### 第3步：测试MCP连接
使用用户提供的凭据测试MCP能否正常启动：
```bash
EMAIL_CREDENTIALS="邮箱:密码:IMAP服务器" npx -y @n24q02m/better-email-mcp@latest 2>&1 &
sleep 5
kill %1 2>/dev/null
```
预期输出应包含 `Loaded 1 email account(s)`。如果失败，检查凭据和网络。

### 第4步：写入MCP配置
读取 `~/.claude.json`，在 `projects` 对应工作目录的 `mcpServers` 中添加以下配置：

```json
"email": {
  "type": "stdio",
  "command": "npx",
  "args": [
    "-y",
    "@n24q02m/better-email-mcp@latest"
  ],
  "env": {
    "EMAIL_CREDENTIALS": "邮箱地址:密码:IMAP服务器地址"
  }
}
```

**关键注意事项：**
- `EMAIL_CREDENTIALS` 格式为 `邮箱:密码:IMAP服务器`（三段用冒号分隔）
- 如果 `mcpServers` 中已有 `email` 配置，替换而非新增
- 如果 `projects` 中没有当前工作目录的条目，需要先创建完整的项目结构
- 编辑 `~/.claude.json` 时务必使用 Edit 工具精确替换，避免破坏其他配置

### 第5步：提示重启
配置完成后，告知用户：
> 邮件MCP配置完成！请重启 Claude Code 对话（VSCode中按 `Cmd+Shift+P` → `Developer: Reload Window`，或关闭重开对话），新的MCP服务器才会加载。
>
> 重启后可以直接使用以下功能：
> - 搜索邮件：`帮我搜索本周的邮件`
> - 读取邮件：`读取来自xxx的邮件`
> - 发送邮件：`帮我回复这封邮件`

## 故障排查

| 问题 | 解决方案 |
|------|---------|
| MCP启动失败，无输出 | 检查 npx 是否可用，尝试 `npm cache clean --force` |
| 连接超时 | 检查网络/代理设置，企业邮箱可能需要配置代理环境变量 |
| 认证失败 | 确认密码正确，部分邮箱需要使用"应用专用密码"而非登录密码 |
| 配置后MCP未加载 | 必须重启Claude Code对话，仅重开窗口不够 |
| SSL错误 | 可在env中添加 `"NODE_TLS_REJECT_UNAUTHORIZED": "0"`（仅测试用） |

## 多账号支持
如需配置多个邮箱账号，`EMAIL_CREDENTIALS` 用逗号分隔：
```
"EMAIL_CREDENTIALS": "user1@a.com:pass1:imap.a.com,user2@b.com:pass2:imap.b.com"
```
