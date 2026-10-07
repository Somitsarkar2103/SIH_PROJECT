# CadastraAI — Product Walkthrough & Demo Guide

### **AI-Powered Urban Parcel Mapping & Cadastral Feature Extraction**
> *"From Drone Pixels to Verified Parcels."*

---

## 🌟 Executive Overview & Product Positioning

**CadastraAI** is a production-grade GovTech / GeoAI platform built for government land-revenue directorates, cadastral survey commissioners, and municipal planning bodies.

It operationalizes the transition from raw UAV drone photogrammetry to gazetted cadastral boundaries through a strict, transparent human-in-the-loop paradigm:

```
🚁 DRONE IMAGERY (1.8cm GSD)
          ↓
🗺️ ORTHOMOSAIC RECONSTRUCTION
          ↓
🤖 AI FEATURE EXTRACTION (ResNet-Swin v2.4)
          ↓
📐 TOPOLOGICAL CANDIDATE PARCELS
          ↓
📊 EXPLAINABLE CONFIDENCE SCORING
          ↓
👨‍💼 HUMAN SURVEY OFFICER ATTESTATION
          ↓
🔄 TEMPORAL CHANGE DETECTION (2024 vs 2026)
          ↓
📤 GIS-READY EXPORT (GeoJSON, SHP, CSV, PDF)
```

> [!IMPORTANT]
> **Cadastral Legal Rule Compliance:**
> As specified in the domain guidelines, AI is never represented as legally authoritative. The UI uses semantic terms: **Candidate Parcel**, **AI-Generated Boundary**, **Requires Verification**, and **Verified by Survey Officer**.

---

## 🚀 Live Application Access

