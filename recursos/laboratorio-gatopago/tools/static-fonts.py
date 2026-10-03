"""Exportación mecánica de instancias de Recursive para impresión, sin editar originales."""
from pathlib import Path
import sys, json, hashlib
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

lab = Path(sys.argv[1]).resolve()
source = lab / '.qa/fonts/recursive-variable.ttf'
variants = [
    ('reading-regular', 'GatoPagoLabReading', 'Regular', {'wght':400,'MONO':0,'CASL':0,'slnt':0,'CRSV':0}),
    ('reading-bold', 'GatoPagoLabReading', 'Bold', {'wght':700,'MONO':0,'CASL':0,'slnt':0,'CRSV':0}),
    ('heading', 'GatoPagoLabHeading', 'Regular', {'wght':850,'MONO':0,'CASL':0.5,'slnt':-8,'CRSV':0.5}),
    ('mono', 'GatoPagoLabMono', 'Regular', {'wght':500,'MONO':1,'CASL':0,'slnt':0,'CRSV':0}),
]
manifest = []
for filename, family, style, axes in variants:
    font = TTFont(source)
    instance = instantiateVariableFont(font, axes, inplace=False)
    for name_id, value in [(1,family),(2,style),(4,family+' '+style),(6,family+'-'+style),(16,family),(17,style)]:
        for record in instance['name'].names:
            if record.nameID == name_id:
                record.string = value.encode(record.getEncoding())
    target = lab / 'assets/fonts' / (filename+'.ttf')
    instance.save(target)
    manifest.append({'file':target.name,'family':family,'axes':axes,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
(lab / 'assets/fonts/procedencia.json').write_text(json.dumps({'source':'../recursive.woff2','license':'../LICENSE-font.txt','method':'fontTools instantiateVariableFont; renamed private static instances, outlines not redrawn','instances':manifest},indent=2),encoding='utf-8')
print(json.dumps({'staticInstances':len(manifest)}))
