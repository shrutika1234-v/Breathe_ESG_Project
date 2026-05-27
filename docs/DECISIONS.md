# DECISIONS

- Used CSV uploads because enterprise operational data is commonly exported manually as CSV files.
- Used a single normalized emission model for simplified ingestion and review.
- Added suspicious detection for unrealistic quantities above 100000.
- Focused on ingestion workflow instead of complex integrations.

If more time was available:
- real SAP integration
- authentication roles
- automated emissions calculations
could be added.