import { renderAuroraFrame } from "./auroraShader2d";

export interface AuroraWorkerRequest {
  renderW: number;
  renderH: number;
  aspect: number;
  time: number;
  mouseX: number;
  mouseY: number;
}

let imageData: ImageData | null = null;
let rendering = false;
let pending: AuroraWorkerRequest | null = null;

async function renderFrame(req: AuroraWorkerRequest) {
  const { renderW, renderH, aspect, time, mouseX, mouseY } = req;

  if (!imageData || imageData.width !== renderW || imageData.height !== renderH) {
    imageData = new ImageData(renderW, renderH);
  }

  renderAuroraFrame(
    imageData.data,
    renderW,
    renderH,
    aspect,
    time,
    mouseX,
    mouseY,
    1.25,
  );

  const bitmap = await createImageBitmap(imageData);
  self.postMessage({ bitmap }, { transfer: [bitmap] });
}

function pump() {
  if (rendering || !pending) return;

  const req = pending;
  pending = null;
  rendering = true;

  renderFrame(req)
    .catch(() => {})
    .finally(() => {
      rendering = false;
      pump();
    });
}

self.onmessage = (event: MessageEvent<AuroraWorkerRequest>) => {
  pending = event.data;
  pump();
};
