export default function outputToFile(value, type, name) {
  let blob;

  if (typeof window.Blob === 'function') {
    blob = new Blob([value], {
      type: type,
    });
  } else {
    const BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
    const bb = new BlobBuilder();
    bb.append(value);
    blob = bb.getBlob(type);
  }

  const URL = window.URL || window.webkitURL;
  const bloburl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  if ('download' in anchor) {
    anchor.style.visibility = 'hidden';
    anchor.href = bloburl;
    anchor.download = name;
    document.body.appendChild(anchor);

    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    anchor.dispatchEvent(evt);
    document.body.removeChild(anchor);
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name);
  } else {
    location.href = bloburl;
  }
}
