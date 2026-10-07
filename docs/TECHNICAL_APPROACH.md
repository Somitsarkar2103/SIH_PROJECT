# CT Naksha: Technical Architecture & Approach

## Smart India Hackathon 2026

---

## 1. Complete Technology Stack

### 🖥️ Frontend (Client Layer)
* **Framework:** React.js + TypeScript (Single Page Application via Vite)
* **Styling:** Tailwind CSS (Modern, clean, GIS-grade responsive UI)
* **Geospatial Visualization:** Leaflet & Mapbox GL JS (Tile rendering, GeoJSON polygon overlays, vector editing)
* **Icons & UI:** Lucide React, SVG icons
* **State Management:** React hooks / centralized state services with reactive subscription patterns

### 🌐 API Gateway (Orchestration Layer)
* **Runtime/Framework:** Node.js using Express & Fastify
* **Authentication:** JWT with HTTP-only secure cookie refresh tokens
* **Validation:** Zod schema validation
* **Responsibilities:** Request routing, secure multipart file streaming, rate limiting, task queue dispatch, and WebSocket event broadcasting.

### 🧠 AI / Machine Learning Service (Processing Layer)
* **Framework:** Python 3.11+, FastAPI, and TorchServe
* **Deep Learning Backbones:** PyTorch, `segmentation_models_pytorch` (ResNet-34 U-Net, Swin Transformer, Segment Anything Model / SAM)
* **Computer Vision:** OpenCV, SciPy (Texture-energy analysis, Canny Edge Detection, HoughLinesP linear extraction, distance-transform watershed)
* **Geospatial Vectorization:** Rasterio, Shapely, GeoPandas (CRS re-projection, topology-aware polygonization, Douglas-Peucker simplification)

### 💾 Data Persistence (Storage Layer)
* **Spatial Database:** PostgreSQL 16+ with **PostGIS 3.4+** extension (Spatial indexing with GiST, polygon queries, topology validation)
* **Object Storage:** Amazon S3 / MinIO (Raw GeoTIFF orthomosaics, intermediate masks, generated GeoJSONs, export zip packages)
* **Audit Trail:** Append-only relational audit table storing user modifications, timestamps, and previous geometric states.

### ⚙️ Task Queue & Background Processing
* **Broker & Cache:** Redis 7+
* **Task Queue:** RQ (Redis Queue) or Celery workers
* **Responsibilities:** Decouples heavy multi-minute GPU inference tasks from the API, preventing request timeouts and ensuring continuous UI responsiveness.

### 🚀 Deployment & DevOps
* **Containerization:** Docker (Multi-stage builds for frontend, API gateway, and CUDA-enabled GPU worker)
* **Orchestration:** Kubernetes (K8s) with Horizontal Pod Autoscaler (HPA) scaling worker pods based on queue depth
* **CI/CD:** GitHub Actions (Automated linting, unit tests, Docker image building, and container registry push)
* **Monitoring:** Prometheus & Grafana for GPU utilization and inference latency tracking

---

## 2. End-to-End Data Flow Pipeline

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

### Phase 1: Ingestion & Storage
1. Survey officer uploads high-resolution drone imagery via drag-and-drop.
2. Fastify/Express intercepts chunks and streams directly to S3, registering project metadata in PostgreSQL.

### Phase 2: Asynchronous Job Queuing
1. API Gateway dispatches a job record containing the S3 URI to the Redis Task Queue.
2. Frontend immediately receives a Job ID and transitions to an interactive processing status screen listening for updates.

### Phase 3: AI Inference & Geospatial Extraction
1. **Semantic Segmentation:** U-Net predicts masks for building footprints and roads.
2. **Physical Boundary Detection:** Computer vision isolates linear barriers (fences, walls, hedges).
3. **Constrained Tessellation:** Watershed markers expand outwards until stopped by detected physical barriers.
4. **Topology-Aware Vectorization:** Shapely converts raster boundaries into contiguous vector polygons and attaches confidence scores.

### Phase 4: Persistence & Delivery
1. Polygons are stored in PostGIS with GiST indexing; static GeoJSON is saved to S3.
2. API Gateway broadcasts task completion to the frontend via WebSocket.
3. React SPA dynamically renders the parcel boundaries on the interactive map with color-coded confidence indicators.
