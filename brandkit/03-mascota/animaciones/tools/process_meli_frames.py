from __future__ import annotations

import hashlib
import json
import math
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


SCRIPT = Path(__file__).resolve()
KIT_DIR = SCRIPT.parents[1]
REPO_DIR = SCRIPT.parents[3] / "06-originales"

CANVAS_SIZE = (320, 256)
CANVAS_ANCHOR = (160, 244)
ALPHA_THRESHOLD = 8


@dataclass(frozen=True)
class AnimationSpec:
    id: str
    name: str
    sheet: int
    x_edges: tuple[int, ...]
    y0: int
    y1: int
    baseline: int
    durations_ms: tuple[int, ...]
    playback: str
    anchor_mode: str = "cat"
    erase_rects: tuple[tuple[int, int, int, int], ...] = ()
    note: str = ""

    @property
    def frame_count(self) -> int:
        return len(self.x_edges) - 1


def repeated(value: int, count: int) -> tuple[int, ...]:
    return (value,) * count


SPECS: tuple[AnimationSpec, ...] = (
    AnimationSpec("parpadeo", "Parpadeo", 1, (280, 522, 772, 1027, 1270), 0, 215, 194, (1100, 90, 110, 90), "loop"),
    AnimationSpec("oreja", "Oreja", 1, (280, 520, 772, 1028, 1270), 220, 425, 410, (850, 120, 120, 180), "loop"),
    AnimationSpec("ojos", "Ojos", 1, (280, 501, 722, 945, 1168, 1391, 1615), 430, 630, 610, repeated(260, 6), "loop"),
    AnimationSpec("idle-sentada", "Idle sentada", 1, (255, 426, 597, 773, 948, 1120, 1307, 1470, 1665), 630, 925, 878, repeated(180, 8), "loop"),
    AnimationSpec("cola", "Cola", 2, (40, 238, 450, 656, 865, 1072, 1265, 1465, 1650), 70, 255, 248, repeated(130, 8), "loop", note="La versión final corrige la lectura de cola duplicada."),
    AnimationSpec("siesta", "Siesta", 2, (20, 230, 430, 636, 839, 1046, 1246, 1452, 1655), 255, 456, 452, (420, 420, 360, 320, 280, 320, 360, 420), "loop", erase_rects=((0, 250, 230, 318),), note="Se conservaron completas las Z y se sustituyó la silueta inconsistente del cierre."),
    AnimationSpec("asomarse", "Asomarse", 2, (40, 230, 400, 615, 825, 1037, 1246, 1445, 1650), 512, 675, 666, (180, 140, 120, 120, 600, 140, 120, 220), "loop", anchor_mode="slot", note="Ciclo reconstruido para entrar, mirar y volver a esconderse sin el ojo inconsistente."),
    AnimationSpec("meti-la-pata", "Metí la pata", 2, (160, 376, 626, 860, 1097, 1330, 1560), 728, 925, 909, repeated(150, 6), "once"),
    AnimationSpec("salto-feliz", "Salto feliz", 3, (210, 396, 608, 789, 954, 1129, 1300, 1478, 1650), 45, 280, 263, repeated(110, 8), "once", erase_rects=((0, 40, 270, 126),)),
    AnimationSpec("caminata", "Caminata", 3, (250, 454, 659, 870, 1086, 1316, 1545), 280, 475, 469, repeated(120, 6), "loop"),
    AnimationSpec("preparando-pago", "Preparando pago", 3, (180, 365, 546, 727, 907, 1086, 1265, 1458, 1650), 470, 685, 664, repeated(120, 8), "loop", erase_rects=((0, 470, 260, 550),)),
    AnimationSpec("comprobante", "Comprobante", 3, (170, 350, 535, 705, 893, 1082, 1269, 1466, 1650), 685, 941, 912, repeated(140, 8), "once", erase_rects=((0, 685, 335, 760),)),
    AnimationSpec("reparar-rail", "Reparar rail", 4, (0, 189, 345, 505, 670, 836, 1000, 1164, 1335, 1499, 1672), 65, 240, 224, repeated(120, 10), "once", anchor_mode="slot", note="La versión final mantiene continuidad durante la reparación."),
    AnimationSpec("swap", "Swap", 4, (10, 190, 338, 506, 667, 831, 993, 1168, 1333, 1496, 1672), 306, 455, 438, repeated(140, 10), "once", anchor_mode="slot", note="La versión final usa un bloque estable neutral, no un glifo de plataforma social."),
    AnimationSpec("creciendo", "Creciendo", 4, (0, 190, 345, 512, 673, 831, 995, 1166, 1318, 1495, 1672), 518, 680, 661, repeated(170, 10), "loop"),
    AnimationSpec("card", "Card", 4, (0, 220, 443, 653, 870, 1067, 1252, 1450, 1672), 740, 941, 905, repeated(140, 8), "once"),
    AnimationSpec("linterna", "Linterna", 5, (0, 208, 398, 622, 850, 1038, 1242, 1462, 1672), 57, 247, 246, repeated(140, 8), "loop"),
    AnimationSpec("saludo", "Saludo", 5, (0, 218, 440, 655, 875, 1090, 1300), 300, 465, 456, repeated(150, 6), "once"),
    AnimationSpec("mantenimiento", "Mantenimiento", 5, (0, 174, 349, 524, 693, 860, 1051, 1226, 1373, 1521, 1672), 518, 675, 663, repeated(140, 10), "loop", anchor_mode="slot"),
    AnimationSpec("seguridad", "Seguridad", 5, (0, 185, 385, 609, 833, 1037, 1242, 1456, 1672), 730, 941, 908, repeated(150, 8), "loop"),
)


