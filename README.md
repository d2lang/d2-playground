<div align="center">
  <img src="./src/assets/images/og.png" alt="D2 Playground" />
  <h2>
    An online runner to play, learn, and create with D2, the modern diagram scripting language that turns text to diagrams.
  </h2>

[![ci](https://github.com/d2lang/d2-playground/actions/workflows/ci.yml/badge.svg)](https://github.com/d2lang/d2-playground/actions/workflows/ci.yml)
[![daily](https://github.com/d2lang/d2-playground/actions/workflows/daily.yml/badge.svg)](https://github.com/d2lang/d2-playground/actions/workflows/daily.yml)
[![discord](https://img.shields.io/discord/1039184639652265985?label=discord)](https://discord.gg/NF6X8K4eDq)
[![license](https://img.shields.io/github/license/d2lang/d2-playground?color=9cf)](./LICENSE.txt)
<a href="https://vercel.com/open-source-program"><img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge-2026.svg" /></a>

</div>

**Notice:** This is not the repository for the D2 language. That can be found [here](https://github.com/d2lang/d2).

# Table of Contents

<!-- toc -->
- [FAQ](#faq)
  - [What is this written in?](#what-is-this-written-in)
  - [How does it work?](#how-does-it-work)
  - [Can I run it locally?](#can-i-run-it-locally)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Deploying to Vercel](#deploying-to-vercel)
- [Contributing](#contributing)
- [Dependencies](#dependencies)

## FAQ

### What is this written in?

Vanilla HTML, CSS, and Javascript.

### How does it work?

[d2.js](https://www.npmjs.com/package/@d2lang/d2) compiles and renders Dagre, ELK,
and TALA layouts entirely within the browser.

### Can I run it locally?

Yes. Just clone and follow the instructions in the Development section below.

## Development

Run `./ci/dev.sh`.

### Prerequisites

- `esbuild`:
[https://esbuild.github.io/getting-started/#install-esbuild](https://esbuild.github.io/getting-started/#install-esbuild)

### Deploying to Vercel

Vercel hosts the production playground at https://play.d2lang.com and
https://playground.d2lang.com. Connect this repository with the repository root
as the Root Directory, Node.js 24, and
`master` as the Production Branch. Pull requests receive preview deployments.
The checked-in `vercel.json` installs the JavaScript dependencies, builds the
static site, and serves `dist`. No environment variables are required.

To build the same output locally, initialize the submodules, run
`npx --yes --package=yarn@1.22.22 -- yarn --cwd src/js install --frozen-lockfile`,
then run `./ci/vercel-build.sh`. The build requires Node.js and npm, uses pinned
Yarn 1.22.22 and esbuild 0.16.3, and preserves the dependency versions in the Yarn
lockfile. JavaScript and CSS remain uncompressed in `dist` so Vercel can serve
them with the appropriate content encoding. Unhashed static filenames revalidate
on each request so browser caches do not retain assets from an older release.

Vercel deploys production changes from `master`; the previous AWS deployment
workflow and script have been removed. The GitHub CI and daily workflows continue
checking the Go development server. Roll back a release by promoting a previous
production deployment in Vercel.

The existing same-origin Plausible routes are preserved: `/js/script.js` proxies
the analytics script and `/api/event` proxies event submissions to `plausible.io`.

## Contributing

Contributions are welcome!

## Dependencies

External dependencies are kept to a minimum. Currently they are:
1. [Monaco Editor](https://github.com/microsoft/monaco-editor) for text editing features.
1. [Panzoom](https://github.com/anvaka/panzoom) for SVG navigation.

Both are not ideal. Monaco is unnecessarily heavy and Panzoom lacks scrolling. The plan is
to replace these one day.

If you're a contributor, please do not add any dependencies without discussing first.
