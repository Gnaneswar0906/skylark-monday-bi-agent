# Final Checklist — Skylark Drones Monday.com BI Agent

## Security

- [ ] No API keys committed to Git
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` contains only placeholder values
- [ ] `MONDAY_API_TOKEN` remains server-side only
- [ ] `LLM_API_KEY` remains server-side only
- [ ] No `NEXT_PUBLIC_` prefix on secret environment variables
- [ ] Monday.com integration is read-only
- [ ] No hardcoded production business data

## Functionality

- [ ] Chat accepts natural language questions
- [ ] Suggested questions are clickable
- [ ] Pipeline health query returns pipeline value and weighted pipeline
- [ ] Sector query returns sector-specific metrics
- [ ] Deal analysis returns biggest deals
- [ ] Deal risk returns at-risk deals
- [ ] Billing query returns billed vs collected metrics
- [ ] Collections query returns collection rate and gap
- [ ] Receivables query returns outstanding amounts
- [ ] Cross-board analysis combines deals and work orders
- [ ] Business health assessment returns overall health score
- [ ] Leadership update returns full management report
- [ ] Ambiguous questions trigger clarification (not assumptions)
- [ ] Data quality warnings are shown to users
- [ ] Missing values are never silently converted to 0

## Monday.com Integration

- [ ] Boards are created in Monday.com
- [ ] Deals dataset is imported to Deals board
- [ ] Work Orders dataset is imported to Work Orders board
- [ ] Column types are set appropriately
- [ ] API token is configured in environment
- [ ] Board IDs are configured in environment
- [ ] Dynamic column discovery works correctly
- [ ] Cursor-based pagination handles all records

## Data Quality

- [ ] Missing deal values are excluded from pipeline calculations
- [ ] Missing probabilities are excluded from weighted pipeline
- [ ] Missing dates are excluded from period-based filtering
- [ ] All exclusions are communicated to users
- [ ] Text normalization handles case and whitespace
- [ ] Date normalization handles multiple formats
- [ ] Numeric normalization handles ₹, commas, percentages

## Code Quality

- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run lint` passes with no errors
- [ ] `npm test` passes all test cases
- [ ] `npm run build` completes successfully

## Deployment

- [ ] Repository is pushed to GitHub
- [ ] Vercel project is linked to GitHub repository
- [ ] All environment variables are configured in Vercel
- [ ] Production URL is accessible
- [ ] All 11 acceptance tests pass in production

## Acceptance Tests

- [ ] Test 1: "What's our pipeline this quarter?" — returns pipeline metrics
- [ ] Test 2: "How is Mining performing?" — returns Mining-specific analysis
- [ ] Test 3: "Which sector has the strongest pipeline?" — returns sector leaderboard
- [ ] Test 4: "What are our biggest deals?" — returns top deals by value
- [ ] Test 5: "Which deals are at risk?" — returns at-risk deals
- [ ] Test 6: "How much has been billed versus collected?" — returns billing/collection comparison
- [ ] Test 7: "What are our outstanding receivables?" — returns receivables breakdown
- [ ] Test 8: "Compare Mining and Powerline." — returns comparison analysis
- [ ] Test 9: "Give me an overall business health assessment." — returns health metrics
- [ ] Test 10: "Prepare a leadership update." — returns full leadership report
- [ ] Test 11: "How are we doing?" — triggers clarification response

## Documentation

- [x] README.md — Project overview and setup instructions
- [x] DECISION_LOG.md — Architecture decisions
- [x] DATA_PROFILE.md — Dataset analysis
- [x] FINAL_CHECKLIST.md — This checklist
