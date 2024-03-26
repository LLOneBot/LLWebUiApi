<div align="center">
  <img src="https://socialify.git.ci/LLOneBot/LLWebUiApi/image?description=1&forks=1&issues=1&language=1&logo=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FLLOneBot%2FLLWebUiApi%2Fdocs%2Flogo.jpg&name=1&owner=1&pulls=1&stargazers=1" alt="Repo banner" />
</div>

## 提示
该项目目前已迁移,一开始计划为LLOnebot提供远程配置服务，但LiteLoader与LLOnebot原理上依赖于electron，本身并不为无头做准备.

该实现使得项目复杂,且无法实现真正的无头,因此基于下一代基于NTQQ BOT框架 NapCatQQ 重塑项目,实现纯无头,请关注NapCatQQ社群.

## 简介

LLWebUiApi 旨在提供伪 Headless 与远程管理支持，以尽最大可能减缓无 GPU 环境的图形计算压力，以及方便无用户界面的运行环境（如 Docker）调整和配置 LiteLoaderQQNT 本体及其他插件的设置。


## 使用方法

目前 LLWebUiApi 仍处于快速开发阶段，功能依旧十分不稳定且随时可能有更改。如果你想体验，可自行克隆本项目源码后打包体验。

## API 一览

* [x] 远程登陆
* [ ] 获取 QQNT 基本信息
* [ ] 获取 LiteLoaderQQNT 基本信息
* [ ] 调整 QQNT 设置
* [ ] 调整 LiteLoaderQQNT 设置
* [x] 文件管理
* [ ] 插件管理
* [x] 调整插件设置

## 感谢

* [LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT/)
* [LLOnebot](https://github.com/LLOneBot/LLOneBot/)
* [Chronocat](https://github.com/chrononeko/chronocat)

## License
```
    LLWebUiApi
    Copyright (C) 2024 Team LLOneBot

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
