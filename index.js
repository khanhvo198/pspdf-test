const { TextAnnotation } = PSPDFKit.Annotations;

import "/assets/pspdfkit.js";

function saveByteArray(reportName, byte) {
  var blob = new Blob([byte], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
}

window.createPDF = async function () {
  const existingPdfBytes = await fetch("./123.pdf").then((res) =>
    res.arrayBuffer()
  );

  const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

  PSPDFKit.load({
    baseUrl,
    container: "#pspdfkit",
    document: existingPdfBytes,
  })
    .then(async (instance) => {
      const annotation = new TextAnnotation({
        pageIndex: 1,
        text: { format: "plain", value: "HELLLLLLLLLLLLo" },
        font: "Helvetica",
        isBold: true,
        horizontalAlign: "center",
        boundingBox: new PSPDFKit.Geometry.Rect({
          left: 10,
          top: 20,
          width: 100,
          height: 100,
        }),
        fontColor: PSPDFKit.Color.RED,
      });

      const [createdAnnotation] = await instance.create(annotation);
      console.log(createdAnnotation.id);

      const documentBuffer = await instance.exportPDF();

      saveByteArray("test.pdf", documentBuffer);
      URL.revokeObjectURL(documentBlobObjectUrl);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
