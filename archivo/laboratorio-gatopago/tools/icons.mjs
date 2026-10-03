// Geometría original para este laboratorio. No se importa otra biblioteca.
const line = (d) => `<path d="${d}"/>`;
const square = (x, y, w, h = w) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const pixel = (x, y, w = 2) => `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="currentColor" stroke="none"/>`;
const arrow = (x, y, dir) => dir === 'down' ? line(`M${x} ${y-6}v12m-4-4 4 4 4-4`) : line(`M${x} ${y+6}V${y-6}m-4 4 4-4 4 4`);
export const icons = [
 ['cobrar','Cobrar','pagos',square(4,4,16)+arrow(12,12,'down')],
 ['enviar','Enviar','pagos',line('M4 20V4h16M4 20 20 4m-8 0h8v8')],
 ['pagar','Pagar','pagos',square(3,5,18,14)+line('M3 10h18M6 15h5')+pixel(16,14)],
 ['cambiar','Cambiar','pagos',line('M3 8h17l-4-4m4 12H4l4 4M20 8v4M4 16v-4')],
 ['escanear','Escanear','pagos',line('M3 8V3h5m8 0h5v5M3 16v5h5m8 0h5v-5M7 12h10')+pixel(10,6)+pixel(10,16)],
 ['qr','QR','pagos',square(3,3,6)+square(15,3,6)+square(3,15,6)+pixel(5,5)+pixel(17,5)+pixel(5,17)+line('M13 13h4v4h4v4h-8v-4m0-4v2m8-4v2')],
 ['actividad','Actividad','cuenta',line('M3 5h18M3 19h18M3 13h4l3-5 4 8 3-5h4')],
 ['cuenta','Cuenta','cuenta',square(8,3,8,7)+line('M4 21v-5l4-3h8l4 3v5Z')],
 ['saldo','Saldo','cuenta',square(3,5,18,15)+line('M3 5V3h14v2M21 10h-7v5h7')+pixel(16,11)],
 ['contactos','Contactos','cuenta',square(7,5,6)+line('M4 20v-5l3-2h6l3 2v5m0-15h4v6h-2m0 2 3 2v5')],
 ['comprobante','Comprobante','pagos',line('M5 3h14v18l-3-2-4 2-4-2-3 2ZM8 7h8M8 11h8M8 15h4')],
 ['descargar','Descargar','sistema',arrow(12,10,'down')+line('M3 16v5h18v-5')],
 ['compartir','Compartir','sistema',square(3,9,6)+square(15,3,6)+square(15,15,6)+line('M9 10 15 6M9 14l6 4')],
 ['copiar','Copiar','sistema',square(8,8,13,13)+line('M16 8V3H3v13h5')],
 ['seguridad','Seguridad','seguridad',line('M12 3 3 6v7l3 5 6 3 6-3 3-5V6ZM8 12l3 3 5-6')],
 ['passkey','Llave segura','seguridad',square(3,4,8)+pixel(6,7)+line('M11 12l9 9m-2-2 3-3m-6 0 3-3')],
 ['bloquear','Bloquear','seguridad',square(5,10,14,11)+line('M8 10V6l2-3h4l2 3v4M12 14v3')],
 ['dispositivo','Dispositivo','seguridad',square(6,2,12,20)+line('M10 5h4M10 19h4')],
 ['verificar','Verificar','seguridad',square(3,3,18)+line('M7 12l4 4 6-8')],
 ['alerta','Precaución','estados',line('M12 3 2 21h20ZM12 9v5')+pixel(11,17)],
 ['pendiente','Pendiente','estados',square(3,3,18)+line('M12 6v7h5')],
 ['error','Error','estados',square(3,3,18)+line('M8 8l8 8M16 8l-8 8')],
 ['ayuda','Ayuda','sistema',square(3,3,18)+line('M8 8V6h8v5l-4 2v2')+pixel(11,17)],
 ['notificaciones','Notificaciones','cuenta',line('M5 16V7l4-3h6l4 3v9l2 3H3ZM10 21h4M12 2v2')],
 ['ajustes','Ajustes','sistema',line('M3 6h18M3 12h18M3 18h18')+square(7,4,4)+square(15,10,4)+square(5,16,4)],
 ['buscar','Buscar','sistema',square(3,3,12)+line('M15 15l6 6')],
 ['correo','Correo','sistema',square(3,5,18,14)+line('M3 6l9 7 9-7')],
 ['salir','Salir','sistema',line('M10 3H3v18h7M9 12h12l-4-4m4 4-4 4')],
 ['ruta','Ruta','pagos',square(3,3,4)+square(17,17,4)+line('M7 5h12v6H5v8h12')],
 ['crecer','Crecer','cuenta',line('M12 21V9M12 14H7L3 10V5h5l4 4m0 4h5l4-4V4h-5l-4 4M5 21h14')],
 ['api','API','negocios',line('M8 5 2 12l6 7M16 5l6 7-6 7M14 3l-4 18')],
 ['negocio','Negocio','negocios',square(3,8,18,13)+line('M8 8V3h8v5M3 13h18M10 13v3h4v-3')]
].map(([id,label,category,body])=>({id,label,category,body}));

export function iconSVG(icon, {sprite=false}={}) {
 const attrs='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"';
 return sprite ? `<symbol id="gp-${icon.id}" ${attrs}>${icon.body}</symbol>` : `<svg xmlns="http://www.w3.org/2000/svg" ${attrs} role="img" aria-labelledby="title-${icon.id}"><title id="title-${icon.id}">${icon.label}</title>${icon.body}</svg>`;
}
