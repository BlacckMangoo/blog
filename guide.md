# Component Guide

This blog uses a small set of reusable components for MDX posts. Put your article in `src/content/blog/*.mdx`, import the components you need at the top, and then use them directly in the body of the post.

## Available Components

- `Callout.astro` for highlighted notes and warnings.
- `Figure.astro` for imported images with captions.
- `Quote.astro` for styled pull quotes.
- `CanvasDemo.jsx` for interactive React canvas demos.
- `Math.astro` for KaTeX-rendered math when you want to avoid raw TeX blocks in MDX.

## Basic MDX Setup

Start a post like this:

```mdx
---
title: "My New Post"
description: "Short summary of the article."
pubDate: 2026-07-04
tags:
  - rendering
  - shaders
---

import Callout from "../../components/Callout.astro";
import Figure from "../../components/Figure.astro";
```

## Callout

Use `Callout` for notes, warnings, or emphasis.

```mdx
<Callout title="Note" tone="warning">
This is a highlighted block for important information.
</Callout>
```

## Figure

Use `Figure` for imported images from `src/assets`.

```mdx
import shadowMap from "../../assets/shadow-map.png";

<Figure
  src={shadowMap}
  caption="Shadow-map visualization from the light's point of view."
/>
```

## Quote

Use `Quote` for styled pull quotes.

```mdx
import Quote from "../../components/Quote.astro";

<Quote cite="Rasterization practice">
Visibility is the real problem shadow mapping solves.
</Quote>
```

## Math

Use `Math` when you want KaTeX-rendered formulas inside MDX without relying on raw display math blocks.

```mdx
import Math from "../../components/Math.astro";

<Math formula="z_{receiver} > z_{stored} + b" />

<Math
  block
  formula="L_o(x,\omega_o)=L_e(x,\omega_o)+\int_\Omega f_r(x,\omega_i,\omega_o) L_i(x,\omega_i) (\omega_i \cdot n) \, d\omega_i"
/>
```

## CanvasDemo

Use `CanvasDemo` for interactive graphics demos.

```mdx
import CanvasDemo from "../../components/CanvasDemo.jsx";

<CanvasDemo client:load title="Rotating triangle" subtitle="A lightweight canvas island." />
```

## Recommended Pattern

For a polished article, combine all of them in one post:

1. Start with a short intro and one quote.
2. Use `Callout` for implementation notes.
3. Show diagrams with `Figure`.
4. Add equations with `Math`.
5. Drop in `CanvasDemo` for an interactive section.
6. Finish with code blocks, tables, and short takeaways.

## Notes

- Keep component imports at the top of the MDX file.
- Put static images in `src/assets`.
- Use `client:load` on `CanvasDemo` so the React island mounts in the browser.
- The home page automatically picks up new posts from `src/content/blog`.