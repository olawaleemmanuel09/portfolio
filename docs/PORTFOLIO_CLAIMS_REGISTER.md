# Evidence register · 23 November 2026

Review snapshot. Repository references identify the checked-out revision and evidence file. Business repositories are identified without live tenant links, student records or operational data. The portfolio uses text descriptions for those systems.

| System | Source inspected | Claim boundary |
| --- | --- | --- |
| CEFA / FOC | foc-dashboard@9e5e41b, docs/CEFA_ONBOARDING_ACTIVATION_2026-11-21.md, docs/CEFA_STAGING_CAPACITY_TEST_2026-11-21.md and docs/FOC_CEFA_PRODUCTION_RELIABILITY_2026-11-22.md | Cohort onboarding documented. Transaction rollback tests cover group isolation. Source fixes and live release differ. No current active-user count or concurrency claim. |
| Commerce | private historical ordering repository revision HANDOVER.md and private ordering migration revision HANDOVER_FOR_CLAUDE_CODE.md | Earlier ordering and manual transfer in use. No revenue attribution. Ride is a separately reported candidate awaiting acceptance. |
| Elion Sales | elion-sales-command-centre@ad71ccd docs/BUILD_STATE.md | Local foundation, hosted acceptance pending. Live AI and WhatsApp are outside the implemented baseline. |
| Security Workforce Platform | private security operations revision DELIVERY.json and docs/VERIFICATION.md | Staged demo. Device and connected acceptance open. |
| Elion Homes | elion-homes-website@003aad9 README.md and docs/qa/STAGE5_RELEASE_READINESS.md | Commit describes launch, readiness documents retain gates. Live deployment unconfirmed. |
| LeadReach | leadreach@381a5af docs/FIRST_USER_MILESTONE.md | Owner-local pilot recorded. Workflow templates do not establish active outreach. |
| Restaurant Prospect Intelligence | Owner brief and earlier portfolio case study | Public product label approved. Source revision and hosted certification pending. No customer dataset or live revenue attribution. |
| Job Intelligence | [Public export](https://github.com/olawaleemmanuel09/ai-job-alert-system/blob/877c9d8c06848a40543089edff2ed0fbd66d7288/ai-job-alerts.n8n.json) and owner statement | Ten nodes, Adzuna only, inactive export. The separate historical redacted classroom graph has seven nodes and one We Work Remotely RSS source. The November evidence package contains no private current export or dated execution record. The prior public portfolio contains an archived seven-branch n8n screenshot and historical Telegram alert sample. These support earlier system design, not current runtime status. Await sanitized current graph and dated run evidence. |
| Engineering Lab | Public SmartBook, lead-capture-crm-sync and lead-intelligence-pipeline exports; playbook patterns directory | 24, 8 and 19 nodes respectively. Snapshot-before-changes is the sole published playbook chapter. No bundled ML model, delivery guarantees or conversion metrics. |

## Implementation and review

Retain the App Router, existing case-study template and legacy slugs. Serve business systems and personal work from one typed catalog. Put CEFA first and distinguish release maturity in each entry. Keep technical walkthroughs readable without client-side effects. Gate new client media, testimonials, public tenant links and CV on owner clearance. Intended canonical domain comes from the brief; Vercel project mapping requires account access.

## Current CEFA test observation

At 9e5e41b, a local read-only execution of tests/cefa-chat-recovery.test.mjs passed four of five tests. The visibility-change test stops at a missing refreshStudentNotifications callback in its VM fixture. The callback exists in the application module. This result does not certify deployed reconnect behavior. No external requests or production tests were run.
