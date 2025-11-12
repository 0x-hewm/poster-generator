/**
 * 导出为 PNG
 */
export async function exportToPNG(element, filename = 'poster.png', scale = 4) {
  try {
    if (typeof html2canvas === 'undefined' && typeof window.html2canvas === 'undefined') {
      throw new Error('html2canvas 库未加载');
    }
    
    const html2canvasLib = window.html2canvas || html2canvas;
    const canvas = await html2canvasLib(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      // 添加兼容性选项
      ignoreElements: (element) => {
        // 忽略可能导致问题的元素
        return element.classList?.contains('ignore-export');
      },
      onclone: (clonedDoc) => {
        // 在克隆的文档中移除不兼容的 CSS
        const clonedElement = clonedDoc.querySelector(`#${element.id}`);
        if (clonedElement) {
          // 移除 hover 状态和动画
          clonedElement.style.animation = 'none';
          clonedElement.style.transition = 'none';
        }
      }
    });
    
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    downloadFile(dataUrl, filename);
    return { success: true };
  } catch (error) {
    console.error('PNG export failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 导出为 JPEG
 */
export async function exportToJPEG(element, filename = 'poster.jpg', quality = 0.95, scale = 4) {
  try {
    if (typeof html2canvas === 'undefined' && typeof window.html2canvas === 'undefined') {
      throw new Error('html2canvas 库未加载');
    }
    
    const html2canvasLib = window.html2canvas || html2canvas;
    const canvas = await html2canvasLib(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      ignoreElements: (element) => {
        return element.classList?.contains('ignore-export');
      },
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector(`#${element.id}`);
        if (clonedElement) {
          clonedElement.style.animation = 'none';
          clonedElement.style.transition = 'none';
        }
      }
    });
    
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    downloadFile(dataUrl, filename);
    return { success: true };
  } catch (error) {
    console.error('JPEG export failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 导出为 PDF
 */
export async function exportToPDF(element, filename = 'poster.pdf') {
  try {
    if (typeof html2canvas === 'undefined' && typeof window.html2canvas === 'undefined') {
      throw new Error('html2canvas 库未加载');
    }
    if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
      throw new Error('jsPDF 库未加载');
    }
    
    const html2canvasLib = window.html2canvas || html2canvas;
    const canvas = await html2canvasLib(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      ignoreElements: (element) => {
        return element.classList?.contains('ignore-export');
      },
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector(`#${element.id}`);
        if (clonedElement) {
          clonedElement.style.animation = 'none';
          clonedElement.style.transition = 'none';
        }
      }
    });
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // A4 纸张尺寸（mm）
    const pdfWidth = 210;
    const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    
    return { success: true };
  } catch (error) {
    console.error('PDF export failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 导出为 HTML
 */
export function exportToHTML(element, yamlConfig, filename = 'poster.html') {
  try {
    const styles = Array.from(document.querySelectorAll('style'))
      .map(style => style.textContent)
      .join('\n');
    
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>海报</title>
  <style>
${styles}
  </style>
</head>
<body>
  <div class="wrap">
    ${element.outerHTML}
  </div>
  
  <!-- YAML 配置 -->
  <script type="text/yaml" id="config">
${yamlConfig}
  </script>
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    downloadFile(url, filename);
    URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    console.error('HTML export failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 下载文件
 */
function downloadFile(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 生成文件名
 */
export function generateFilename(prefix = 'poster', extension = 'png') {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  return `${prefix}-${timestamp}.${extension}`;
}
