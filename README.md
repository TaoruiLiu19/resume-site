# 个人简历展示页

一个可直接部署到 GitHub Pages 的静态简历模板，采用 Motion Fit 风格的高性能设计，支持深色/浅色双主题切换、响应式布局、键盘导航与减弱动效偏好。

## 文件结构

```
resume-site/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式与 Motion Fit 主题变量
├── js/
│   └── main.js         # 移动端菜单、主题切换、滚动显现、年份更新
├── assets/
│   └── .gitkeep        # 将你的简历 PDF 放入此目录，并替换 index.html 中的下载链接
└── README.md
```

## 本地预览

在项目目录下运行任意静态服务器，例如：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

然后在浏览器打开 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库，例如 `username.github.io`（个人主页）或任意仓库名。
2. 将本项目文件推送到仓库根目录。
3. 进入仓库 **Settings → Pages**。
4. Source 选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`。
5. 保存后等待几分钟，访问 `https://username.github.io` 或对应仓库路径即可。

## 当前内容

页面已填入刘焘瑞的真实简历信息，包括：

- 个人信息与联系方式
- 教育背景、核心课程、毕业论文与荣誉奖项
- 竞赛与活动经历
- 9 个项目经历（4 个精选项目 + 5 个紧凑卡片）
- 编程语言、框架工具与核心能力

如需提供简历 PDF 下载，将你的 PDF 文件放入 `assets/` 目录，并命名为 `resume.pdf`；或修改 `index.html` 中下载按钮的 `href`。

## 主题切换

页面右上角提供主题切换按钮：
- **深色主题**（默认）：近黑背景 + 霓虹绿（`#00ff85`）强调色。
- **浅色主题**：浅灰/白色背景 + 活力橙（`#ff4000`）强调色。

首次访问会跟随系统配色偏好，切换后会记住你的选择（`localStorage`）。

## 设计说明

- 参考 Motion Fit 配色：高对比强调色 + 深色/浅色双主题。
- 整体风格为圆润极简：卡片、按钮、标签均使用大圆角/胶囊形，Hero 区为可实时显示当前时间的 SVG 表盘（外圈时针点、中圈分针点、内圈秒针点 + 中心数字时间），颜色随主题切换。
- 深色模式以霓虹绿（`#00ff85`）为主强调色；浅色模式切换为活力橙（`#ff4000`），保证可读性。
- 主字体：Orbitron（标题）+ Noto Sans SC（中文正文）。
