---
name: Vercel copy dependency versions
description: Why automated Vercel frontend copies need dependency-version parity checks before preview verification.
---

Preserve the imported app's major dependency versions during Vercel-to-Vite ports instead of accepting unpinned latest versions from automated dependency detection.

**Why:** A copied frontend can typecheck yet fail only in the browser when a newly installed UI library expects React APIs newer than the workspace runtime.

**How to apply:** After the copy script installs packages, compare framework and UI-library versions with the imported package manifest, restore incompatible versions, then verify through the managed workflow and a browser screenshot.