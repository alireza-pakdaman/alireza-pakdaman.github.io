---
title: 'Hybrid Images'
tagline: 'Computer-vision technique blending two images across viewing distances'
year: '2025'
role: 'Computer vision coursework, taken further'
stack: ['Python', 'OpenCV', 'NumPy', 'Signal processing']
featured: true
order: 2
repo: 'https://github.com/alireza-pakdaman/hybrid_images'
hue: 200
---

A classic computer-vision build: hybrid images combine the low-frequency
components of one image with the high-frequency components of another, so the
picture you see **changes with viewing distance:** one face up close, a
different one from across the room.

## How it works

1. Build Gaussian and Laplacian filters from scratch (no black-box calls).
2. Low-pass one image, high-pass the other.
3. Align, weight, and sum the frequency bands into a single hybrid.

The interesting engineering is in the details: kernel size vs. cutoff frequency
trade-offs, alignment quality, and making the pipeline reusable across image
pairs.

<!-- TODO(Alireza): add 2-3 result images to /src/assets/images and reference them here;
     mention the course if you want (e.g. CSCI ____ Computer Vision). -->
