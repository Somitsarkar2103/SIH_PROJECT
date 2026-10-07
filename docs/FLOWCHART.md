# CadastraAI End‑to‑End Workflow

```mermaid
flowchart TD
    A[Login / Demo Mode] --> B[Upload Drone Orthomosaic]
    B --> C[AI Feature Extraction]
    C --> D[Generate Candidate Parcels]
    D --> E[Assign Confidence Scores]
    E --> F{Confidence >= Threshold?}
    F -- Yes --> G[Auto‑accept Parcel]
    F -- No --> H[Add to Verification Queue]
    H --> I[Human Review & Edit]
    I --> J[Validation Rules Check]
    J --> K{Validation Passed?}
    K -- Yes --> L[Approve Parcel]
    K -- No --> M[Reject / Re‑process]
    L --> N[Temporal Change Detection]
    N --> O[Swipe‑Map Visualization]
    O --> P[Export GIS Formats]
    P --> Q[Generate Audit Report]
    Q --> R[End]
    G --> N
    M --> H
```

**Legend**
- **Auto‑accept**: Parcels with high confidence are directly saved.
- **Verification Queue**: Low‑confidence parcels await human verification.
- **Validation Rules**: Topology, size, and attribute checks.
- **Change Detection**: Compare new parcels with historic layers.
- **Export**: GeoJSON, Shapefile, CSV, GeoTIFF.
