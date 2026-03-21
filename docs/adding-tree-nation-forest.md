# Adding a Tree-Nation Forest

Use this checklist whenever you add a new forest so the `breakdown` and `home` pages stay in sync.

## 1) Add fallback partner data

Update `assets/js/tree-data.js`:

- Add a new entry in `verifiedPartners` with:
  - `id` (must match API mapping in step 2)
  - `name`
  - `baseLocation`
  - `trees` (fallback tree count)
  - `co2Tonnes` (fallback CO2 estimate in tonnes)
  - `countries` (comma-separated display list)
- Update `totals.webReadyTrees`, `totals.webReadyCo2Kg` (forest total CO₂ in kg from Tree-Nation), `totals.verifiedTrees`, and `totals.totalTrees`.
- Update `lastUpdated`.

## 2) Enable live tree counts

Update `assets/js/tree-nation-api.js`:

- Add the forest slug to `FORESTS`.
  - Example: `https://tree-nation.com/profile/denman-place-mall` -> `denman-place-mall`
- If known, add `forestId` in the same `FORESTS` entry.
  - This enables the preferred endpoint: `GET /api/forests/{id}` (returns both tree count and CO2 tonnes).
- Add slug -> partner id in `PARTNER_SLUG_TO_ID`.
  - The mapped value must equal the `id` in `tree-data.js`.

## 3) Optional data updates

Only if applicable:

- Add entries in `tree-data.js` -> `certificates` when you have new PDFs.
- Update `tree-data.js` -> `mapSites` if geography/site attribution changes.

## 4) Verify

- Open `/breakdown` and confirm:
  - New partner appears in Planting Partners.
  - Partner profile link opens the correct Tree-Nation page.
- Open `/home` and confirm partner appears in the partner table.
- Confirm totals make sense in both fallback and live modes.

## API reality today

This site uses public forest counters:

- `GET https://tree-nation.com/api/forests/{id}` (preferred when ID is known)
- `GET https://tree-nation.com/api/forests/{slug}/tree_counter`

In practice, availability can vary by forest/account and environment (for example CORS or endpoint permission behavior). The implementation is:

- Prefer live API values.
- Fall back to `tree-data.js` for any missing fields.

Country metadata is still maintained in `tree-data.js`.
