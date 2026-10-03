from pathlib import Path
import sys,json,hashlib
import cv2
from PIL import Image
from pypdf import PdfReader
lab=Path(sys.argv[1]).resolve()
root=lab/'06-aplicaciones'
manifest=json.loads((root/'manifest.json').read_text(encoding='utf-8'))
source=json.loads((root/'fuentes.json').read_text(encoding='utf-8'))
assert len(manifest['items'])==7
for record in manifest['files']:
    data=(root/record['file']).read_bytes()
    assert hashlib.sha256(data).hexdigest()==record['sha256']
decoded=[]
for file in ['qr/codigo.png','qr/qr-imprimible.png']:
    image=cv2.imread(str(root/file))
    for scale in [1,.75,1.5]:
        resized=cv2.resize(image,None,fx=scale,fy=scale,interpolation=cv2.INTER_NEAREST)
        text,points,straight=cv2.QRCodeDetector().detectAndDecode(resized)
        normalized=False
        if not text and max(resized.shape[:2])>900:
            # OpenCV falla con ciertos códigos muy grandes; registrar la normalización.
            ratio=740/max(resized.shape[:2])
            normalized=True
            text,points,straight=cv2.QRCodeDetector().detectAndDecode(cv2.resize(resized,None,fx=ratio,fy=ratio,interpolation=cv2.INTER_NEAREST))
        assert text==source['qr']['payload'], (file,scale,text)
        decoded.append({'file':file,'scale':scale,'decoded':text,'detectorNormalizedTo740px':normalized})
matrix=json.loads((root/'qr/matriz.json').read_text())
assert matrix['quietZone']==4 and len(matrix['data'])==matrix['size']**2
for entry in manifest['artworks']:
    image=Image.open(root/entry['png'])
    assert image.size==(entry['width'],entry['height'])
    svg=(root/entry['editable']).read_text(encoding='utf-8')
    assert '<text ' in svg or entry['id']=='cover'
    assert 'data:font/ttf;base64,' in svg
receipt=(root/'comprobante/index.html').read_text(encoding='utf-8')
assert '125,25 USDC' in receipt and 'Datos ficticios.' in receipt
assert 'Meli' not in receipt
result={'pieces':7,'filesVerified':len(manifest['files']),'qrDecoding':decoded,'exactArtworkSizes':True,'editableSVGText':True,'receiptAmountsConsistent':True,'scope':'archivos, hashes, tamaños, datos de ejemplo y decodificación; no prueba impresión física ni clientes de correo'}
pdf_checks=[]
for file,width,height in [('comprobante/comprobante.pdf',210,297),('qr/qr-imprimible.pdf',148,210)]:
    pdf=PdfReader(root/file)
    assert len(pdf.pages)==1,(file,len(pdf.pages))
    page=pdf.pages[0]
    assert abs(float(page.mediabox.width)*25.4/72-width)<.5
    assert abs(float(page.mediabox.height)*25.4/72-height)<.5
    text=page.extract_text()
    assert 'GatoPago' in text and ('Datos ficticios.' in text or 'No solicita ni ejecuta un pago.' in text),text
    pdf_checks.append({'file':file,'pages':1,'sizeMM':[width,height],'nativeText':True})
render_records=json.loads((lab/'.qa/applications/pdf-render-provenance.json').read_text(encoding='utf-8'))
for record in render_records:
    assert hashlib.sha256((lab/record['pdf']).read_bytes()).hexdigest()==record['pdfSHA256'], 'La captura procede de otro PDF'
    assert hashlib.sha256((lab/record['render']).read_bytes()).hexdigest()==record['renderSHA256']
pdf_image=cv2.imread(str(lab/'.qa/applications/qr.png'))
decoded_pdf,_,_=cv2.QRCodeDetector().detectAndDecode(pdf_image)
assert decoded_pdf==source['qr']['payload'],decoded_pdf
result.update({'pdfChecks':pdf_checks,'renderedPDFQRDecoded':decoded_pdf,'currentPDFRenderHashes':render_records})
(lab/'.qa/applications').mkdir(parents=True,exist_ok=True)
(lab/'.qa/applications/verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
