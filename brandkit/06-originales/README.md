# Originales de arte

Ocho PNG aportados al proyecto, copiados sin recortar, reescalar, recolorear ni modificar su transparencia:

**Esta carpeta es la fuente única versionada de los originales.** Los duplicados de la raíz se retiraron tras comprobar que sus hashes coincidían. El build conserva estos archivos; no los busca en la raíz ni en una carpeta ignorada.

- `d54017bf-565f-49e0-8192-bd0f47bfc050.png`: cabeza original de referencia.
- `spritesmeli1.png`: hoja de expresiones.
- `spritesmeli2.png`: hoja de poses con cuerpo.
- Cinco hojas `Image Aug 19, 2026, ...`: hojas de animación generadas con IA; ya no se recortan para el kit.

Se conservan con sus nombres de origen como referencia y trazabilidad (sus huellas figuran en `03-mascota/animaciones/manifest.json`). No se usan directamente: el personaje de `03-mascota/` es una reconstrucción en pixel art sobre cuadrícula real, revisada a mano, y las animaciones se compusieron desde esas piezas.

El inventario registra dimensiones y presencia de canal alfa. Tener extensión PNG no garantiza un fondo transparente; este paquete conserva lo recibido sin asumir ni eliminar colores de fondo.
