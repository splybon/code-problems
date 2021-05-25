/* eslint-disable react/no-danger */
import htmlparser from "htmlparser2";
import PT from "prop-types";
import React, { memo } from "react";
import { isEmpty, last, pick } from "lodash";

export const SAFE_ELEMENTS = [
  "a",
  "b",
  "br",
  "caption",
  "code",
  "col",
  "colgroup",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "small",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
];

export const SAFE_ATTRS = [
  "align",
  "border",
  "cellspacing",
  "cellpadding",
  "class",
  "colspan",
  "height",
  "href",
  "src",
  "style",
  "width"
];

export const SKIP_ELEMENTS = ["head", "script", "style"];

const SELF_CLOSING_TAGS = ["br", "col", "hr", "img"];

export const parseHtml = (
  html,
  {
    safeElements = SAFE_ELEMENTS,
    safeAttrs = SAFE_ATTRS,
    skipElements = SKIP_ELEMENTS
  } = {}
) => {
  const root = {
    children: []
  };
  const state = {
    node: root,
    context: [root],
    skip: []
  };
  new htmlparser.Parser(
    {
      onopentag: (name, attrs) => {
        if (skipElements.includes(name)) {
          state.skip.push(name);
          return;
        }
        if (state.skip.length || !safeElements.includes(name)) return;
        const pickedAttrs = pick(attrs, ...safeAttrs);
        state.node = isEmpty(pickedAttrs)
          ? {
              name
            }
          : { name, attrs: pickedAttrs };
        const parent = last(state.context);
        if (parent.children) {
          parent.children.push(state.node);
        } else {
          parent.children = [state.node];
        }
        state.context.push(state.node);
      },
      ontext: rawText => {
        if (state.skip.length) return;
        const text = rawText.replace(/\s+/g, " ");
        if (!text) return;
        const appendTo = state.node || last(state.context);
        if (appendTo) {
          if (appendTo.children) {
            appendTo.children.push(text);
          } else {
            appendTo.children = [text];
          }
        }
      },
      onclosetag: name => {
        if (skipElements.includes(name)) {
          state.skip.pop();
          return;
        }
        if (state.skip.length || !safeElements.includes(name)) return;
        state.node = null;
        state.context.pop();
      }
    },
    { decodeEntities: false, recognizeSelfClosing: true }
  ).end(html);
  return root;
};

export const htmlTreeToString = ({ name, attrs = {}, children = [] }) => {
  const selfClose = SELF_CLOSING_TAGS.includes(name) && !children.length;
  if (name === "img" && (!attrs.src || attrs.src.indexOf("cid:") === 0)) {
    return attrs.alt;
  }
  return [
    name && `<${name}`,
    name &&
      Object.entries(attrs)
        .map(([key, value]) => ` ${key}="${value}"`)
        .join(""),
    name && !selfClose && ">",
    children
      .map(node => (typeof node === "string" ? node : htmlTreeToString(node)))
      .filter(i => i)
      .join(""),
    name && (selfClose ? "/>" : `</${name}>`)
  ]
    .filter(i => i)
    .join("");
};

const SafeHTML = memo(
  ({ as, html, safeElements, safeAttrs, skipElements, ...props }) => {
    const ast = parseHtml(html, { safeElements, safeAttrs, skipElements });
    const El = as;
    return (
      <El
        {...props}
        dangerouslySetInnerHTML={{ __html: htmlTreeToString(ast) }}
      />
    );
  }
);

SafeHTML.SAFE_ELEMENTS = SAFE_ELEMENTS;
SafeHTML.SAFE_ATTRS = SAFE_ATTRS;
SafeHTML.SKIP_ELEMENTS = SKIP_ELEMENTS;

SafeHTML.propTypes = {
  as: PT.node,
  html: PT.string.isRequired,
  safeElements: PT.arrayOf(PT.string),
  safeAttrs: PT.arrayOf(PT.string),
  skipElements: PT.arrayOf(PT.string)
};

SafeHTML.defaultProps = {
  as: "span",
  safeElements: SAFE_ELEMENTS,
  safeAttrs: SAFE_ATTRS,
  skipElements: SKIP_ELEMENTS
};

export default SafeHTML;
