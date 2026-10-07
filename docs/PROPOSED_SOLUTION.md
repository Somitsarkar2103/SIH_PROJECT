# CT Naksha / CadastraAI: Proposed Solution

## Smart India Hackathon 2026

**AI-Powered Urban Parcel Mapping & Cadastral Feature Extraction**  
*Tagline: "From Drone Pixels to Verified Parcels"*

---

## 1. Idea, Solution & Prototype Overview

### Core Concept
CT Naksha (CadastraAI) bridges the gap between high-resolution aerial surveying and legally verified cadastral land records. It combines high-resolution UAV (drone) orthomosaics with state-of-the-art computer vision and deep learning (U-Net, ResNet, Swin Transformer, and edge-constrained watershed segmentation) to automatically detect boundaries, generate candidate parcels, calculate confidence scores, and enforce human-in-the-loop verification.

### System Components
* **Interactive Frontend (React + TypeScript SPA):** GIS-grade web interface featuring Leaflet / Mapbox GL interactive mapping, drawing/editing toolbars, dual-epoch swipe maps for temporal change detection, and a human-in-the-loop verification queue.
* **Orchestration API Gateway (Node.js / Express / Fastify):** Secure, rate-limited gateway managing authentication (JWT), georeferenced file uploads, task scheduling, and real-time WebSocket status notifications.
* **AI & Geospatial Processing Engine (Python / FastAPI / TorchServe):** Deep learning and computer vision pipeline delivering semantic segmentation (building footprints, roads), physical boundary extraction (Canny edges, Hough transforms), constrained watershed tessellation, and topology-aware polygon vectorization via Shapely and GeoPandas.
* **Spatial Persistence (PostgreSQL + PostGIS & S3):** PostGIS database for indexing and spatial querying of parcel polygons with immutable audit logs; S3 object storage for raw GeoTIFF orthomosaics and exported layers.
* **Asynchronous Queue (Redis + RQ/Celery):** Decoupled background task queue ensuring instant UI responsiveness during heavy GPU model inference.

---

## 2. Detailed Explanation of the Proposed Solution

1. **Geospatial Ingestion & Coordinate Validation**
   - Survey officers upload georeferenced drone orthomosaics (GeoTIFF / JPG / ZIP up to multi-GB scale).
   - The platform extracts CRS (Coordinate Reference System) metadata, validates Ground Sampling Distance (GSD), and stores assets in cloud storage.

2. **Multi-Stage AI Feature Extraction**
   - **Semantic Segmentation:** Deep learning models extract building footprints and land-use classes with per-pixel probability maps.
   - **Physical Boundary Extraction:** Computer vision filters (texture-energy analysis, Canny Edge Detection, HoughLinesP) identify fences, compound walls, hedges, and road edges as physical barriers.
   - **Constrained Tessellation:** A distance-transform watershed algorithm dynamically generates cadastral parcels, strictly bounded by the detected physical barriers to prevent boundary leaking.
   - **Topology-Aware Simplification:** Shapely and GeoPandas smooth and simplify polygons while maintaining contiguous boundaries without gaps or overlaps.

3. **Multi-Factor Confidence Scoring**
   - Each generated parcel is assigned a confidence score based on boundary sharpness, building footprint alignment, and historical cadastral proximity.
   - Semantically categorized:
     - 🟢 **High Confidence (≥ 90%):** Auto-provisional parcel.
     - 🟡 **Requires Review (70% - 89%):** Queued for officer verification.
     - 🔴 **Anomaly / Low Confidence (< 70%):** Flagged for on-ground re-survey or manual boundary adjustment.

4. **Human-in-the-Loop Verification Queue**
   - Implements the golden GovTech principle: *AI Proposes → Human Verifies → System Publishes*.
   - Survey officers can inspect parcel evidence, split, merge, edit vertices, and approve or reject candidates with one click.
   - Every modification is recorded in an immutable audit trail for legal compliance.

5. **Temporal Change Detection (Dual-Epoch Swipe Map)**
   - Automatically compares the newly surveyed boundaries with historic cadastral datasets (e.g., 2024 vs. 2026).
   - Detects encroachments, new unauthorized constructions, demolished structures, and boundary shifts.
   - Interactive split-screen swipe tool allows side-by-side visual comparison.

6. **Standardized GIS Export & Automated Reporting**
   - Exports survey packages directly into industry-standard GIS formats: **GeoJSON, ESRI Shapefile, GeoTIFF, and CSV**.
   - Generates formal PDF/HTML cadastral survey reports complete with survey officer signatures, coordinate tables, area calculations, and accuracy metrics.

---

## 3. How It Addresses the Problem

| Traditional Challenge | CT Naksha Solution |
| :--- | :--- |
| **Labor-Intensive Manual Digitization:** Takes weeks or months to manually trace parcel lines from aerial photos. | **Instant Candidate Generation:** AI extracts building footprints and parcel candidates in seconds, reducing manual drawing by > 80%. |
| **Inconsistent Quality & Boundary Leaks:** Manual vectorization leads to topology errors, sliver polygons, and overlaps. | **Constrained Watershed & Topology Rules:** Mathematical boundary enforcement guarantees clean contiguous polygons without overlaps or gaps. |
| **Black-Box AI Trust Deficit:** Purely automated AI systems lack legal validity and cannot be audited in court. | **Human-in-the-Loop Governance:** Transparent confidence visualization, audit logging, and mandatory verification safeguards legal validity. |
| **Unchecked Encroachment & Delayed Land Records:** Historic land records remain outdated for decades. | **Dual-Epoch Change Detection:** Instantly flags physical discrepancies between historic maps and latest drone survey. |
| **Proprietary Vendor Lock-in:** Expensive closed GIS software licenses inaccessible to smaller urban local bodies. | **Open-Standards GovTech:** Built on modern open-source stacks (PostGIS, Mapbox GL / Leaflet, FastAPI, React). |

---

## 4. Innovation and Uniqueness

1. **Physical Boundary-Constrained Tessellation:** Unlike generic segmentation that outputs blurry pixel blobs, CT Naksha fuses deep learning building masks with edge-detected physical barriers (walls, fences, road curbs) to generate legally plausible parcel boundaries.
2. **Confidence-Weighted Vector Output:** Every single polygon carries transparent metadata (`confidence_score`, `boundary_evidence`, `source_type`), enabling risk-based automated routing.
3. **Integrated Dual-Epoch Temporal Swipe Comparison:** Native split-screen swipe tool for instant historic vs. current survey verification within the web interface.
4. **Hackathon-Ready GovTech UI/UX:** Tailored specifically for revenue department officers and survey teams, featuring an interactive 12-step guided demo tour, GIS-grade palettes, and instant demonstration capabilities.
