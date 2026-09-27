// Fashion Studio — Lesson 6 Phase 1 prototype
// Mock/test data only. No backend, no AI, no auth. Persists to localStorage.
(function () {
  'use strict';
  var KEY = 'fashion-studio-phase1-v1';

  function defaultState() {
    return {
      project: { name: 'SS27 Capsule', preset: 'Minimal Studio' },
      credits: 10,
      garments: [
        { id: 'g1', name: 'Beige oversized trench', desc: 'Cotton gabardine, mock', tags: 'trench / beige' },
        { id: 'g2', name: 'Ivory pleated dress', desc: 'Silk blend, mock', tags: 'dress / ivory' }
      ],
      selectedGarmentId: 'g1',
      settings: { model: 'Model A — Natural', pose: 'Studio front', scene: 'Minimal Studio', ratio: '4:5' },
      variants: [],
      coverVariantId: null,
      seq: 3
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw);
      if (!s.project || !Array.isArray(s.garments)) return defaultState();
      return s;
    } catch (e) { return defaultState(); }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  var state = load();
  var thumbClasses = ['t0', 't1', 't2', 't3'];

  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function currentStep() {
    if (!state.project || !state.project.name) return 1;
    if (state.garments.length === 0) return 2;
    if (state.variants.length === 0) return 3;
    return 4;
  }

  function render() {
    // header / project
    el('projectName').value = state.project.name || '';
    el('projectPreset').value = state.project.preset || 'Minimal Studio';
    el('creditBalance').textContent = 'Credits: ' + state.credits + ' (mock)';
    el('projectSummary').innerHTML = 'Project: <strong>' + esc(state.project.name || '—') + '</strong> · ' +
      esc(state.project.preset || '') + ' · ' + state.garments.length + ' garments · ' +
      state.variants.filter(function (v) { return v.status === 'approved'; }).length + ' approved' +
      '<span class="mock-tag">mock</span>';

    // steps
    var step = currentStep();
    var labels = ['1 Project', '2 Garments', '3 Generate', '4 Curate'];
    el('steps').innerHTML = labels.map(function (l, i) {
      var n = i + 1, cls = n === step ? 'active' : (n < step ? 'done' : '');
      return '<li class="' + cls + '">' + l + '</li>';
    }).join('');

    // garments
    var g = state.garments.map(function (gm, idx) {
      var sel = gm.id === state.selectedGarmentId ? ' selected' : '';
      var tc = thumbClasses[idx % thumbClasses.length];
      return '<div class="garment' + sel + '">' +
        '<div class="thumb ' + tc + '">' + esc(gm.name.slice(0, 12)) + '</div>' +
        '<div class="pad"><strong>' + esc(gm.name) + '</strong>' +
        '<small>' + esc(gm.desc) + ' · ' + esc(gm.tags) + '</small>' +
        '<div class="toolbar">' +
        '<button class="btn-small' + (sel ? ' primary' : '') + '" data-select="' + gm.id + '">Select</button>' +
        '<button class="btn-small" data-remove-garment="' + gm.id + '">Remove</button>' +
        '</div></div></div>';
    }).join('');
    el('garmentGrid').innerHTML = g || '<p class="status">No garments yet — add one below.</p>';

    // settings
    el('setModel').value = state.settings.model;
    el('setPose').value = state.settings.pose;
    el('setScene').value = state.settings.scene;
    el('setRatio').value = state.settings.ratio;
    el('generateBtn').disabled = state.credits <= 0 || !state.selectedGarmentId;

    // variants
    var v = state.variants.map(function (vr) {
      var cls = vr.status === 'approved' ? ' approved' : '';
      var cover = vr.id === state.coverVariantId ? ' ★ Cover' : '';
      return '<div class="variant' + cls + '">' +
        '<div class="thumb ' + vr.tone + '">' + esc(vr.label) + '</div>' +
        '<div class="pad"><strong>' + esc(vr.garmentName) + ' — ' + esc(vr.label) + cover + '</strong>' +
        '<small>' + esc(vr.settingsSummary) + ' · ' + esc(vr.status) + '</small>' +
        '<div class="toolbar">' +
        '<button class="btn-small" data-approve="' + vr.id + '">Approve</button>' +
        '<button class="btn-small" data-reject="' + vr.id + '">Reject</button>' +
        '<button class="btn-small" data-cover="' + vr.id + '">Set cover</button>' +
        '<button class="btn-small" data-up="' + vr.id + '">↑</button>' +
        '<button class="btn-small" data-down="' + vr.id + '">↓</button>' +
        '</div></div></div>';
    }).join('');
    el('variantGrid').innerHTML = v || '<p class="status">No variants yet — choose settings and click Generate Showcase (mock).</p>';

    // curated = approved in order
    var approved = state.variants.filter(function (x) { return x.status === 'approved'; });
    el('curatedState').textContent = approved.length
      ? 'Curated: ' + approved.map(function (a, i) { return (i + 1) + '. ' + a.garmentName + ' (' + a.label + ')'; }).join(' → ')
      : 'Curated: nothing approved yet.';
    el('statusLine').textContent = 'Step ' + step + ' of 4 · ' + state.credits + ' mock credits left · ' +
      (state.coverVariantId ? 'Cover set.' : 'No cover selected.');
    save();
  }

  function bind() {
    el('projectForm').addEventListener('submit', function (e) {
      e.preventDefault();
      state.project.name = el('projectName').value.trim() || 'SS27 Capsule';
      state.project.preset = el('projectPreset').value;
      render();
    });

    el('garmentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = el('garmentName').value.trim();
      if (!name) return;
      var id = 'g' + (++state.seq) + '-' + Date.now().toString(36);
      state.garments.push({
        id: id,
        name: name,
        desc: el('garmentDesc').value.trim() || 'Mock description',
        tags: el('garmentTags').value.trim() || 'mock'
      });
      state.selectedGarmentId = id;
      el('garmentName').value = ''; el('garmentDesc').value = ''; el('garmentTags').value = '';
      render();
    });

    ['setModel', 'setPose', 'setScene', 'setRatio'].forEach(function (id, i) {
      el(id).addEventListener('change', function () {
        var keys = ['model', 'pose', 'scene', 'ratio'];
        state.settings[keys[i]] = el(id).value;
        save();
      });
    });

    el('generateBtn').addEventListener('click', function () {
      if (state.credits <= 0) { el('genStatus').textContent = 'No mock credits left — reset demo to continue.'; return; }
      var gm = state.garments.find(function (x) { return x.id === state.selectedGarmentId; }) || state.garments[0];
      if (!gm) { el('genStatus').textContent = 'Add a garment first.'; return; }
      el('genStatus').textContent = 'Generating mock variants…';
      el('generateBtn').disabled = true;
      setTimeout(function () {
        var n = 3; // deterministic 3 variants for demo clarity (within 2–4 spec)
        var summary = state.settings.model + ' · ' + state.settings.pose + ' · ' +
          state.settings.scene + ' · ' + state.settings.ratio;
        for (var i = 0; i < n; i++) {
          state.seq += 1;
          state.variants.unshift({
            id: 'v' + state.seq + '-' + Date.now().toString(36) + i,
            garmentName: gm.name,
            label: 'Look ' + (state.seq),
            tone: thumbClasses[(state.seq + i) % thumbClasses.length],
            settingsSummary: summary,
            status: 'pending'
          });
        }
        state.credits -= 1;
        el('genStatus').textContent = n + ' mock variants created for "' + gm.name + '". 1 credit used.';
        render();
      }, 700);
    });

    el('resetBtn').addEventListener('click', function () {
      localStorage.removeItem(KEY);
      state = defaultState();
      render();
    });

    document.addEventListener('click', function (e) {
      var t = e.target;
      function d(attr) { return t.getAttribute && t.getAttribute(attr); }
      var id;
      if ((id = d('data-select'))) { state.selectedGarmentId = id; render(); }
      else if ((id = d('data-remove-garment'))) {
        state.garments = state.garments.filter(function (x) { return x.id !== id; });
        if (state.selectedGarmentId === id) state.selectedGarmentId = (state.garments[0] || {}).id || null;
        render();
      }
      else if ((id = d('data-approve'))) {
        var a = state.variants.find(function (x) { return x.id === id; });
        if (a) a.status = 'approved';
        render();
      }
      else if ((id = d('data-reject'))) {
        state.variants = state.variants.filter(function (x) { return x.id !== id; });
        if (state.coverVariantId === id) state.coverVariantId = null;
        render();
      }
      else if ((id = d('data-cover'))) { state.coverVariantId = id; render(); }
      else if ((id = d('data-up')) || (id = d('data-down'))) {
        var idx = state.variants.findIndex(function (x) { return x.id === id; });
        var j = d('data-up') ? idx - 1 : idx + 1;
        if (idx >= 0 && j >= 0 && j < state.variants.length) {
          var tmp = state.variants[idx]; state.variants[idx] = state.variants[j]; state.variants[j] = tmp;
        }
        render();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () { bind(); render(); });
})();
