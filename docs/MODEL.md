# MODEL

The application stores normalized ESG records from SAP, utility, and travel sources.

Main table:
- EmissionRecord

Fields:
- source_type
- category
- quantity
- unit
- suspicious
- status
- uploaded_at

The model supports:
- source tracking
- analyst review
- suspicious data detection
- audit visibility

Each uploaded row is stored in normalized format for easier analyst review.