SOURCE_NAMES = (
    "Image Aug 19, 2026, 01_47_20 AM (1).png",
    "Image Aug 19, 2026, 01_47_21 AM (2).png",
    "Image Aug 19, 2026, 01_47_21 AM (3).png",
    "Image Aug 19, 2026, 01_47_21 AM (4).png",
    "Image Aug 19, 2026, 01_47_21 AM (5).png",
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def rgba_array(image: Image.Image) -> np.ndarray:
    return np.asarray(image.convert("RGBA"))


def cat_anchor_x(frame: Image.Image, fallback: float) -> float:
    data = rgba_array(frame)
    r = data[:, :, 0].astype(np.int16)
    g = data[:, :, 1].astype(np.int16)
    b = data[:, :, 2].astype(np.int16)
    alpha = data[:, :, 3]
    red = (alpha > 32) & (r > 150) & ((r - g) > 45) & ((r - b) > 45) & (g < 165)
    ys, xs = np.nonzero(red)
    if len(xs) < 40:
        return fallback
    y_min = int(ys.min())
    y_max = int(ys.max())
    upper = ys <= y_min + round((y_max - y_min) * 0.62)
    if not np.any(upper):
        return fallback
    return float(np.median(xs[upper]))


def content_bbox(image: Image.Image) -> tuple[int, int, int, int] | None:
    alpha = np.asarray(image.getchannel("A"))
    ys, xs = np.nonzero(alpha > ALPHA_THRESHOLD)
    if len(xs) == 0:
        return None
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def erase_rectangles(image: Image.Image, rects: Iterable[tuple[int, int, int, int]]) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    for rect in rects:
        draw.rectangle(rect, fill=(0, 0, 0, 0))
    return result


def blue_asset_blocks(frame: Image.Image) -> list[tuple[int, int, int, int]]:
    data = rgba_array(frame)
    r = data[:, :, 0].astype(np.int16)
    g = data[:, :, 1].astype(np.int16)
    b = data[:, :, 2].astype(np.int16)
    alpha = data[:, :, 3]
    mask = ((alpha > 20) & (b > 90) & (b > r * 1.15) & (b > g * 1.05)).astype(np.uint8)
    count, _, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    blocks: list[tuple[int, int, int, int]] = []
    for component in range(1, count):
        x, y, width, height, area = (int(value) for value in stats[component])
        if area > 1000 and width >= 35 and height >= 35:
            blocks.append((x, y, width, height))
    return blocks


def draw_pixel_dollar(draw: ImageDraw.ImageDraw, center: tuple[int, int], scale: int = 3) -> None:
    pattern = (
        ".#.",
        "###",
        "#..",
        "###",
        "..#",
        "###",
        ".#.",
    )
    width = len(pattern[0]) * scale
    height = len(pattern) * scale
    x0 = center[0] - width // 2
    y0 = center[1] - height // 2
    for row, line in enumerate(pattern):
        for column, value in enumerate(line):
            if value == "#":
                draw.rectangle(
                    (
                        x0 + column * scale,
                        y0 + row * scale,
                        x0 + (column + 1) * scale - 1,
                        y0 + (row + 1) * scale - 1,
                    ),
                    fill=(255, 255, 255, 255),
                )


def replace_social_glyph(frame: Image.Image) -> Image.Image:
    result = frame.copy()
    draw = ImageDraw.Draw(result)
    data = rgba_array(frame)
    for x, y, width, height in blue_asset_blocks(frame):
        block = data[y : y + height, x : x + width]
        blue = block[:, :, :3][
            (block[:, :, 3] > 32)
            & (block[:, :, 2] > 90)
            & (block[:, :, 2] > block[:, :, 0] * 1.15)
        ]
        if len(blue):
            fill_rgb = tuple(int(value) for value in np.median(blue, axis=0))
        else:
            fill_rgb = (35, 82, 177)
        inset_x = max(10, round(width * 0.23))
        inset_y = max(10, round(height * 0.23))
        draw.rectangle(
            (x + inset_x, y + inset_y, x + width - inset_x - 1, y + height - inset_y - 1),
            fill=(*fill_rgb, 255),
        )
        draw_pixel_dollar(draw, (x + width // 2, y + height // 2), scale=3)
    return result


def repair_sequence(
    animation_id: str,
    frames: list[Image.Image],
    processed: dict[str, list[Image.Image]],
) -> tuple[list[Image.Image], list[str], list[str]]:
    repaired = [frame.copy() for frame in frames]
    provenance = [f"raw-frame-{index + 1:03d}" for index in range(len(frames))]
    actions: list[str] = []

    if animation_id == "cola":
        clean_tail = processed["idle-sentada"]
        repaired = [frame.copy() for frame in clean_tail]
        provenance = [f"idle-sentada/frame-{index + 1:03d}" for index in range(len(clean_tail))]
        actions.append("Se reemplazó la fila con doble cola por la secuencia sentada limpia suministrada en la lámina 1.")

    elif animation_id == "siesta":
        repaired[-1] = repaired[0].copy()
        provenance[-1] = "siesta/raw-frame-001"
        actions.append("Se preservaron completas las Z y el último frame incoherente se sustituyó por el cierre neutral del ciclo.")

    elif animation_id == "asomarse":
        order = (0, 1, 2, 3, 5, 6, 3, 0)
        repaired = [frames[index].copy() for index in order]
        provenance = [f"asomarse/raw-frame-{index + 1:03d}" for index in order]
        actions.append("Se reordenó el ciclo para aparecer, mirar y esconderse; se descartaron la mirada blanca y la pose inclinada incoherente.")

    elif animation_id == "reparar-rail":
        with_meli = repaired[8].copy()
        with_meli.alpha_composite(repaired[7])
        repaired[7] = with_meli
        provenance[7] = "composite(raw-frame-009, raw-frame-008)"
        actions.append("Se mantuvo a Meli visible durante las chispas combinando los frames 8 y 9 sin redibujarla.")

    elif animation_id == "swap":
        repaired = [replace_social_glyph(frame) for frame in repaired]
        provenance = [f"swap/raw-frame-{index + 1:03d}+neutral-dollar-glyph" for index in range(len(repaired))]
        actions.append("Se sustituyó el glifo azul parecido a Discord por un símbolo de activo estable neutral en todos los frames.")

    return repaired, provenance, actions


def normalize_frame(source: Image.Image, spec: AnimationSpec, index: int) -> tuple[Image.Image, dict]:
    x0 = spec.x_edges[index]
    x1 = spec.x_edges[index + 1]
    crop = source.crop((x0, spec.y0, x1, spec.y1))
    fallback = crop.width / 2
    local_anchor_x = fallback if spec.anchor_mode == "slot" else cat_anchor_x(crop, fallback)

    frame = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    dest_x = round(CANVAS_ANCHOR[0] - local_anchor_x)
    dest_y = round(CANVAS_ANCHOR[1] - (spec.baseline - spec.y0))
    frame.alpha_composite(crop, (dest_x, dest_y))

    source_alpha = np.asarray(crop.getchannel("A"))
    edge_pixels = {
        "left": int(np.count_nonzero(source_alpha[:, :1] > ALPHA_THRESHOLD)),
        "right": int(np.count_nonzero(source_alpha[:, -1:] > ALPHA_THRESHOLD)),
        "top": int(np.count_nonzero(source_alpha[:1, :] > ALPHA_THRESHOLD)),
        "bottom": int(np.count_nonzero(source_alpha[-1:, :] > ALPHA_THRESHOLD)),
    }
    return frame, {
        "sourceRect": {"x": x0, "y": spec.y0, "width": x1 - x0, "height": spec.y1 - spec.y0},
        "sourceAnchor": {"x": round(x0 + local_anchor_x, 2), "baselineY": spec.baseline},
        "destinationOffset": {"x": dest_x, "y": dest_y},
        "contentBox": content_bbox(frame),
        "edgePixels": edge_pixels,
    }


def make_strip(frames: list[Image.Image]) -> Image.Image:
    width, height = CANVAS_SIZE
    result = Image.new("RGBA", (width * len(frames), height), (0, 0, 0, 0))
    for index, frame in enumerate(frames):
        result.alpha_composite(frame, (index * width, 0))
    return result


def make_grid(frames: list[Image.Image], columns: int = 5) -> Image.Image:
    width, height = CANVAS_SIZE
    rows = math.ceil(len(frames) / columns)
    result = Image.new("RGBA", (width * columns, height * rows), (0, 0, 0, 0))
    for index, frame in enumerate(frames):
        x = (index % columns) * width
        y = (index // columns) * height
        result.alpha_composite(frame, (x, y))
    return result


def checkerboard(size: tuple[int, int], cell: int = 16) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, "#f8f4ed")
    draw = ImageDraw.Draw(image)
    alt = "#e8dfd5"
    for y in range(0, height, cell):
        for x in range(0, width, cell):
            if (x // cell + y // cell) % 2:
                draw.rectangle((x, y, min(x + cell - 1, width - 1), min(y + cell - 1, height - 1)), fill=alt)
    return image


def make_numbered_contact_sheet(name: str, frames: list[Image.Image]) -> Image.Image:
    thumb_size = (240, 192)
    columns = 5
    rows = math.ceil(len(frames) / columns)
    header = 48
    result = checkerboard((columns * thumb_size[0], header + rows * (thumb_size[1] + 24)), 12)
    draw = ImageDraw.Draw(result)
    font = ImageFont.load_default()
    draw.rectangle((0, 0, result.width, header), fill="#151419")
    draw.text((16, 16), name, fill="#fff8ef", font=font)
    for index, frame in enumerate(frames):
        thumb = frame.copy()
        thumb.thumbnail(thumb_size, Image.Resampling.NEAREST)
        x = (index % columns) * thumb_size[0] + (thumb_size[0] - thumb.width) // 2
        y = header + (index // columns) * (thumb_size[1] + 24) + (thumb_size[1] - thumb.height) // 2
        result.paste(thumb, (x, y), thumb)
        draw.rectangle((x + 4, y + 4, x + 34, y + 22), fill="#151419")
        draw.text((x + 11, y + 8), str(index + 1), fill="#fff8ef", font=font)
    return result


def save_animation_webp(path: Path, frames: list[Image.Image], durations: tuple[int, ...]) -> None:
    frames[0].save(
        path,
        format="WEBP",
        save_all=True,
        append_images=frames[1:],
        duration=list(durations),
        loop=0,
        lossless=True,
        method=6,
    )


def validate_delivery(animations: list[dict]) -> dict:
    errors: list[str] = []
    checks = {
        "animationCount": len(animations),
        "frameCount": 0,
        "rgbaFrames": 0,
        "nonEmptyFrames": 0,
        "framesWithoutCanvasClipping": 0,
        "validStrips": 0,
        "validGrids": 0,
        "validAnimatedWebp": 0,
        "validAnimationManifests": 0,
    }

    for animation in animations:
        animation_id = animation["id"]
        expected = animation["frameCount"]
        checks["frameCount"] += expected
        for frame_entry in animation["frames"]:
            path = KIT_DIR / "frames" / animation_id / Path(frame_entry["file"]).name
            if not path.exists():
                errors.append(f"Missing frame: {path}")
                continue
            with Image.open(path) as frame:
                if frame.size != CANVAS_SIZE:
                    errors.append(f"Unexpected frame size: {path} -> {frame.size}")
                if frame.mode == "RGBA":
                    checks["rgbaFrames"] += 1
                else:
                    errors.append(f"Frame is not RGBA: {path} -> {frame.mode}")
                if content_bbox(frame.convert("RGBA")):
                    checks["nonEmptyFrames"] += 1
                else:
                    errors.append(f"Empty frame: {path}")
                alpha = np.asarray(frame.convert("RGBA").getchannel("A"))
                touches = (
                    np.any(alpha[:, :1] > ALPHA_THRESHOLD)
                    or np.any(alpha[:, -1:] > ALPHA_THRESHOLD)
                    or np.any(alpha[:1, :] > ALPHA_THRESHOLD)
                    or np.any(alpha[-1:, :] > ALPHA_THRESHOLD)
                )
                if not touches:
                    checks["framesWithoutCanvasClipping"] += 1
                else:
                    errors.append(f"Frame touches final canvas edge: {path}")

        strip_path = KIT_DIR / "spritesheets" / f"{animation_id}-strip.png"
        with Image.open(strip_path) as strip:
            expected_strip = (CANVAS_SIZE[0] * expected, CANVAS_SIZE[1])
            if strip.size == expected_strip and strip.mode == "RGBA":
                checks["validStrips"] += 1
            else:
                errors.append(f"Invalid strip: {strip_path} -> {strip.size} {strip.mode}")

        grid_path = KIT_DIR / "spritesheets" / f"{animation_id}-grid.png"
        with Image.open(grid_path) as grid:
            expected_grid = (CANVAS_SIZE[0] * 5, CANVAS_SIZE[1] * math.ceil(expected / 5))
            if grid.size == expected_grid and grid.mode == "RGBA":
                checks["validGrids"] += 1
            else:
                errors.append(f"Invalid grid: {grid_path} -> {grid.size} {grid.mode}")

        preview_path = KIT_DIR / "previews" / f"{animation_id}.webp"
        with Image.open(preview_path) as preview:
            if getattr(preview, "n_frames", 1) == expected:
                checks["validAnimatedWebp"] += 1
            else:
                errors.append(
                    f"Invalid WebP frame count: {preview_path} -> {getattr(preview, 'n_frames', 1)}"
                )

        manifest_path = KIT_DIR / "manifests" / f"{animation_id}.json"
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
        if data.get("frameCount") == expected and len(data.get("frames", [])) == expected:
            checks["validAnimationManifests"] += 1
        else:
            errors.append(f"Invalid animation manifest: {manifest_path}")

    expected_frames = sum(spec.frame_count for spec in SPECS)
    required_totals = {
        "animationCount": len(SPECS),
        "frameCount": expected_frames,
        "rgbaFrames": expected_frames,
        "nonEmptyFrames": expected_frames,
        "framesWithoutCanvasClipping": expected_frames,
        "validStrips": len(SPECS),
        "validGrids": len(SPECS),
        "validAnimatedWebp": len(SPECS),
        "validAnimationManifests": len(SPECS),
    }
    for key, expected_value in required_totals.items():
        if checks[key] != expected_value:
            errors.append(f"Check {key}: expected {expected_value}, got {checks[key]}")

    return {
        "status": "passed" if not errors else "failed",
        "checks": checks,
        "expected": required_totals,
        "errors": errors,
    }


def main() -> None:
    sources: list[Image.Image] = []
    source_meta: list[dict] = []
    for index, name in enumerate(SOURCE_NAMES, start=1):
        path = REPO_DIR / name
        image = Image.open(path).convert("RGBA")
        sources.append(image)
        source_meta.append({
            "sheet": index,
            "file": name,
            "width": image.width,
            "height": image.height,
            "mode": image.mode,
            "sha256": sha256(path),
        })

    frames_root = KIT_DIR / "frames"
    sheets_root = KIT_DIR / "spritesheets"
    previews_root = KIT_DIR / "previews"
    manifests_root = KIT_DIR / "manifests"
    qa_root = KIT_DIR / "qa"
    qa_raw_root = qa_root / "raw-problem-sequences"
    for directory in (frames_root, sheets_root, previews_root, manifests_root, qa_root, qa_raw_root):
        directory.mkdir(parents=True, exist_ok=True)

    manifest_animations: list[dict] = []
    qa_edge_warnings: list[dict] = []
    qa_output_edge_warnings: list[dict] = []
    all_contact_sheets: list[Image.Image] = []
    processed_frames: dict[str, list[Image.Image]] = {}
    repairs_manifest: list[dict] = []

    for spec in SPECS:
        source = erase_rectangles(sources[spec.sheet - 1], spec.erase_rects)
        frame_dir = frames_root / spec.id
        frame_dir.mkdir(parents=True, exist_ok=True)
        raw_frames: list[Image.Image] = []
        frame_meta: list[dict] = []

        for index in range(spec.frame_count):
            frame, meta = normalize_frame(source, spec, index)
            meta.update({
                "index": index,
                "durationMs": spec.durations_ms[index],
            })
            frame_meta.append(meta)
            raw_frames.append(frame)
            if any(meta["edgePixels"].values()):
                qa_edge_warnings.append({"animation": spec.id, "frame": index + 1, **meta["edgePixels"]})

        if spec.id in {"cola", "siesta", "asomarse", "reparar-rail", "swap"}:
            raw_contact = make_numbered_contact_sheet(f"{spec.name} — extracción original", raw_frames)
            raw_contact.save(qa_raw_root / f"{spec.id}-raw.png", format="PNG", optimize=True)

        frames, final_provenance, repair_actions = repair_sequence(spec.id, raw_frames, processed_frames)
        processed_frames[spec.id] = [frame.copy() for frame in frames]
        if repair_actions:
            repairs_manifest.append({"animation": spec.id, "actions": repair_actions})

        for index, (frame, meta) in enumerate(zip(frames, frame_meta)):
            frame_path = frame_dir / f"frame-{index + 1:03d}.png"
            frame.save(frame_path, format="PNG", optimize=True)
            output_alpha = np.asarray(frame.getchannel("A"))
            output_edges = {
                "left": int(np.count_nonzero(output_alpha[:, :1] > ALPHA_THRESHOLD)),
                "right": int(np.count_nonzero(output_alpha[:, -1:] > ALPHA_THRESHOLD)),
                "top": int(np.count_nonzero(output_alpha[:1, :] > ALPHA_THRESHOLD)),
                "bottom": int(np.count_nonzero(output_alpha[-1:, :] > ALPHA_THRESHOLD)),
            }
            meta.update({
                "file": f"../frames/{spec.id}/{frame_path.name}",
                "finalProvenance": final_provenance[index],
                "finalContentBox": content_bbox(frame),
                "outputEdgePixels": output_edges,
            })
            if any(output_edges.values()):
                qa_output_edge_warnings.append({"animation": spec.id, "frame": index + 1, **output_edges})

        strip = make_strip(frames)
        grid = make_grid(frames)
        strip_path = sheets_root / f"{spec.id}-strip.png"
        grid_path = sheets_root / f"{spec.id}-grid.png"
        preview_path = previews_root / f"{spec.id}.webp"
        strip.save(strip_path, format="PNG", optimize=True)
        grid.save(grid_path, format="PNG", optimize=True)
        save_animation_webp(preview_path, frames, spec.durations_ms)

        contact = make_numbered_contact_sheet(spec.name, frames)
        contact.save(qa_root / f"{spec.id}-numbered.png", format="PNG", optimize=True)
        all_contact_sheets.append(contact)

        animation_manifest = {
            "id": spec.id,
            "name": spec.name,
            "frameCount": spec.frame_count,
            "canvas": {"width": CANVAS_SIZE[0], "height": CANVAS_SIZE[1]},
            "anchor": {"x": CANVAS_ANCHOR[0], "y": CANVAS_ANCHOR[1]},
            "playback": spec.playback,
            "totalDurationMs": sum(spec.durations_ms),
            "sourceSheet": spec.sheet,
            "note": spec.note,
            "repairsApplied": repair_actions,
            "strip": f"../spritesheets/{strip_path.name}",
            "grid": f"../spritesheets/{grid_path.name}",
            "preview": f"../previews/{preview_path.name}",
            "frames": frame_meta,
        }
        (manifests_root / f"{spec.id}.json").write_text(
            json.dumps(animation_manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        manifest_animations.append(animation_manifest)

    total_frames = sum(item["frameCount"] for item in manifest_animations)
    master_manifest = {
        "schemaVersion": 1,
        "character": "Meli",
        "brand": "GatoPago",
        "deliveryDate": "2026-08-19",
        "integrationStatus": "asset-package-only",
        "canvas": {"width": CANVAS_SIZE[0], "height": CANVAS_SIZE[1], "format": "RGBA PNG"},
        "anchor": {"x": CANVAS_ANCHOR[0], "y": CANVAS_ANCHOR[1], "meaning": "bottom-center logical anchor"},
        "sourcePolicy": "Original contact sheets were not modified.",
        "repairsPolicy": "Corrections use only supplied drawings, deterministic compositing, frame reuse, and a locally drawn neutral dollar glyph.",
        "sourceSheets": source_meta,
        "animationCount": len(manifest_animations),
        "totalFrames": total_frames,
        "repairs": repairs_manifest,
        "animations": [{
            "id": item["id"],
            "name": item["name"],
            "frameCount": item["frameCount"],
            "manifest": f"manifests/{item['id']}.json",
        } for item in manifest_animations],
    }
    (KIT_DIR / "manifest.json").write_text(
        json.dumps(master_manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (qa_root / "edge-pixel-report.json").write_text(
        json.dumps({
            "sourceCellWarningCount": len(qa_edge_warnings),
            "sourceCellWarnings": qa_edge_warnings,
            "outputCanvasWarningCount": len(qa_output_edge_warnings),
            "outputCanvasWarnings": qa_output_edge_warnings,
        }, indent=2) + "\n",
        encoding="utf-8",
    )

    overview_width = max(image.width for image in all_contact_sheets)
    overview_height = sum(image.height for image in all_contact_sheets)
    overview = Image.new("RGB", (overview_width, overview_height), "#151419")
    y = 0
    for image in all_contact_sheets:
        overview.paste(image, (0, y))
        y += image.height
    overview.save(qa_root / "all-animations-numbered.jpg", format="JPEG", quality=92, optimize=True)

    validation = validate_delivery(manifest_animations)
    (qa_root / "validation-report.json").write_text(
        json.dumps(validation, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    if validation["status"] != "passed":
        raise SystemExit(json.dumps(validation, ensure_ascii=False))

    print(json.dumps({
        "kit": str(KIT_DIR),
        "animations": len(manifest_animations),
        "frames": total_frames,
        "sourceCellEdgeWarnings": len(qa_edge_warnings),
        "outputCanvasEdgeWarnings": len(qa_output_edge_warnings),
        "repairedAnimations": len(repairs_manifest),
        "validation": validation["status"],
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
