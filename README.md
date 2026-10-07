<div align="center">

# 🛰️ CT Naksha (CadastraAI)
### AI-Powered Urban Parcel Mapping & Cadastral Feature Extraction
**Smart India Hackathon 2026**

> *"From Drone Pixels to Verified Parcels."*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL PostGIS](https://img.shields.io/badge/PostGIS-Spatial_DB-336791?logo=postgresql&logoColor=white)](https://postgis.net/)
[![Python](https://img.shields.io/badge/Python-FastAPI_TorchServe-3776AB?logo=python&logoColor=white)](https://fastapi.tiangolo.com/)

[**Explore Solution**](#-system-architecture) • [**Tech Stack**](#-technology-stack) • [**Quick Start**](#-quick-start) • [**Documentation**](./docs/) • [**Interactive Demo**](#-12-step-demo-walkthrough)

</div>

---

## 📌 Executive Summary

**CT Naksha** is a hackathon-ready GovTech / GeoAI platform built for modern land administration and urban local bodies. It processes high-resolution UAV (drone) orthomosaics, extracts physical features and building footprints using deep learning, enforces barrier-constrained watershed tessellation to generate candidate parcel boundaries, visualizes multi-factor confidence scores, facilitates human-in-the-loop verification, detects temporal changes against historical records via an interactive swipe map, and exports legal-grade GIS datasets (GeoJSON, Shapefile, CSV, GeoTIFF).

---

## 🎯 Key Features

- 🚁 **Drone Imagery Ingestion:** Handles large georeferenced orthomosaics (GeoTIFF, JPG, PNG) with automatic coordinate system detection and GSD validation.
- 🧠 **AI Feature Extraction:** Semantic segmentation models (U-Net / ResNet / Swin Transformer) extract building footprints, road networks, and physical boundary barriers.
- 📐 **Constrained Boundary Tessellation:** Computer vision edge detectors (Canny, HoughLinesP) constrain distance-transform watershed algorithms to prevent boundary leaking.
- 🟢 **Semantic Confidence Scoring:** Color-coded confidence tiers (Green: Verified/High, Yellow: Review Required, Red: Anomaly/Mismatch).
- 🧑‍⚖️ **Human-in-the-Loop Verification Queue:** *AI Proposes → Officer Verifies → System Publishes*. Complete with split, merge, vertex editing, and immutable audit logs.
- 🔍 **Dual-Epoch Change Detection:** Interactive swipe map comparing historic cadastral surveys with current drone data to detect encroachments and unauthorized constructions.
- 📊 **GovTech Analytics & Accuracy Metrics:** Evaluates Precision, Recall, F1, IoU, and calculates estimated surveyor time savings (> 75%).
- 📤 **Enterprise GIS Export Center:** Direct export to **GeoJSON, ESRI Shapefile, CSV, GeoTIFF**, and formal printable cadastral survey reports.

---

## 🏗️ System Architecture

```
[Drone GeoTIFF] ──> [React SPA] ──> [Node.js Gateway] ──> [S3 Storage]
                                            │
                                            ▼
                                   [Redis Task Queue]
                                            │
                                            ▼
                                   [Python AI Worker]
                                 ├── 1. ResNet U-Net Segmentation
                                 ├── 2. Canny / Hough Edge Barriers
                                 ├── 3. Constrained Watershed
                                 └── 4. Shapely Topology Vectorization
                                            │
                                            ▼
                               [PostGIS + S3 Persistence]
                                            │
                                            ▼
[Interactive Map / Verification] <── [WebSocket Notification]
```

### Animated Data Flow
An interactive and animated S-Curve flowchart is available in [`docs/diagrams/ct_naksha_animated_flowchart.html`](./docs/diagrams/ct_naksha_animated_flowchart.html) and vector format [`docs/diagrams/ct_naksha_animated_flowchart.svg`](./docs/diagrams/ct_naksha_animated_flowchart.svg).

---

## 💻 Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend (Client)** | React 18, TypeScript, Vite, Tailwind CSS, Leaflet, Mapbox GL JS, Lucide Icons |
| **API Gateway** | Node.js, Express, Fastify, JWT Auth, Zod Validation, WebSocket |
| **AI / Computer Vision** | Python 3.11+, PyTorch, TorchServe, FastAPI, U-Net (ResNet-34), OpenCV, SciPy |
| **Geospatial Processing**| GDAL / Rasterio, Shapely, GeoPandas (CRS re-projection, topology cleaning) |
| **Data Persistence** | PostgreSQL 16 + PostGIS 3.4 (GiST indexes), Amazon S3 / MinIO (Orthomosaics) |
| **Task Queue & Cache** | Redis 7, RQ (Redis Queue) / Celery |
| **DevOps & Deployment** | Docker, Kubernetes (K8s HPA), GitHub Actions |

---

## 📂 Repository Structure

```
SIH_PROJECT/
├── docs/                                  # Comprehensive SIH documentation
│   ├── presentation/
│   │   ├── ct_naksha_technical_approach.html   # 4-Slide SIH presentation
│   │   └── sih_slide_reference.png             # Reference slide template
│   ├── diagrams/
│   │   ├── ct_naksha_animated_flowchart.html   # Animated data flow UI
│   │   ├── ct_naksha_animated_flowchart.svg    # Standalone animated SVG
│   │   ├── cadastra_workflow_flowchart.svg     # Vertical process diagram
│   │   └── technical_architecture_flowchart.svg# System architecture diagram
│   ├── PROPOSED_SOLUTION.md               # Idea, solution, innovation & uniqueness
│   ├── TECHNICAL_APPROACH.md              # Deep dive on stack, pipeline & approach
│   ├── FEASIBILITY_AND_VIABILITY.md       # Technical, economic & market viability
│   ├── IMPACT_AND_BENEFITS.md             # Measurable governance & operational impact
│   ├── RESEARCH_AND_REFERENCES.md         # 10+ research papers & ISRO Bhuvan datasets
│   ├── FLOWCHART.md                       # Mermaid workflow definitions
│   └── WALKTHROUGH.md                     # Complete 12-step guided demo script
├── public/                                # Public web assets
├── src/
│   ├── components/
│   │   ├── change/                        # Change detection & drawer components
│   │   ├── common/                        # Navbar, Sidebar, Modals, TourGuide
│   │   ├── map/                           # Interactive Map & Swipe comparison
│   │   └── parcel/                        # Parcel inspector, edit toolbars
│   ├── pages/                             # 10 dedicated GovTech navigation pages
│   ├── services/                          # In-memory reactive services (Parcels, Projects, Export)
│   ├── types.ts                           # Full TypeScript interfaces
│   ├── App.tsx                            # Root application controller
│   ├── index.css                          # Tailwind CSS imports & styles
│   └── main.tsx                           # React entry point
├── index.html                             # Single Page Application HTML root
├── package.json                           # NPM dependencies & scripts
├── tailwind.config.js                     # Tailwind configuration
├── tsconfig.json                          # TypeScript configuration
└── vite.config.ts                         # Vite bundler configuration
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher

### 1. Clone & Install
```bash
git clone https://github.com/Somitsarkar2103/SIH_PROJECT.git
cd SIH_PROJECT
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🎬 12-Step Demo Walkthrough

Click **"Launch Demo Mode"** on the login screen to jump into the pre-loaded Bengaluru Urban Survey dataset:

1. **Dashboard Overview:** Review survey statistics (1,248 total parcels, 94.2% high confidence, 28 changes).
2. **Interactive Map:** Inspect parcels with real-time confidence color badges (Green / Yellow / Red).
3. **Parcel Drawer:** View building footprint alignment, perimeter, and area metadata.
4. **New Survey Modal:** Multi-step wizard to upload drone GeoTIFFs or load sample datasets.
5. **AI Extraction Page:** Run semantic building, road, and physical boundary extraction.
6. **CAD Parcel Editor:** Draw, select, split, merge, and edit boundary vertices.
7. **Verification Queue:** Review flagged parcels, resolve anomalies, and approve boundaries.
8. **Swipe Change Detection:** Compare historical 2024 cadastral maps with 2026 drone orthomosaics.
9. **Analytics:** View precision/recall, IoU accuracy metrics, and estimated surveyor time saved.
10. **Export Center:** Download GeoJSON, ESRI Shapefile, GeoTIFF, and print audit reports.
11. **System Diagnostics:** Monitor GNSS lock, RTK telemetry, CRS, and GPU worker status.
12. **Settings:** Adjust AI confidence thresholds and topological validation rules.

---

## 📑 Presentations & Documentation Links

- 📊 **Presentation Slides:** [`docs/presentation/ct_naksha_technical_approach.html`](./docs/presentation/ct_naksha_technical_approach.html) (Ctrl+P to export PDF)
- 🔄 **Animated Flowchart:** [`docs/diagrams/ct_naksha_animated_flowchart.html`](./docs/diagrams/ct_naksha_animated_flowchart.html)
- 📘 **Technical Specifications:** [`docs/TECHNICAL_APPROACH.md`](./docs/TECHNICAL_APPROACH.md)
- 💡 **Proposed Solution & Uniqueness:** [`docs/PROPOSED_SOLUTION.md`](./docs/PROPOSED_SOLUTION.md)
- 🛰️ **ISRO / Bhuvan Datasets & Research:** [`docs/RESEARCH_AND_REFERENCES.md`](./docs/RESEARCH_AND_REFERENCES.md)

---

## 👥 Contributors & Acknowledgements

Developed for **Smart India Hackathon (SIH) 2026**.  
*Repository:* [https://github.com/Somitsarkar2103/SIH_PROJECT](https://github.com/Somitsarkar2103/SIH_PROJECT)
