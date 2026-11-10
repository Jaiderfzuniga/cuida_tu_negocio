import type { Diagnostico, Negocio } from '../types';
import { FUNCIONES } from '../types';
import { PREGUNTAS } from '../data/preguntas';

type Fila = { negocio: Negocio; diagnosticos: Diagnostico[] };

const NOMBRE: Record<string, string> = { whatsapp: 'WhatsApp', nequi: 'Nequi', daviplata: 'Daviplata', facebook: 'Facebook', instagram: 'Instagram', correo: 'Correo electrónico', banca: 'Banca en línea' };
const VERDE = 'FF0B7640', AZUL = 'FF1F5FD6', NARANJA = 'FFC2410C', NEGRO = 'FF14131A';
const COLOR_F = { Identificar: VERDE, Proteger: AZUL, Recuperar: NARANJA } as const;
const fecha = (iso: string) => new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });

/**
 * Exporta los datos del panel a un Excel con formato (RF-10): resumen por negocio,
 * todos los intentos con las respuestas en texto y la lista de preguntas.
 * exceljs se carga solo al pulsar el botón, para no hacer más pesada la plataforma.
 */
export async function exportarExcel(todas: Fila[]) {
  // Solo los negocios que ya respondieron al menos un diagnóstico.
  const filas = todas.filter((f) => f.diagnosticos.length > 0);
  const ExcelJS = (await import('exceljs')).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Escudo Digital';

  const cabecera = (ws: import('exceljs').Worksheet, fila = 1) => {
    const r = ws.getRow(fila);
    r.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    r.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    r.height = 32;
    r.eachCell((c) => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NEGRO } }; });
    ws.views = [{ state: 'frozen', ySplit: fila }];
  };
  const borde = (ws: import('exceljs').Worksheet) => ws.eachRow((r) => r.eachCell({ includeEmpty: true }, (c) => {
    c.border = { top: { style: 'thin', color: { argb: 'FFD0CED8' } }, bottom: { style: 'thin', color: { argb: 'FFD0CED8' } }, left: { style: 'thin', color: { argb: 'FFD0CED8' } }, right: { style: 'thin', color: { argb: 'FFD0CED8' } } };
  }));
  const colorFuncion = (ws: import('exceljs').Worksheet, cols: Record<string, number>) => {
    for (const f of FUNCIONES) for (const col of [cols[f]]) {
      ws.getRow(1).getCell(col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLOR_F[f] } };
    }
  };

  // 1. Resumen: una fila por negocio con su diagnóstico inicial y el último.
  const res = wb.addWorksheet('Resumen');
  res.columns = [
    { header: 'Negocio', width: 26 }, { header: 'Tipo', width: 16 }, { header: 'Trabajadores', width: 13 },
    { header: 'Plataformas', width: 26 }, { header: 'Computador', width: 12 }, { header: 'Intentos', width: 10 },
    { header: 'Inicial: Identificar', width: 13 }, { header: 'Inicial: Proteger', width: 13 }, { header: 'Inicial: Recuperar', width: 13 }, { header: 'Inicial: General', width: 13 },
    { header: 'Último: Identificar', width: 13 }, { header: 'Último: Proteger', width: 13 }, { header: 'Último: Recuperar', width: 13 }, { header: 'Último: General', width: 13 },
    { header: 'Cambio general', width: 13 }, { header: 'Estado', width: 16 },
  ];
  for (const { negocio: n, diagnosticos: ds } of filas) {
    const pre = ds.find((d) => d.momento === 'pre');
    const post = [...ds].reverse().find((d) => d.momento === 'post');
    const v = (d: Diagnostico | undefined, k: keyof Diagnostico['niveles']) => (d ? d.niveles[k] / 100 : null);
    const r = res.addRow([n.nombre, n.tipo, n.trabajadores, n.plataformas.map((x) => NOMBRE[x] ?? x).join(', '), n.tienePc ? 'Sí' : 'No', ds.length,
      v(pre, 'Identificar'), v(pre, 'Proteger'), v(pre, 'Recuperar'), v(pre, 'general'),
      v(post, 'Identificar'), v(post, 'Proteger'), v(post, 'Recuperar'), v(post, 'general'),
      pre && post ? (post.niveles.general - pre.niveles.general) / 100 : null,
      post ? 'Completo' : pre ? 'Falta diagnóstico final' : 'Sin diagnóstico']);
    for (let c = 7; c <= 15; c++) { r.getCell(c).numFmt = c === 15 ? '+0%;-0%;0%' : '0%'; r.getCell(c).alignment = { horizontal: 'center' }; }
    r.getCell(16).font = { bold: true, color: { argb: post ? VERDE : 'FF805300' } };
  }
  cabecera(res);
  res.addRow([]);
  res.addRow(['Las preguntas y respuestas de cada negocio están en su propia hoja (pestañas de abajo).']).font = { italic: true, color: { argb: 'FF4C4A56' } };
  colorFuncion(res, { Identificar: 7, Proteger: 8, Recuperar: 9 });
  colorFuncion(res, { Identificar: 11, Proteger: 12, Recuperar: 13 });
  borde(res);


  // 2. Una hoja por negocio: cada pregunta del diagnóstico con la respuesta de cada intento.
  const usados = new Set<string>(['Resumen', 'Respuestas', 'Diagnósticos', 'Preguntas']);
  for (const { negocio: n, diagnosticos: ds } of filas) {
    let nombre = n.nombre.replace(/[\\/?*[\]:]/g, ' ').trim().slice(0, 28) || 'Negocio';
    for (let k = 2; usados.has(nombre); k++) nombre = `${nombre.slice(0, 26)} ${k}`;
    usados.add(nombre);
    const ws = wb.addWorksheet(nombre);
    ws.columns = [{ width: 13 }, { width: 8 }, { width: 58 }, ...ds.map(() => ({ width: 30 }))];
    ws.getCell('A1').value = n.nombre; ws.getCell('A1').font = { bold: true, size: 16 };
    ws.getCell('A2').value = `${n.tipo} · ${n.trabajadores} · ${n.plataformas.map((x) => NOMBRE[x] ?? x).join(', ')} · Computador: ${n.tienePc ? 'Sí' : 'No'}`;
    ws.getCell('A2').font = { color: { argb: 'FF4C4A56' } };
    const cab = ws.getRow(4);
    cab.values = ['Función', 'Código', 'Pregunta', ...ds.map((d, i) => `Intento ${i + 1} · ${d.momento === 'pre' ? 'Diagnóstico inicial' : 'Seguimiento'} · ${fecha(d.fecha)}`)];
    cab.font = { bold: true, color: { argb: 'FFFFFFFF' } }; cab.height = 34;
    cab.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cab.eachCell((c) => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NEGRO } }; });
    PREGUNTAS.forEach((p) => {
      const r = ws.addRow([p.funcion, p.id, p.texto, ...ds.map((d) => { const o = p.opciones.find((x) => x.id === d.respuestas[p.id]); return o ? `${o.texto} (${o.puntos})` : 'No aplica'; })]);
      r.alignment = { wrapText: true, vertical: 'top' };
      r.getCell(1).font = { bold: true, color: { argb: COLOR_F[p.funcion] } };
      ds.forEach((d, i) => {
        const o = p.opciones.find((x) => x.id === d.respuestas[p.id]); const c = r.getCell(4 + i);
        if (!o) c.font = { color: { argb: 'FF8A8794' }, italic: true };
        else c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: o.puntos === 2 ? 'FFE2F0D9' : o.puntos === 1 ? 'FFFFF2CC' : 'FFF8D7D0' } };
      });
    });
    for (const [k, t] of [['Identificar', 'Nivel Identificar'], ['Proteger', 'Nivel Proteger'], ['Recuperar', 'Nivel Recuperar'], ['general', 'Nivel general']] as const) {
      const r = ws.addRow(['', '', t, ...ds.map((d) => d.niveles[k] / 100)]);
      r.font = { bold: true, color: { argb: k === 'general' ? NEGRO : COLOR_F[k] } };
      ds.forEach((_, i) => { r.getCell(4 + i).numFmt = '0%'; r.getCell(4 + i).alignment = { horizontal: 'center' }; });
    }
    ws.views = [{ state: 'frozen', ySplit: 4, xSplit: 3 }];
    ws.eachRow((r, i) => { if (i >= 4) r.eachCell({ includeEmpty: true }, (c) => {
      c.border = { top: { style: 'thin', color: { argb: 'FFD0CED8' } }, bottom: { style: 'thin', color: { argb: 'FFD0CED8' } }, left: { style: 'thin', color: { argb: 'FFD0CED8' } }, right: { style: 'thin', color: { argb: 'FFD0CED8' } } };
    }); });
  }

  // 3. Respuestas (todas juntas, con filtros): una fila por cada pregunta respondida, con la pregunta y la respuesta que puso el usuario.
  const rsp = wb.addWorksheet('Respuestas');
  rsp.columns = [
    { header: 'Negocio', width: 24 }, { header: 'Intento', width: 9 }, { header: 'Momento', width: 18 }, { header: 'Fecha', width: 12 },
    { header: 'Función', width: 13 }, { header: 'Código', width: 9 }, { header: 'Pregunta', width: 62 }, { header: 'Respuesta del usuario', width: 34 }, { header: 'Puntos', width: 9 },
  ];
  for (const { negocio: n, diagnosticos: ds } of filas) {
    ds.forEach((d, i) => {
      for (const p of PREGUNTAS) {
        const o = p.opciones.find((x) => x.id === d.respuestas[p.id]);
        if (!o) continue; // las preguntas que no aplican al negocio no se le mostraron
        const r = rsp.addRow([n.nombre, i + 1, d.momento === 'pre' ? 'Diagnóstico inicial' : 'Seguimiento', fecha(d.fecha), p.funcion, p.id, p.texto, o.texto, o.puntos]);
        r.alignment = { wrapText: true, vertical: 'top' };
        r.getCell(5).font = { bold: true, color: { argb: COLOR_F[p.funcion] } };
        r.getCell(9).alignment = { horizontal: 'center', vertical: 'top' };
        r.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: o.puntos === 2 ? 'FFE2F0D9' : o.puntos === 1 ? 'FFFFF2CC' : 'FFF8D7D0' } };
      }
    });
  }
  cabecera(rsp);
  rsp.autoFilter = { from: 'A1', to: 'I1' };
  borde(rsp);

  // 4. Diagnósticos (una fila por intento): todos los intentos, con la respuesta en texto.
  const dia = wb.addWorksheet('Diagnósticos');
  dia.columns = [
    { header: 'Negocio', width: 24 }, { header: 'Intento', width: 9 }, { header: 'Momento', width: 18 }, { header: 'Fecha', width: 12 },
    { header: 'Identificar', width: 12 }, { header: 'Proteger', width: 12 }, { header: 'Recuperar', width: 12 }, { header: 'General', width: 11 },
    ...PREGUNTAS.map((p) => ({ header: `${p.id}. ${p.texto}`, width: 30 })),
  ];
  for (const { negocio: n, diagnosticos: ds } of filas) {
    ds.forEach((d, i) => {
      const r = dia.addRow([n.nombre, i + 1, d.momento === 'pre' ? 'Diagnóstico inicial' : 'Seguimiento', fecha(d.fecha),
        d.niveles.Identificar / 100, d.niveles.Proteger / 100, d.niveles.Recuperar / 100, d.niveles.general / 100,
        ...PREGUNTAS.map((p) => { const o = p.opciones.find((x) => x.id === d.respuestas[p.id]); return o ? `${o.texto} (${o.puntos})` : 'No aplica'; })]);
      for (let c = 5; c <= 8; c++) { r.getCell(c).numFmt = '0%'; r.getCell(c).alignment = { horizontal: 'center' }; }
      PREGUNTAS.forEach((p, k) => {
        const cel = r.getCell(9 + k); const o = p.opciones.find((x) => x.id === d.respuestas[p.id]);
        cel.alignment = { wrapText: true, vertical: 'top' };
        if (!o) cel.font = { color: { argb: 'FF8A8794' }, italic: true };
        else cel.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: o.puntos === 2 ? 'FFE2F0D9' : o.puntos === 1 ? 'FFFFF2CC' : 'FFF8D7D0' } };
      });
    });
  }
  cabecera(dia);
  dia.getRow(1).height = 78;
  colorFuncion(dia, { Identificar: 5, Proteger: 6, Recuperar: 7 });
  PREGUNTAS.forEach((p, k) => { dia.getRow(1).getCell(9 + k).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLOR_F[p.funcion] } }; });
  borde(dia);

  // 5. Preguntas: qué significa cada código.
  const pre = wb.addWorksheet('Preguntas');
  pre.columns = [{ header: 'Código', width: 9 }, { header: 'Función', width: 13 }, { header: 'Pregunta', width: 70 }, { header: 'Opciones (puntos)', width: 60 }];
  for (const p of PREGUNTAS) {
    const r = pre.addRow([p.id, p.funcion, p.texto, p.opciones.map((o) => `${o.texto} (${o.puntos})`).join(' · ')]);
    r.alignment = { wrapText: true, vertical: 'top' };
    r.getCell(2).font = { bold: true, color: { argb: COLOR_F[p.funcion] } };
  }
  cabecera(pre);
  borde(pre);

  const buf = await wb.xlsx.writeBuffer();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  a.download = `escudo-digital-diagnosticos-${new Date().toISOString().slice(0, 10)}.xlsx`;
  a.click();
}
