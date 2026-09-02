/**
 * ZENVY Admin Upload Engine
 * ─────────────────────────
 * Reusable file upload component with:
 * - Drag & drop
 * - Multiple upload
 * - Preview
 * - Progress
 * - Validation (MIME, size)
 * - Reorder
 * - Set primary
 */

const Uploader = {

  // Validate file
  validate(file, opts = {}) {
    const { maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'] } = opts;
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) {
      return { ok: false, error: `File type ${file.type} not allowed. Allowed: ${allowedTypes.join(', ')}` };
    }
    if (file.size > maxBytes) {
      return { ok: false, error: `File too large (${(file.size/1024/1024).toFixed(1)} MB). Max: ${maxSizeMB} MB` };
    }
    return { ok: true };
  },

  // Read file as data URL (base64)
  readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  // Process one file: validate + read
  async processFile(file, opts = {}) {
    const validation = Uploader.validate(file, opts);
    if (!validation.ok) throw new Error(validation.error);
    const dataUrl = await Uploader.readAsDataURL(file);
    return { name: file.name, type: file.type, size: file.size, dataUrl };
  },

  // ─── Single Image Uploader ────────────────────────────────
  /**
   * Creates a single image upload zone.
   * @param {object} opts
   *   id          - unique id
   *   label       - label text
   *   value       - current dataUrl (to preload)
   *   onchange    - callback(dataUrl)
   *   maxSizeMB   - default 5
   *   placeholder - placeholder text
   */
  createSingleZone(opts = {}) {
    const id = opts.id || 'upload-' + Date.now();
    const label = opts.label || 'Upload Image';
    const placeholder = opts.placeholder || 'Drag & drop or click to upload';
    const value = opts.value || '';

    const el = document.createElement('div');
    el.className = 'upload-zone';
    el.id = id;
    el.innerHTML = `
      <input type="file" id="${id}-input" accept="image/*" class="hidden" />
      <div class="upload-zone-inner ${value ? 'has-image' : ''}" id="${id}-inner">
        ${value
          ? `<img src="${value}" class="upload-preview-img" id="${id}-preview" />`
          : `<div class="upload-placeholder">
              <span class="material-symbols-outlined text-3xl text-slate-400">cloud_upload</span>
              <p class="text-sm text-slate-500 mt-1">${placeholder}</p>
              <p class="text-xs text-slate-400 mt-0.5">PNG, JPG, WebP up to ${opts.maxSizeMB || 5}MB</p>
            </div>`
        }
        <div class="upload-overlay hidden" id="${id}-overlay">
          <button type="button" class="upload-del-btn" id="${id}-del">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
          <button type="button" class="upload-replace-btn" id="${id}-replace">
            <span class="material-symbols-outlined text-base">swap_horiz</span> Replace
          </button>
        </div>
        <div class="upload-progress hidden" id="${id}-prog">
          <div class="upload-progress-bar" id="${id}-bar"></div>
        </div>
      </div>
      <div class="upload-error text-red-500 text-xs mt-1 hidden" id="${id}-err"></div>
    `;

    setTimeout(() => {
      const input = document.getElementById(`${id}-input`);
      const inner = document.getElementById(`${id}-inner`);
      const overlay = document.getElementById(`${id}-overlay`);
      const prog = document.getElementById(`${id}-prog`);
      const bar = document.getElementById(`${id}-bar`);
      const errEl = document.getElementById(`${id}-err`);
      const delBtn = document.getElementById(`${id}-del`);
      const replBtn = document.getElementById(`${id}-replace`);

      if (!inner) return;

      // Show overlay on hover if has image
      inner.addEventListener('mouseenter', () => { if (inner.classList.contains('has-image')) overlay?.classList.remove('hidden'); });
      inner.addEventListener('mouseleave', () => overlay?.classList.add('hidden'));

      // Click to upload
      inner.addEventListener('click', (e) => {
        if (e.target.closest('.upload-del-btn') || e.target.closest('.upload-replace-btn')) return;
        if (!inner.classList.contains('has-image')) input?.click();
      });

      if (replBtn) replBtn.addEventListener('click', (e) => { e.stopPropagation(); input?.click(); });

      if (delBtn) delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        inner.innerHTML = `<div class="upload-placeholder">
          <span class="material-symbols-outlined text-3xl text-slate-400">cloud_upload</span>
          <p class="text-sm text-slate-500 mt-1">${placeholder}</p>
        </div>`;
        inner.classList.remove('has-image');
        overlay?.classList.add('hidden');
        if (opts.onchange) opts.onchange('');
      });

      // Drag and drop
      inner.addEventListener('dragover', e => { e.preventDefault(); inner.classList.add('drag-over'); });
      inner.addEventListener('dragleave', () => inner.classList.remove('drag-over'));
      inner.addEventListener('drop', async (e) => {
        e.preventDefault(); inner.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) await handleFile(file);
      });

      // File input change
      if (input) input.addEventListener('change', async () => {
        if (input.files[0]) await handleFile(input.files[0]);
      });

      async function handleFile(file) {
        errEl?.classList.add('hidden');
        prog?.classList.remove('hidden');
        // Animate progress
        let w = 0;
        const interval = setInterval(() => { w = Math.min(w + 10, 80); if (bar) bar.style.width = w + '%'; }, 50);
        try {
          const result = await Uploader.processFile(file, { maxSizeMB: opts.maxSizeMB });
          clearInterval(interval);
          if (bar) bar.style.width = '100%';
          setTimeout(() => prog?.classList.add('hidden'), 300);

          // Update preview
          inner.innerHTML = `<img src="${result.dataUrl}" class="upload-preview-img" id="${id}-preview" />
            <div class="upload-overlay hidden" id="${id}-overlay">
              <button type="button" class="upload-del-btn" id="${id}-del">
                <span class="material-symbols-outlined text-base">delete</span>
              </button>
              <button type="button" class="upload-replace-btn" id="${id}-replace">
                <span class="material-symbols-outlined text-base">swap_horiz</span> Replace
              </button>
            </div>`;
          inner.classList.add('has-image');

          // Re-bind overlay buttons
          const newOverlay = document.getElementById(`${id}-overlay`);
          const newDel = document.getElementById(`${id}-del`);
          const newRepl = document.getElementById(`${id}-replace`);
          inner.addEventListener('mouseenter', () => newOverlay?.classList.remove('hidden'));
          inner.addEventListener('mouseleave', () => newOverlay?.classList.add('hidden'));
          if (newRepl) newRepl.addEventListener('click', (e) => { e.stopPropagation(); input?.click(); });
          if (newDel) newDel.addEventListener('click', (e) => {
            e.stopPropagation();
            inner.innerHTML = `<div class="upload-placeholder">
              <span class="material-symbols-outlined text-3xl text-slate-400">cloud_upload</span>
              <p class="text-sm text-slate-500 mt-1">${placeholder}</p>
            </div>`;
            inner.classList.remove('has-image');
            if (opts.onchange) opts.onchange('');
          });

          if (opts.onchange) opts.onchange(result.dataUrl);
        } catch (err) {
          clearInterval(interval);
          prog?.classList.add('hidden');
          if (errEl) { errEl.textContent = err.message; errEl.classList.remove('hidden'); }
        }
      }
    }, 0);

    return el;
  },

  // ─── Multi-Image Gallery Uploader ─────────────────────────
  /**
   * Creates a multi-image gallery upload zone.
   * @param {object} opts
   *   id        - unique id for the container
   *   images    - initial array of { url, isPrimary, label }
   *   onchange  - callback(imagesArray)
   *   maxImages - default 10
   *   labels    - ['Main', 'Front', 'Back', 'Side', ...]
   */
  createGallery(opts = {}) {
    const id = opts.id || 'gallery-' + Date.now();
    const maxImages = opts.maxImages || 10;
    let images = [...(opts.images || [])];
    const labels = opts.labels || [];

    const container = document.createElement('div');
    container.className = 'gallery-uploader';
    container.id = id;

    function render() {
      container.innerHTML = `
        <div class="gallery-grid" id="${id}-grid">
          ${images.map((img, i) => `
            <div class="gallery-item ${img.isPrimary ? 'is-primary' : ''}" data-idx="${i}">
              <img src="${img.url}" alt="${img.label || 'Image ' + (i+1)}" />
              <div class="gallery-item-overlay">
                <button type="button" class="gi-primary-btn" data-idx="${i}" title="Set as primary">
                  <span class="material-symbols-outlined text-xs">${img.isPrimary ? 'star' : 'star_border'}</span>
                </button>
                <button type="button" class="gi-del-btn" data-idx="${i}" title="Delete">
                  <span class="material-symbols-outlined text-xs">close</span>
                </button>
              </div>
              ${img.label ? `<div class="gallery-item-label">${img.label}</div>` : ''}
              ${img.isPrimary ? '<div class="gallery-primary-badge">PRIMARY</div>' : ''}
            </div>
          `).join('')}
          ${images.length < maxImages ? `
            <div class="gallery-add-btn" id="${id}-add">
              <input type="file" id="${id}-input" accept="image/*" multiple class="hidden" />
              <span class="material-symbols-outlined text-2xl text-slate-400">add_photo_alternate</span>
              <p class="text-xs text-slate-400 mt-1">Add Images</p>
            </div>
          ` : ''}
        </div>
        <div class="gallery-error text-red-500 text-xs mt-1 hidden" id="${id}-err"></div>
        <p class="text-xs text-slate-400 mt-2">${images.length}/${maxImages} images • Click image to set as primary • Drag to reorder</p>
      `;

      // Bind events
      setTimeout(() => {
        // Add button
        const addBtn = document.getElementById(`${id}-add`);
        const input = document.getElementById(`${id}-input`);
        if (addBtn) addBtn.addEventListener('click', () => input?.click());
        if (input) input.addEventListener('change', async () => {
          const files = Array.from(input.files);
          const errEl = document.getElementById(`${id}-err`);
          errEl?.classList.add('hidden');
          for (const file of files) {
            if (images.length >= maxImages) break;
            try {
              const result = await Uploader.processFile(file);
              const label = labels[images.length] || '';
              images.push({ url: result.dataUrl, isPrimary: images.length === 0, label });
            } catch (e) {
              if (errEl) { errEl.textContent = e.message; errEl.classList.remove('hidden'); }
            }
          }
          render();
          if (opts.onchange) opts.onchange(images);
        });

        // Primary / delete buttons
        container.querySelectorAll('.gi-primary-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx);
            images = images.map((img, i) => ({ ...img, isPrimary: i === idx }));
            render(); if (opts.onchange) opts.onchange(images);
          });
        });
        container.querySelectorAll('.gi-del-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx);
            images.splice(idx, 1);
            if (images.length > 0 && !images.some(i => i.isPrimary)) images[0].isPrimary = true;
            render(); if (opts.onchange) opts.onchange(images);
          });
        });

        // Drop zone on add button
        if (addBtn) {
          addBtn.addEventListener('dragover', e => { e.preventDefault(); addBtn.classList.add('drag-over'); });
          addBtn.addEventListener('dragleave', () => addBtn.classList.remove('drag-over'));
          addBtn.addEventListener('drop', async (e) => {
            e.preventDefault(); addBtn.classList.remove('drag-over');
            const files = Array.from(e.dataTransfer.files);
            for (const file of files) {
              if (images.length >= maxImages) break;
              try {
                const result = await Uploader.processFile(file);
                images.push({ url: result.dataUrl, isPrimary: images.length === 0, label: labels[images.length] || '' });
              } catch {}
            }
            render(); if (opts.onchange) opts.onchange(images);
          });
        }
      }, 0);
    }

    render();
    return container;
  }
};
