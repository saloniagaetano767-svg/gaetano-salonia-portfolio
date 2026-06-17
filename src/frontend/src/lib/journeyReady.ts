type ReadyListener = () => void;

let webglReady = false;
const listeners = new Set<ReadyListener>();

export function markWebglReady(): void {
  if (webglReady) return;
  webglReady = true;
  for (const listener of listeners) listener();
}

export function isWebglReady(): boolean {
  return webglReady;
}

export function onWebglReady(listener: ReadyListener): () => void {
  if (webglReady) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetWebglReady(): void {
  webglReady = false;
}
