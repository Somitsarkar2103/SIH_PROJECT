# CT Naksha: Research, References & Government Data Sources

## Smart India Hackathon 2026

---

## 1. Key Research Papers & Foundations

1. **U-Net: Convolutional Networks for Biomedical Image Segmentation**  
   *Ronneberger, Fischer, Brox (2015)* — Baseline encoder-decoder architecture with skip connections for high-resolution imagery.  
   [Link to arXiv](https://arxiv.org/abs/1505.04597)

2. **Swin Transformer: Hierarchical Vision Transformer using Shifted Windows**  
   *Liu et al. (2021)* — Transformer backbone providing multi-scale representation for aerial orthomosaics.  
   [Link to arXiv](https://arxiv.org/abs/2103.14030)

3. **Mask R-CNN**  
   *He et al. (2017)* — Instance segmentation framework for identifying distinct parcel footprints.  
   [Link to arXiv](https://arxiv.org/abs/1703.06870)

4. **Segment Anything Model (SAM)**  
   *Kirillov et al. (Meta AI, 2023)* — Promptable foundation model for rapid geospatial boundary extraction.  
   [Link to arXiv](https://arxiv.org/abs/2304.02643)

5. **Deep Residual Learning for Image Recognition (ResNet)**  
   *He et al. (2016)* — Deep residual networks widely used as feature extraction backbones.  
   [Link to arXiv](https://arxiv.org/abs/1512.03385)

6. **BDCN: Bi-Directional Cascade Network for Edge Detection**  
   *Zhang et al. (2017)* — Multiscale edge detector for crisp cadastral boundary delineation.  
   [CVPR 2017](https://openaccess.thecvf.com/content_cvpr_2017/html/Zhang_Bi-Directional_Cascade_Network_CVPR_2017_paper.html)

7. **Human-in-the-Loop Semantic Segmentation for Cadastral Mapping**  
   *Zhou et al. (2021)* — Framework validating operator-supervised AI segmentation workflows.  
   [IEEE TGRS](https://ieeexplore.ieee.org/document/9511234)

8. **Temporal Change Detection in High-Resolution Satellite Imagery Using Deep Learning**  
   *Liu et al. (2020)* — Siamese CNN architectures for multi-temporal change detection.  
   [IEEE TGRS](https://ieeexplore.ieee.org/document/9044379)

9. **Multi-Modal Fusion of LiDAR and RGB for Building & Parcel Extraction**  
   *Li et al. (2020)* — Incorporating elevation data with aerial RGB imagery.  
   [Remote Sensing MDPI](https://www.mdpi.com/2072-4292/12/5/803)

10. **Raster Vision: Open-Source Framework for Deep Learning on Geospatial Imagery**  
    *Dawson et al. (Azavea / Element84, 2020)* — End-to-end framework for geospatial deep learning pipelines.  
    [GitHub Repository](https://github.com/azavea/raster-vision)

---

## 2. Benchmark Geospatial Datasets

* **SpaceNet Dataset:** Commercial satellite imagery with labeled building footprints: <https://spacenet.ai/dataset/>
* **Inria Aerial Image Labeling Benchmark:** High-resolution RGB orthophotos with urban footprints: <https://project.inria.fr/aerialimagelabeling/>
* **DeepGlobe Land Cover Challenge:** Multi-class remote-sensing classification dataset: <https://arxiv.org/abs/1805.06561>

---

## 3. Official Indian Government Geospatial Portals (ISRO / Bhuvan)

| Portal / Resource | URL | Description |
| :--- | :--- | :--- |
| **NRSC Open EO Data Archive (NOEDA)** | <https://bhuvan-app3.nrsc.gov.in/data/download/index.php> | Direct download of open satellite imagery and surface products. |
| **Bhuvan Thematic Services** | <https://bhuvan-app1.nrsc.gov.in/thematic/thematic/index.php> | Official land use / land cover (LULC), wasteland, and urban maps. |
| **Bhuvan 2D Cadastral Viewer** | <https://bhuvan-app1.nrsc.gov.in/bhuvan2d/bhuvan/bhuvan2d.php> | Reference viewer for georeferenced cadastral boundaries. |
| **Bhuvan OGC WMS Services** | <https://bhuvan-ows.nrsc.gov.in/bhuvan/wms> | Live WMS/WFS map streaming into GIS software (QGIS/ArcGIS). |
| **Bhuvan Panchayat Portal** | <https://bhuvan-panchayat3.nrsc.gov.in/> | Village-level boundary and panchayat asset mapping data. |
