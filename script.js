document.getElementById('zipFile').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    JSZip.loadAsync(e.target.result).then(function(zip) {
      const output = document.getElementById('output');
      output.innerHTML = '';

      zip.forEach(function(relativePath, zipEntry) {
        zipEntry.async("string").then(function(content) {
          const div = document.createElement('div');
          div.className = 'file-entry';
          div.innerHTML = `<strong>${relativePath}</strong><pre>${escapeHtml(content)}</pre>`;
          output.appendChild(div);
        });
      });
    });
  };
  reader.readAsArrayBuffer(file);
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}
