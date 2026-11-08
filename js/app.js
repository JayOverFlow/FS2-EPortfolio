(function () {
  "use strict";

  const data = window.PORTFOLIO;
  const teacher = data.teacher;
  const sections = data.sections;

  const $ = (sel, root) => (root || document).querySelector(sel);

  /* ---------------------------------------------------------------- utils */

  function h(tag, attrs) {
    const node = document.createElement(tag);
    const a = attrs || {};
    Object.keys(a).forEach(function (key) {
      const value = a[key];
      if (value === null || value === undefined || value === false) return;
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else if (key.slice(0, 2) === "on") node.addEventListener(key.slice(2).toLowerCase(), value);
      else node.setAttribute(key, value);
    });
    for (let i = 2; i < arguments.length; i++) {
      const child = arguments[i];
      if (child === null || child === undefined || child === false) continue;
      if (Array.isArray(child)) {
        child.forEach(function (c) { if (c !== null && c !== undefined) node.append(c.nodeType ? c : document.createTextNode(String(c))); });
      } else {
        node.append(child.nodeType ? child : document.createTextNode(String(child)));
      }
    }
    return node;
  }

  function slugId(section) {
    return "section-" + section.roman.toLowerCase();
  }

  function docKey(doc) {
    return doc.slug;
  }

  /* ---------------------------------------------------------------- state */

  const allDocs = [];
  sections.forEach(function (section) {
    section.id = slugId(section);
    (section.docs || []).forEach(function (doc) {
      doc.sectionId = section.id;
      doc.sectionTitle = section.title;
      doc.sectionRoman = section.roman;
      allDocs.push(doc);
    });
  });

  const docIndex = new Map();
  allDocs.forEach(function (doc) { docIndex.set(docKey(doc), doc); });

  function filesOf(doc) {
    if (doc.files && doc.files.length) return doc.files;
    if (doc.detected) return [doc.detected];
    return [];
  }

  function statusOf(doc) {
    if (doc.separate) return "separate";
    return filesOf(doc).length ? "ready" : "pending";
  }

  const STATUS_LABEL = { pending: "Pending", ready: "Ready", separate: "Separate" };

  function expectedPath(doc) {
    if (doc.type === "Image set") return "documents/" + doc.slug + "/";
    return "documents/" + doc.slug + ".pdf";
  }

  function autoPath(doc) {
    return "documents/" + doc.slug + ".pdf";
  }

  /* ---------------------------------------------------------------- hero TS strip */

  const tsTrack = $("#tsTrack");
  if (tsTrack) {
    data.ts.forEach(function (item) {
      tsTrack.append(
        h("a", { class: "ts-chip", href: "#" + item.target, title: item.code + " · " + item.label },
          h("span", { class: "ts-num" }, item.code),
          h("span", { class: "ts-label" }, item.label)
        )
      );
    });
  }

  /* ---------------------------------------------------------------- TOC */

  function docCountLabel(section) {
    if (section.type === "toc") return sections.length + " sections";
    const n = (section.docs || []).length;
    if (!n) return "Text";
    return n + (n === 1 ? " doc" : " docs");
  }

  function renderToc(section) {
    const total = allDocs.length;
    const separate = allDocs.filter(function (d) { return d.separate; }).length;
    const pending = allDocs.filter(function (d) { return !d.separate && !filesOf(d).length; }).length;

    const list = h("div", { class: "toc" });
    sections.forEach(function (s) {
      const row = h("a", { class: "toc-row", href: "#" + s.id, "data-toc": s.id },
        h("span", { class: "toc-num" }, s.roman),
        h("span", { class: "toc-name" }, s.title),
        h("span", { class: "toc-dots", "aria-hidden": "true" }),
        h("span", { class: "toc-count" }, docCountLabel(s)),
        h("span", { class: "toc-go", "aria-hidden": "true" }, "+")
      );
      list.append(row);
    });

    return h("div", { class: "toc-wrap" },
      h("p", { class: "toc-status", "data-toc-status": "" },
        total + " documents, " + separate + " separate submission, " + pending + " pending upload"
      ),
      list
    );
  }

  /* ---------------------------------------------------------------- CV */

  function cvRow(label, value) {
    return h("div", { class: "cv-row" },
      h("dt", { class: "cv-label" }, label),
      h("dd", { class: "cv-value" }, value)
    );
  }

  function lineStack(lines) {
    const frag = document.createDocumentFragment();
    lines.forEach(function (line, i) {
      if (i) frag.append(h("br"));
      frag.append(document.createTextNode(line));
    });
    return frag;
  }

  function renderCv(cv) {
    const education = h("span", null,
      h("strong", null, cv.education.title),
      h("br"),
      lineStack(cv.education.lines)
    );
    const practice = h("span", null,
      h("strong", null, cv.practice.title),
      h("br"),
      lineStack(cv.practice.lines)
    );
    const references = h("span", null,
      cv.references.map(function (ref, i) {
        return h("span", null,
          (i ? h("br") : null),
          h("strong", null, ref.name),
          h("br"),
          ref.role
        );
      })
    );

    return h("dl", { class: "cv" },
      cvRow("Education", education),
      cvRow("Field Study", practice),
      cvRow("Skills", cv.skills.join(", ")),
      cvRow("References", references)
    );
  }

  /* ---------------------------------------------------------------- docs */

  function statusMarkup(doc) {
    return h("span", { class: "doc-status" }, h("span", { class: "dot", "aria-hidden": "true" }), STATUS_LABEL[statusOf(doc)]);
  }

  function renderDocs(docs) {
    const list = h("div", { class: "doc-list" });
    let lastGroup = null;

    docs.forEach(function (doc) {
      if (doc.group && doc.group !== lastGroup) {
        list.append(h("h3", { class: "doc-group" }, doc.group));
        lastGroup = doc.group;
      }

      const tag = doc.ts || doc.tag || "—";
      const row = h("button", {
        class: "doc status-" + statusOf(doc),
        type: "button",
        "data-doc": docKey(doc),
        "aria-haspopup": "dialog",
        onclick: function () { openDoc(docKey(doc)); }
      },
        h("span", { class: "doc-check", "aria-hidden": "true" }),
        h("span", { class: "doc-tag" }, tag),
        h("span", { class: "doc-main" },
          h("span", { class: "doc-title" }, doc.title),
          h("span", { class: "doc-desc" }, doc.desc)
        ),
        h("span", { class: "doc-meta" },
          statusMarkup(doc),
          h("span", { class: "doc-type" }, doc.type)
        ),
        h("span", { class: "doc-open", "aria-hidden": "true" }, "+")
      );
      list.append(row);
    });

    return list;
  }

  /* ---------------------------------------------------------------- sections */

  function renderSection(section) {
    const body = [];

    const head = h("div", { class: "section-head" },
      h("h2", { class: "section-title", id: section.id + "-title" }, section.title),
      (section.docs && section.docs.length)
        ? h("span", { class: "section-count" }, section.docs.length + (section.docs.length === 1 ? " document" : " documents"))
        : null
    );
    body.push(head);

    if (section.intro) {
      const introClass = section.roman === "II" ? "section-intro intro-drop" : "section-intro";
      const intro = h("div", { class: introClass });
      section.intro.forEach(function (p) { intro.append(h("p", null, p)); });
      body.push(intro);
    }

    if (section.figure) {
      body.push(h("figure", { class: "section-figure" },
        h("img", { src: section.figure.src, alt: section.figure.alt, width: "1200", height: "800", loading: "lazy" }),
        h("figcaption", null, section.figure.caption)
      ));
    }

    if (section.type === "toc") body.push(renderToc(section));
    if (section.cv) body.push(renderCv(section.cv));
    if (section.quote) body.push(h("blockquote", { class: "statement" }, section.quote));
    if (section.docs) body.push(renderDocs(section.docs));

    if (section.meta) {
      const facts = h("dl", { class: "facts" });
      section.meta.forEach(function (pair) {
        facts.append(h("div", { class: "fact" },
          h("dt", null, pair[0]),
          h("dd", null, pair[1])
        ));
      });
      body.push(facts);
    }

    return h("section", { class: "section", id: section.id, "aria-labelledby": section.id + "-title" },
      h("div", { class: "section-grid" },
        h("div", { class: "section-aside" },
          h("span", { class: "section-roman" }, section.roman),
          h("span", { class: "section-note" }, section.note || "")
        ),
        h("div", { class: "section-body" }, body)
      )
    );
  }

  const mount = $("#sections");
  sections.forEach(function (section) { mount.append(renderSection(section)); });

  /* ---------------------------------------------------------------- counts */

  function updateCounts() {
    const total = allDocs.length;
    const separate = allDocs.filter(function (d) { return d.separate; }).length;
    const pending = allDocs.filter(function (d) { return !d.separate && !filesOf(d).length; }).length;

    document.querySelectorAll("[data-doc-total]").forEach(function (node) {
      node.textContent = String(total);
    });
    const status = $("[data-toc-status]");
    if (status) {
      status.textContent = total + " documents, " + separate + " separate submission, " + pending + " pending upload";
    }
  }

  updateCounts();

  /* ---------------------------------------------------------------- viewer */

  const viewer = $("#viewer");
  const viewerKicker = $("#viewerKicker");
  const viewerTitle = $("#viewerTitle");
  const viewerBody = $("#viewerBody");
  const viewerCopy = $("#viewerCopy");

  function isImage(path) {
    return /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(path);
  }

  function renderFiles(doc) {
    const files = filesOf(doc);
    const wrap = h("div", { class: "viewer-files" });

    if (files.length === 1 && /\.pdf$/i.test(files[0])) {
      wrap.append(h("iframe", { src: files[0], title: doc.title, loading: "lazy" }));
      wrap.append(h("p", { class: "viewer-download" }, h("a", { href: files[0], target: "_blank", rel: "noopener" }, "[Open PDF in a new tab]")));
      return wrap;
    }

    const grid = h("div", { class: "viewer-gallery" });
    files.forEach(function (file) {
      if (isImage(file)) {
        grid.append(h("figure", { class: "viewer-figure" },
          h("img", { src: file, alt: doc.title, loading: "lazy" }),
          h("figcaption", null, h("a", { href: file, target: "_blank", rel: "noopener" }, file.split("/").pop()))
        ));
      } else {
        grid.append(h("p", { class: "viewer-download" }, h("a", { href: file, target: "_blank", rel: "noopener" }, file.split("/").pop())));
      }
    });
    wrap.append(grid);
    return wrap;
  }

  function renderPending(doc) {
    return h("div", { class: "viewer-state" },
      h("p", { class: "state-label" }, "Not uploaded yet"),
      h("p", null, "This document is still being prepared. The final files will appear here once they are added to the portfolio."),
      h("p", { class: "file-slot" },
        h("span", { class: "file-slot-label" }, "File slot"),
        expectedPath(doc)
      )
    );
  }

  function renderSealed() {
    return h("div", { class: "viewer-state sealed" },
      h("p", { class: "state-label" }, "Sealed submission"),
      h("p", null, "The signed evaluation is not published on this site. Ask the panel secretary for the sealed copy during the defense.")
    );
  }

  let lastFocus = null;
  let currentDocSlug = null;

  function renderViewer(doc) {
    viewerKicker.textContent = [doc.ts, doc.type, STATUS_LABEL[statusOf(doc)]].filter(Boolean).join(" / ");
    viewerTitle.textContent = doc.title;
    viewerBody.innerHTML = "";
    viewerBody.append(h("p", { class: "viewer-desc" }, doc.desc));

    if (doc.separate) viewerBody.append(renderSealed());
    else if (filesOf(doc).length) viewerBody.append(renderFiles(doc));
    else viewerBody.append(renderPending(doc));
  }

  function openDoc(slug) {
    const doc = docIndex.get(slug);
    if (!doc || !viewer) return;

    lastFocus = document.activeElement;
    currentDocSlug = slug;
    renderViewer(doc);

    if (!viewer.open) viewer.showModal();
    document.body.classList.add("is-viewing");

    const url = new URL(window.location.href);
    url.searchParams.set("doc", slug);
    history.replaceState(null, "", url);
  }

  function cleanupViewer() {
    currentDocSlug = null;
    document.body.classList.remove("is-viewing");
    const url = new URL(window.location.href);
    url.searchParams.delete("doc");
    history.replaceState(null, "", url);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function closeViewer() {
    if (!viewer || !viewer.open) return;
    viewer.close();
    cleanupViewer();
  }

  if (viewer) {
    viewer.addEventListener("close", cleanupViewer);
    viewer.addEventListener("cancel", function () {
      window.setTimeout(cleanupViewer, 0);
    });

    viewer.addEventListener("click", function (event) {
      if (event.target === viewer) closeViewer();
    });

    $("#viewerClose").addEventListener("click", closeViewer);

    viewerCopy.addEventListener("click", function () {
      const text = window.location.href;
      const done = function () {
        viewerCopy.textContent = "Copied";
        window.setTimeout(function () { viewerCopy.textContent = "Copy link"; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });
  }

  const initialDoc = new URLSearchParams(window.location.search).get("doc");
  if (initialDoc) openDoc(initialDoc);

  /* ---------------------------------------------------------------- scroll spy */

  const sectionNodes = Array.prototype.slice.call(document.querySelectorAll(".section"));
  const currentLabel = $("#currentSection");
  const tocRows = Array.prototype.slice.call(document.querySelectorAll("[data-toc]"));
  let lastCheck = 0;

  function updateCurrent() {
    const probe = window.scrollY + Math.min(window.innerHeight * 0.28, 180);
    let current = sectionNodes[0];

    sectionNodes.forEach(function (node) {
      if (node.offsetTop <= probe) current = node;
    });

    if (!current) return;
    const section = sections.find(function (s) { return s.id === current.id; });
    if (currentLabel && section) currentLabel.textContent = section.roman + ". " + section.title;

    tocRows.forEach(function (row) {
      row.classList.toggle("is-current", row.getAttribute("data-toc") === current.id);
    });
  }

  function onScroll() {
    const now = window.performance && window.performance.now ? window.performance.now() : Date.now();
    if (now - lastCheck < 60) return;
    lastCheck = now;
    updateCurrent();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateCurrent();

  /* ---------------------------------------------------------------- print */

  const printBtn = $("#printBtn");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* ---------------------------------------------------------------- file detection */

  function patchRow(doc) {
    const row = document.querySelector('[data-doc="' + doc.slug + '"]');
    if (!row) return;
    row.className = "doc status-" + statusOf(doc);
    const status = row.querySelector(".doc-status");
    if (status) {
      status.innerHTML = "";
      status.append(h("span", { class: "dot", "aria-hidden": "true" }), STATUS_LABEL[statusOf(doc)]);
    }
  }

  async function detectFiles() {
    const candidates = allDocs.filter(function (doc) {
      return !doc.separate && !(doc.files && doc.files.length);
    });

    await Promise.all(candidates.map(async function (doc) {
      const path = autoPath(doc);
      try {
        const res = await fetch(path, { method: "HEAD", cache: "no-store" });
        if (res.ok) {
          doc.detected = path;
          patchRow(doc);
        }
      } catch (error) {
        /* file:// or offline: leave as pending */
      }
    }));

    updateCounts();

    if (currentDocSlug && viewer && viewer.open) {
      const doc = docIndex.get(currentDocSlug);
      if (doc) renderViewer(doc);
    }
  }

  detectFiles();
})();
