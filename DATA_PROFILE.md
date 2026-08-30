# Data Profile — Skylark Drones Business Data

## Deals Board

### Dataset Summary

| Field | Count/Details |
|---|---|
| Total Rows | ~346 records |
| Columns | 12 |

### Column Profiles

| Column | Type | Notes |
|---|---|---|
| Deal Name | Text | Anonymized (fictional names used) |
| Owner Code | Text | Format: OWNER_XXX |
| Client Code | Text | Format: COMPANY_XXX |
| Deal Status | Categorical | Open, Won, Lost, On Hold |
| Close Date (A) | Date | ISO format yyyy-MM-dd; ~many missing |
| Closure Probability | Categorical | High, Medium, Low; many missing |
| Masked Deal Value | Numeric | Rupees, no GST; many missing |
| Tentative Close Date | Date | ISO format; mixed presence |
| Deal Stage | Categorical | A–M staged pipeline |
| Product Deal | Text | Mixed format, many empty |
| Sector/Service | Categorical | Mining, Powerline, Renewables, etc. |
| Created Date | Date | ISO format; some missing |

### Data Quality Issues Observed

- **Missing Deal Value**: A significant portion of deals have no deal value assigned.
- **Missing Closure Probability**: Many deals have no probability (especially older or on-hold deals).
- **Missing Close Date**: Many deals lack an actual close date.
- **Deal Stage**: Includes stages such as "M. Projects On Hold" which indicate stalled deals.
- **Sector Inconsistencies**: "DSP" appears as a sector abbreviation.

---

## Work Orders Board

### Dataset Summary

| Field | Count/Details |
|---|---|
| Total Rows | ~177 records |
| Columns | 38+ |
| First Row | Empty (data starts at row 2) |

### Column Profiles

| Column | Type | Notes |
|---|---|---|
| Deal Name Masked | Text | Anonymized |
| Customer Name Code | Text | Format: WOCOMPANY_XXX |
| Serial # | Text | Format: SDPLDEAL-XXX |
| Execution Status | Categorical | Completed, Ongoing, Not Started, Executed until current month |
| Sector | Categorical | Mining, Powerline, Renewables, Railways, etc. |
| Amount (Excl/Incl GST) | Numeric | Rupees; some missing |
| Billed Value (Excl/Incl GST) | Numeric | Rupees; many partially filled |
| Collected Amount | Numeric | Rupees; partially filled |
| Amount Receivable | Numeric | Rupees; partially filled |
| AR Priority | Categorical | "Priority" or blank |
| Invoice Status | Categorical | Fully Billed, Partially Billed, Not billed yet |
| WO Status | Categorical | Open, Closed |
| Billing Status | Categorical | Billed, BIlled (typo), Partially Billed, Update Required |

### Data Quality Issues Observed

- **Empty First Row**: The CSV has a completely empty first row (all commas). The adapter skips it.
- **Billing Status Typo**: "BIlled" appears instead of "Billed" — normalized to "Billed".
- **Mixed Billed/Collected**: Some rows have billed values but no collected amount (or vice versa).
- **Large Numeric Range**: Amounts range from ~₹1 lakh to crores; large numbers need careful formatting.
- **Negative To-Be-Billed**: Some rows have negative "Amount to be billed" indicating overbilling scenarios.
- **38+ Columns**: Many columns are not relevant to BI queries and are safely ignored.

---

## Normalization Applied

| Issue | Normalization |
|---|---|
| "MINING", "mining", " Mining " | → "Mining" |
| "₹1,25,000", "125000" | → 125000 (number) |
| "70%", "0.70", "70" | → 0.7 (probability) |
| "High" probability | → 0.75 |
| "Medium" probability | → 0.5 |
| "Low" probability | → 0.25 |
| Empty value | → null (not 0) |
| "BIlled" | → "Billed" |
| Multiple date formats | → ISO yyyy-MM-dd |
