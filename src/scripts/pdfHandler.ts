import jsPDF from "jspdf";
import { getData } from "./localStorage";

export function generarPDF() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const data = getData();

  const pageW = 210;
  const margin = 14;
  const colW = (pageW - margin * 2 - 6) / 2;
  let col = 0;
  let y = 20;
  const colX = [margin, margin + colW + 6];

  const newPage = () => { doc.addPage(); y = 20; col = 0; };

  const checkY = (needed: number) => {
    if (y + needed > 285) {
      if (col === 0) { col = 1; y = 20; }
      else { newPage(); }
    }
  };

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(92, 61, 53);
  doc.text("MERCERIA ELY&ELS", pageW / 2, y, { align: 'center' })
  y += 7;
  doc.text('Lista de Precios', pageW / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(138, 96, 88);
  const fecha = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
  doc.text('Actualizado: ' + fecha, pageW / 2, y, { align: 'center' });
  y += 8;
  doc.setDrawColor(196, 117, 127);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  data.forEach(cat => {
    if (cat.products.length === 0) return;

    checkY(14);
    const cx = colX[col];

    // Categoria header
    doc.setFillColor(248, 235, 237);
    doc.roundedRect(cx, y, colW, 7, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(92, 61, 53);
    doc.text(cat.name.toUpperCase(), cx + 4, y + 4.8);
    y += 10;

    cat.products.forEach((p, idx) => {
      checkY(7);
      const cx2 = colX[col];
      if (idx % 2 === 0) {
        doc.setFillColor(252, 248, 247);
        doc.rect(cx2, y - 0.5, colW, 6.5, 'F');
      }
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(58, 37, 32);
      const nameStr = p.name.length > 28 ? p.name.substring(0, 26) + '…' : p.name;
      doc.text(nameStr, cx2 + 2, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(92, 61, 53);
      const priceStr = '$' + p.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      doc.text(priceStr, cx2 + colW - 2, y + 4, { align: 'right' });
      doc.setDrawColor(232, 219, 217);
      doc.setLineWidth(0.2);
      doc.line(cx2, y + 6, cx2 + colW, y + 6);
      y += 6.5;
    });

    y += 4;
  });

  const fechaActual = new Date().toISOString().split('T')[0];
  doc.save(`${fechaActual}-lista-precios-merceria.pdf`);
}