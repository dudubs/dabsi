export function fitImageToCanvas(
  img: HTMLImageElement,
  { maxWidth = 0, maxHeight = 0 }
): HTMLCanvasElement {
  let { width, height } = img;
  if (maxWidth && width > maxWidth) {
    height *= maxWidth / width;
    width = maxWidth;
  }
  if (maxHeight && height > maxHeight) {
    width *= maxHeight / height;
    height = maxHeight;
  }
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context!.drawImage(img, 0, 0, width, height);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  { mimeType = "image/png", quality = 1 } = {}
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject();
        }
      },
      mimeType,
      quality
    );
  });
}

export function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = document.createElement("img");
    img.onload = function () {
      resolve(img);
    };
    img.src = url;
  });
}

export async function loadImageFromFile(file: File) {
  const url = URL.createObjectURL(file);
  try {
    return await loadImageFromUrl(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}
