from pathlib import Path
import sys, json, hashlib
from pypdf import PdfReader
lab = Path(sys.argv[1]).resolve()
pdf = lab / '02-manual/manual-visual-gatopago.pdf'
reader = PdfReader(pdf)
assert len(reader.pages) == 12
pages=[]
for i,page in enumerate(reader.pages,1):
    text=page.extract_text()
    assert 'GatoPago' in text
    assert f'{i:02} / 12' in text
    assert 590<float(page.mediabox.width)<600
    assert 837<float(page.mediabox.height)<847
    pages.append({'page':i,'textCharacters':len(text),'numberingPresent':True})
text=' '.join(' '.join(p.extract_text().split()) for p in reader.pages)
assert all(term in text for term in ['Recursive','USDC'])
snapshot = json.loads((lab / 'fuentes/manual-inventory-v1.json').read_text(encoding='utf-8'))
assert hashlib.sha256(pdf.read_bytes()).hexdigest() == snapshot['PDFSHA256']
assert all(term in text for term in [f"{snapshot['PNGSteps']} pasos PNG",f"{snapshot['animationActions']} alternativas raster",'41 pasos raster','41 SVG editables','22 archivos descargables'])
assert 'todavía están en preparación' not in text
result={'file':'02-manual/manual-visual-gatopago.pdf','sha256':hashlib.sha256(pdf.read_bytes()).hexdigest(),'pages':pages,'scope':'estructura, texto y numeración; complementa, no reemplaza, revisión PNG'}
(lab / '.qa/manual/text-check.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps({'pagesVerified':len(pages),'sha256':result['sha256']}))
