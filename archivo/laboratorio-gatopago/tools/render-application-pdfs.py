from pathlib import Path
import sys, json, hashlib
import fitz
lab = Path(sys.argv[1]).resolve()
output = lab / '.qa/applications'
output.mkdir(parents=True, exist_ok=True)
records = []
for folder, filename, stem in [('qr', 'qr-imprimible.pdf', 'qr'), ('comprobante', 'comprobante.pdf', 'receipt')]:
    source = lab / '06-aplicaciones' / folder / filename
    document = fitz.open(source)
    assert len(document) == 1
    page = document[0]
    scale = 1100 / max(page.rect.width, page.rect.height)
    image = output / (stem + '.png')
    page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False).save(image)
    records.append({'pdf': str(source.relative_to(lab)).replace('\\','/'), 'pdfSHA256': hashlib.sha256(source.read_bytes()).hexdigest(), 'render': str(image.relative_to(lab)).replace('\\','/'), 'renderSHA256': hashlib.sha256(image.read_bytes()).hexdigest(), 'renderer': 'PyMuPDF ' + fitz.VersionBind})
(output / 'pdf-render-provenance.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
print(json.dumps({'renderedCurrentPDFs': records}))
