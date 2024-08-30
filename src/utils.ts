const signatures = {
  R0lGODdh: 'image/gif',
  R0lGODlh: 'image/gif',
  iVBORw0KGgo: 'image/png',
  '/9j/': 'image/jpeg',
};

export function detectMimeType(b64) {
  for (const s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

export function isMeasureType(input: string): input is MeasureTypes {
  const measureTypes: MeasureTypes[] = ['GAS', 'WATER'];
  return measureTypes.includes(input as MeasureTypes);
}
