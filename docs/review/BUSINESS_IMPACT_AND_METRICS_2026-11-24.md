# Portfolio business-problem narrative and metric register · 24 November 2026

## Why this revision exists

Each case study now leads with a problem a CEO, HR manager or customer-service lead recognizes, explains the proposed/implemented business workflow, and separates intended benefits from independently observed outcomes. Public restaurant and security identities remain generic.

## Database-authenticated CEFA snapshot

Source: connected FOC Supabase project, read-only aggregate queries on 24 November 2026. No student identity, email, message text, IP or private record was transferred to this portfolio.

| Measure | Exact count | Definition |
| --- | ---: | --- |
| Onboarded students | **127** | `cefa_members` status active, student role; all had `auth_user_id` and `invite_claimed_at` |
| Learning groups | **10** | Total `cefa_groups` rows |
| Group-chat messages | **113** | `cefa_chat_messages` where `deleted_at IS NULL` |

These counts are a point-in-time snapshot, not dynamic numbers and not a statement about concurrency or educational outcomes.

## Prospect-intelligence result not yet authenticated live

Historical source: independent restaurant prospecting platform project document `docs/01_PRODUCT_AND_RESULTS.md`, dated 9 October 2026, records **314 discovered prospects**. The live prospect and qualified-for-calls totals were **not accessible in the linked Supabase accounts**. The client prospect database is distinct from the connected restaurant ordering database. A pair of current counts has therefore **not been published as live metrics**; do not combine an October discovery number with a September qualification screenshot. The case study may mention the dated historical 314 result with its date.

Owner may supply a sanitized read-only dashboard aggregate or a database connection containing the canonical account table. Once both totals come from the same snapshot, add exactly the two requested figures: discovered prospects and qualified for calls. Do not expose organizations, contact numbers, scores per company, or call notes.

## Business context and responsible claims

- Real-estate website: CEO described a malware-disabled prior website while marketing material still pointed to it. Case-study problem context is owner-supplied; no independently verified customer loss or campaign recovery percentage.
- Real-estate sales CRM: slow response, missed follow-ups and lost lead context led to the design for an AI assistant, shared conversation viewer and same-number human takeover. The latest checked-in source still records the connected WhatsApp runtime, AI qualification and hosted acceptance as open. Do **not** call the full sales assistant production-cleared.
- Security workforce: owner describes more than 1,000 guards under client management, **not onboarded app users**. WhatsApp-based attendance reporting is the intended workflow replacement; production GPS/device acceptance remains open.
- Three-branch restaurant: high incoming-order volume and delayed chat replies motivate AI-assisted ordering; faster reply and conversion increases are unmeasured until source evidence is provided. Management, branch, kitchen and accountant dashboards have approved responsibilities, but independent payment/workspace certification remains pending.
- Nonprofit and internal staff platform: distinguish documented application capabilities from beneficiaries served, donations, revenue, hours saved and any other unverified business impact.

## Release constraints

This branch is for portfolio presentation only. No production database mutations, new public client identities, staff messages or private screenshots. Merge only after privacy certification with privately held identifiers and explicit owner release approval. Keep draft PR stacked on the earlier visual and evidence review branches.
