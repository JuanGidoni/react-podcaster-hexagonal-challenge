// src/core/utils/sanitizeHtml.ts

/**
 * @file Minimal HTML sanitizer (allow-list based).
 * @description
 * Strips disallowed tags/attributes using DOMParser.
 * Keep this intentionally small to avoid external dependencies.
 *
 * Allowed tags: p, br, b, strong, i, em, u, ul, ol, li, a
 * Allowed attributes: a[href] (http/https/mailto only), (global) title
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  const allowedTags = new Set([
    "P",
    "BR",
    "B",
    "STRONG",
    "I",
    "EM",
    "U",
    "UL",
    "OL",
    "LI",
    "A",
  ]);
  const allowedAttrs = new Set(["href", "title"]);

  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null);
  const toRemove: Element[] = [];

  while (walker.nextNode()) {
    const el = walker.currentNode as Element;
    if (!allowedTags.has(el.tagName)) {
      const span = doc.createTextNode(el.textContent ?? "");
      el.replaceWith(span);
      continue;
    }

    for (const attr of Array.from(el.attributes)) {
      if (!allowedAttrs.has(attr.name)) {
        el.removeAttribute(attr.name);
        continue;
      }
      if (el.tagName === "A" && attr.name === "href") {
        const val = attr.value.trim();
        const safe = /^https?:\/\//i.test(val) || /^mailto:/i.test(val);
        if (!safe) el.removeAttribute("href");
        else {
          el.setAttribute("rel", "noopener noreferrer");
          el.setAttribute("target", "_blank");
        }
      }
    }
  }

  return doc.body.innerHTML;
}