The application is built, optimized, and running live:
* **Local URL:** [http://localhost:5173/](http://localhost:5173/)
* **Default Active Project:** Bengaluru Urban Survey (Ward 151, Koramangala Sector 4)
* **Survey Demarcation Area:** 12.4 ha | **1,248 Parcels** | **1.8 cm GSD UAV Orthomosaic**

---

## 🧭 The 12-Step Hackathon Judge Demo Storyline

The platform features an interactive **12-Step Judge Tour Bar** (accessible at any time via the top navigation `🎬 Judge Demo Storyline` button). Judges can step through or immediately jump to any stage:

| Step | Screen / Action | What is Demonstrated |
| :--- | :--- | :--- |
| **Step 1** | **Dashboard** | Full GIS workstation overview, summary metric cards (`1,248` total parcels, `1,196` AI extracted, `37` pending review, `94.2%` high confidence, `28` detected changes), and Leaflet satellite/orthomosaic map. |
| **Step 2** | **Survey Projects** | Multi-project catalog with Bengaluru Urban Survey (`12.4 ha`), Mysuru Heritage (`8.2 ha`), Mangaluru Coastal, and Hubballi corridors. |
| **Step 3** | **Drone Imagery** | High-resolution 1.8cm GSD orthomosaic raster viewport with multi-spectral band switching (`RGB True Color`, `CIR Infrared`, `DSM Elevation`, `NDVI Canopy`). |
| **Step 4** | **AI Extraction** | Deep learning feature extraction runner with layer toggles (Buildings, Roads, Boundary cues, Vegetation, Open areas) and confidence threshold slider. |
| **Step 5** | **Parcel Mapping** | Interactive CAD/GIS editing workbench with Select, Draw, Edit Vertices, Split, Merge, Delete, and Snapping tools. |
| **Step 6** | **Select Low-Confidence Parcel** | Focuses on parcel **`P-1025`** (`182.4 m²`) which has tree canopy occlusion. |
| **Step 7** | **AI Explainability Panel** | Inspects **`Boundary Confidence: 64%`** (<70% triggers `Manual verification recommended`) and "Why this boundary?" visual evidence checklist. |
| **Step 8** | **Edit Boundary Mode** | Activates draggable vertex handles directly on the polygon corners in Leaflet. |
| **Step 9** | **Move Polygon Vertex** | Adjusts the north-eastern node around tree canopy to snap to the true physical masonry compound wall. |
| **Step 10** | **Officer Verification** | Clicking `Verify` promotes parcel status to **`🟢 Verified`** (`94%` confidence) with officer audit timestamp. |
| **Step 11** | **Change Detection** | Dual-epoch swipe slider comparing **`2024 Baseline vs 2026 UAV Flight`**, revealing 28 changes including **`CH-028`** (`18.4 m² Building Expansion` on `P-1024`). |
| **Step 12** | **Export Center & Draft Report** | Instant export of standard **GeoJSON**, ESRI **Shapefile**, **CSV Ledger**, and generation of the official **Government Cadastral Draft Report (Form 7-A)** with print/PDF preview. |

---

## 🖥️ Screen-by-Screen Implementation Details

### 1. Login / Landing Screen (`LoginPage.tsx`)
* **Left Section:** Deep navy branding, tagline, official GovTech badge, and visual diagram of the 5-stage cadastral pipeline.
* **Right Section:** Survey Officer authentication form pre-filled with official credentials (`rajesh.varma@revenue.kar.gov.in`) and a prominent **`🚀 Launch Demo Mode`** button for instant evaluation.

### 2. Main GIS Dashboard (`DashboardPage.tsx`)
* **Header:** *"Good afternoon, Survey Officer"* with active survey corridor context.
* **5 Summary Cards:** Total Parcels (`1,248`), AI Extracted (`1,196`), Pending Verification (`37`), High Confidence (`94.2%`), Changes Detected (`28`).
* **GIS Map Viewport (65% of screen):**
  * Seamless Leaflet integration with ESRI World Imagery, OSM, and Carto Dark basemaps.
  * 60+ contiguous Bengaluru cadastral polygons with semantic color logic:
    * 🟢 **Green outline:** Verified by survey officer
    * 🟡 **Yellow outline:** Requires review
    * 🔴 **Red outline:** Major mismatch / anomaly
    * 🔵 **Blue dashed outline:** AI candidate proposal
  * Interactive hover tooltips showing Parcel ID, Area, Confidence, and Status.
  * Real-time layer switcher (Drone Ortho, AI Buildings, Candidate Parcels, Roads, Vegetation, Historical, Change Areas).
* **Parcel Detail Drawer:** Slides in upon polygon selection, displaying area, perimeter, coordinates, AI explainability reasoning, and verification controls.

### 3. Survey Projects & New Ingestion Wizard (`ProjectsPage.tsx` & `NewSurveyModal.tsx`)
* Tabular and card views of ongoing and historical survey campaigns.
* 3-Step New Drone Ingestion Workflow:
  1. *Project Metadata:* Name, Location, Survey Date, Demarcator.
  2. *Upload Drone Data:* Drag-and-drop zone supporting GeoTIFF/JPG/PNG/ZIP with a 1-click **Use Demo Dataset** option.
  3. *Processing Pipeline:* Real-time animated pipeline checklist with telemetry stats (420 images, 1.8cm GSD, 4m 12s time, NVIDIA A100 GPU active).

### 4. High-Res Drone Imagery Inspector (`DroneImageryPage.tsx`)
* Full-resolution raster viewport with digital zoom controls and reticle crosshair.
* Live band rendering switch: True Color RGB, Color Infrared (CIR), Digital Surface Model (DSM Hillshade), and NDVI Vegetation Mask.
* UAV flight metadata card (DJI Matrice 350 RTK, Zenmuse P1 45MP, 120m AGL, 80/75% overlap).

### 5. AI Extraction Workbench (`AIExtractionPage.tsx`)
* Segmentation visualizer displaying detected building footprints (cyan polygons), arterial roads (dashed grey), candidate parcels (blue), and vegetation masks (amber).
* Feature selection checklist and interactive confidence threshold slider (50–95%).
* Live extraction yield metrics: 438 buildings, 62 road segments, 521 boundary candidates, 31 low-confidence areas.

### 6. Cadastral Parcel Mapping (`ParcelMappingPage.tsx`)
* GIS/CAD editing workbench with comprehensive tool modes:
  * `Select Parcel`, `Draw Boundary`, `Edit Vertices`, `Split Parcel`, `Merge Parcels`, `Delete`, `Undo`, `Redo`.
  * Snapping to orthomosaic edges and cadastral grid helper.
* Candidate Parcel Inspector with source evidence breakdown and Approve/Edit/Reject actions.

### 7. Human-in-the-Loop Verification Queue (`VerificationPage.tsx`)
* Visual representation of *"AI Proposes → Human Verifies → System Publishes"*.
* Dynamic queue with search and status filters (`All`, `Needs Review`, `High Confidence`, `Verified`, `Rejected`).
* Quick verification buttons and discrepancy flagging modals.

### 8. Temporal Change Detection (`ChangeDetectionPage.tsx`)
* Multi-temporal dual-epoch comparison between **2024 Baseline** and **2026 UAV Survey**.
* **Interactive Swipe Map:** Smooth draggable splitter handle revealing the historical survey on the left and the current UAV true-color orthomosaic on the right.
* Breakdown of 28 detected changes (14 New Structures, 7 Building Expansions, 4 Boundary Mismatches, 3 Demolitions).
* Change detail drawer with severity classification and enforcement action buttons.

### 9. Analytics & IoU Benchmark (`AnalyticsPage.tsx`)
* Deep learning accuracy metrics: Precision (`95.4%`), Recall (`92.1%`), F1-Score (`93.7%`), and IoU (`88.6%`).
* Semantic Confidence Distribution chart (`90–100%`, `70–89%`, `<70%`).
* Survey Time Saved comparison: ~42 hours manual vs ~11 hours AI-assisted (**74% reduction**), with prominent demo benchmark disclaimer.

### 10. GIS Export Center & Report Preview (`ExportsPage.tsx` & `CadastralReportModal.tsx`)
* Direct downloads:
  * **GeoJSON:** Standards-compliant OGC FeatureCollection with EPSG:4326 coordinates.
  * **ESRI Shapefile:** Zipped SHP/SHX/DBF/PRJ archive.
  * **CSV Ledger:** Comprehensive cadastral attribute ledger.
  * **GeoTIFF:** 1.8cm Cloud-Optimized GeoTIFF raster package.
* **Official Cadastral Survey Draft Report (Form 7-A):**
  * Printable Government letterhead with state emblem badge.
  * Survey metadata, summary statistics, map plate preview, and parcel attribute ledger.
  * Cryptographic GeoAI hash and certified survey officer signature block.

### 11. System Diagnostics & Operational Manual (`SystemStatusModal.tsx` & `HelpModal.tsx`)
* Real-time hardware telemetry: RTK Fixed (99.8%, 0.008m RMS), NVIDIA A100 GPU (42°C, 34% load), EPSG:32643 UTM 43N datum.
* Standard Operating Manual detailing GSD standards, legal boundary caveats, and keyboard navigation shortcuts.

---

## 🎨 Architectural & Design Standard Highlights

* **Typography & Styling:** Inter & JetBrains Mono fonts with Tailwind CSS; crisp GIS contrast designed for field workstations.
* **Semantic Color Palette:**
  * 🟢 `#10B981` — Verified / High Confidence
  * 🟡 `#F59E0B` — Requires Review / Warning
  * 🔴 `#EF4444` — Significant Mismatch / Anomaly
  * 🔵 `#3B82F6` — AI Candidate / Feature Extraction
  * 🔷 `#06B6D4` — UAV Ortho & Sensor Telemetry
* **Service Layer Abstraction:** `parcelService.ts`, `surveyService.ts`, and `exportService.ts` cleanly decoupled from UI state for straightforward integration with future REST/GeoServer endpoints.
