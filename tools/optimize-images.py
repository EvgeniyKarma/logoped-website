"""Rebuild responsive hero images: python3 tools/optimize-images.py (Pillow)."""
from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parent.parent
source = root / "hero-section-img.jpg"
destination = root / "assets"
destination.mkdir(exist_ok=True)

with Image.open(source) as image:
    for width in (1920, 2880, 3840):
        size = (width, round(image.height * width / image.width))
        variant = image if size == image.size else image.resize(size, Image.Resampling.LANCZOS)
        output = destination / f"hero-{width}.webp"
        variant.save(output, "WEBP", quality=92, method=6)
        print(f"{output.name}: {output.stat().st_size:,} bytes, {size[0]} × {size[1]}")
