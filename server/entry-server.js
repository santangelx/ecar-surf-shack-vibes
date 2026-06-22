var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import * as React from "react";
import React__default, { Component, createContext, useContext, useState, useEffect } from "react";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ChevronRight, Check, Circle, Globe, ArrowDown } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, useNavigate, Link, Routes, Route, Navigate } from "react-router-dom";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const routePaths = {
  en: {
    home: "/",
    kayak: "/kayak-rental-almunecar",
    paddle: "/paddle-board-almunecar"
  },
  es: {
    home: "/es",
    kayak: "/es/alquiler-kayak-almunecar",
    paddle: "/es/paddle-surf-almunecar"
  },
  fr: {
    home: "/fr",
    kayak: "/fr/location-kayak-almunecar",
    paddle: "/fr/paddle-board-almunecar"
  }
};
const ROUTES = Object.values(routePaths).flatMap(
  (langPaths) => Object.values(langPaths)
);
const deriveLanguage = (pathname) => {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  return "en";
};
const translations = {
  en: {
    // Hero section
    heroEyebrow: "Open Sea · Playa de San Cristóbal",
    tagline: "Kayak & Paddle Surf in Almuñécar, Granada",
    description: "Experience the beautiful Mediterranean coast from a different perspective. Rent kayaks and paddle surf boards with us for an unforgettable adventure.",
    aboutUs: "About Us",
    hoursIntro: "Open every day. We'll be waiting for you on Playa de San Cristóbal to enjoy the Mediterranean.",
    reserveButton: "Reserve Now",
    viewPricesButton: "View Prices",
    // Navbar
    services: "Services",
    prices: "Prices",
    hours: "Hours",
    location: "Location",
    home: "Home",
    kayakRentals: "Kayak Rentals",
    paddleBoardNav: "Paddle Board",
    seaActivities: "Sea Activities",
    // Services
    ourServices: "Our Services",
    experienceDescription: "Experience the beautiful coast of Almuñecar",
    kayakTitle: "Kayak Rental",
    kayakDescription: "Explore hidden coves and beaches with our comfortable kayaks",
    kayakDetails: "Our kayaks are perfect for exploring the beautiful coastline of Almuñecar. Stable and easy to maneuver, suitable for 1-2 people.",
    paddleTitle: "Paddle Surf",
    paddleDescription: "Try this popular water sport with our stable boards",
    paddleDetails: "Stand-up paddle boarding is a fun and relaxing way to enjoy the sea. Our high-quality boards provide excellent stability for beginners and performance for experienced paddlers.",
    // Prices
    ourPrices: "Our Prices",
    affordable: "Affordable adventures for everyone",
    includeLife: "Prices include life jacket and paddle.",
    allEquipment: "All equipment included.",
    type: "Type",
    oneHour: "1 Hour",
    twoHours: "2 Hours",
    halfDay: "Half Day",
    day: "Day",
    thirtyMinutes: "30 Minutes",
    kayakForTwo: "Kayak (1-2 persons)",
    paddleBoard: "Paddle Board (1-2 persons)",
    twoPersonKayak: "2 Person Kayak",
    onePersonKayak: "1 Person Kayak",
    waterBike: "Water Bike",
    kayakRental: "Kayak Rental",
    waterBikeRental: "Water Bike Rental",
    // Business hours
    businessHours: "Business Hours",
    whenVisit: "When you can visit us",
    openingTimes: "Opening Times",
    seasonInfo: "Open every day",
    dailyHours: "Daily Hours",
    everyday: "Every day",
    pleaseNote: "Please Note",
    weatherNote: "Hours may vary depending on weather conditions.",
    // Location
    findUs: "Find Us",
    locationSubtitle: "We're located on the beautiful beach of Almuñecar",
    address: "Paseo Miguel Ángel Blanco, 2, 18690 Almuñécar, Granada, Spain",
    howToFindUs: "How to find us",
    locationDescription: "We're located on San Cristóbal beach, right next to the blue flag area. Look for our blue and white flags with the OpenSea logo.",
    getDirections: "Get Directions",
    // Footer
    quickLinks: "Quick Links",
    allRightsReserved: "All rights reserved.",
    // Reservation modal
    makeReservation: "Make a Reservation",
    selectActivity: "Select Activity",
    selectDuration: "Select Duration",
    selectDate: "Select Date",
    kayak: "Kayak",
    paddleSurf: "Paddle Surf",
    price: "Price",
    reserve: "Reserve",
    cancel: "Cancel",
    yourDetails: "Your Details",
    name: "Name",
    email: "Email",
    phone: "Phone",
    selectTime: "Select Time",
    company: "Company",
    message: "Message",
    businessInquiryPlaceholder: "Hi, this is Hotel Alcazar. I'd like to reserve 10 kayaks for...",
    send: "Send"
  },
  es: {
    // Hero section
    heroEyebrow: "Open Sea · Playa de San Cristóbal",
    tagline: "Kayak y Paddle Surf en Almuñécar, Granada",
    description: "Experimenta la hermosa costa mediterránea desde una perspectiva diferente. Alquila kayaks y tablas de paddle surf con nosotros para una aventura inolvidable.",
    aboutUs: "Sobre Nosotros",
    hoursIntro: "Abierto todos los días. Te esperamos en la Playa de San Cristóbal para vivir el Mediterráneo.",
    reserveButton: "Reservar Ahora",
    viewPricesButton: "Ver Precios",
    // Navbar
    services: "Servicios",
    prices: "Precios",
    hours: "Horarios",
    location: "Ubicación",
    home: "Inicio",
    kayakRentals: "Alquiler Kayak",
    paddleBoardNav: "Paddle Surf",
    seaActivities: "Actividades Marítimas",
    // Services
    ourServices: "Nuestros Servicios",
    experienceDescription: "Experimenta la hermosa costa de Almuñecar",
    kayakTitle: "Alquiler de Kayak",
    kayakDescription: "Explora calas y playas escondidas con nuestros cómodos kayaks",
    kayakDetails: "Nuestros kayaks son perfectos para explorar la hermosa costa de Almuñecar. Estables y fáciles de maniobrar, adecuados para 1-2 personas.",
    paddleTitle: "Paddle Surf",
    paddleDescription: "Prueba este popular deporte acuático con nuestras tablas estables",
    paddleDetails: "El paddle surf es una forma divertida y relajante de disfrutar del mar. Nuestras tablas de alta calidad proporcionan excelente estabilidad para principiantes y rendimiento para paddlers experimentados.",
    // Prices
    ourPrices: "Nuestros Precios",
    affordable: "Aventuras asequibles para todos",
    includeLife: "Los precios incluyen chaleco salvavidas y remo.",
    allEquipment: "Todo el equipo incluido.",
    type: "Tipo",
    oneHour: "1 Hora",
    twoHours: "2 Horas",
    halfDay: "Medio Día",
    day: "Día",
    thirtyMinutes: "30 Minutos",
    kayakForTwo: "Kayak (1-2 personas)",
    paddleBoard: "Tabla de Paddle (1-2 personas)",
    twoPersonKayak: "Kayak de 2 Personas",
    onePersonKayak: "Kayak de 1 Persona",
    waterBike: "Bicicleta de Agua",
    kayakRental: "Alquiler de Kayak",
    waterBikeRental: "Alquiler de Bicicleta de Agua",
    // Business hours
    businessHours: "Horario Comercial",
    whenVisit: "Cuándo puedes visitarnos",
    openingTimes: "Horarios de Apertura",
    seasonInfo: "Abierto todos los días",
    dailyHours: "Horario Diario",
    everyday: "Todos los días",
    pleaseNote: "Nota Importante",
    weatherNote: "Los horarios pueden variar según las condiciones climáticas.",
    // Location
    findUs: "Encuéntranos",
    locationSubtitle: "Estamos ubicados en la hermosa playa de Almuñecar",
    address: "Paseo Miguel Ángel Blanco, 2, 18690 Almuñécar, Granada, España",
    howToFindUs: "Cómo encontrarnos",
    locationDescription: "Estamos ubicados en la playa de San Cristóbal, justo al lado de la zona pavillon bleu. Busca nuestras banderas azules y blancas con el logo OpenSea.",
    getDirections: "Cómo Llegar",
    // Footer
    quickLinks: "Enlaces Rápidos",
    allRightsReserved: "Todos los derechos reservados.",
    // Reservation modal
    makeReservation: "Hacer una Reserva",
    selectActivity: "Seleccionar Actividad",
    selectDuration: "Seleccionar Duración",
    selectDate: "Seleccionar Fecha",
    kayak: "Kayak",
    paddleSurf: "Paddle Surf",
    price: "Precio",
    reserve: "Reservar",
    cancel: "Cancelar",
    yourDetails: "Tus Datos",
    name: "Nombre",
    email: "Correo Electrónico",
    phone: "Teléfono",
    selectTime: "Seleccionar Hora",
    company: "Empresa",
    message: "Mensaje",
    businessInquiryPlaceholder: "Hola, soy el Hotel Alcazar. Me gustaría reservar 10 kayaks para...",
    send: "Enviar"
  },
  fr: {
    // Hero section
    heroEyebrow: "Open Sea · Playa de San Cristóbal",
    tagline: "Kayak et Paddle Surf à Almuñécar, Grenade",
    description: "Découvrez la magnifique côte méditerranéenne sous un angle différent. Louez des kayaks et des planches de paddle surf avec nous pour une aventure inoubliable.",
    aboutUs: "À Propos",
    hoursIntro: "Ouvert tous les jours. Nous vous attendons sur la Playa de San Cristóbal pour profiter de la Méditerranée.",
    reserveButton: "Réserver Maintenant",
    viewPricesButton: "Voir les Prix",
    // Navbar
    services: "Services",
    prices: "Prix",
    hours: "Horaires",
    location: "Emplacement",
    home: "Accueil",
    kayakRentals: "Location Kayak",
    paddleBoardNav: "Paddle Board",
    seaActivities: "Activités Maritimes",
    // Services
    ourServices: "Nos Services",
    experienceDescription: "Découvrez la magnifique côte d'Almuñecar",
    kayakTitle: "Location de Kayak",
    kayakDescription: "Explorez les criques et plages cachées avec nos kayaks confortables",
    kayakDetails: "Nos kayaks sont parfaits pour explorer la magnifique côte d'Almuñecar. Stables et faciles à manœuvrer, adaptés pour 1-2 personnes.",
    paddleTitle: "Paddle Surf",
    paddleDescription: "Essayez ce sport nautique populaire avec nos planches stables",
    paddleDetails: "Le paddle surf est une façon amusante et relaxante de profiter de la mer. Nos planches de haute qualité offrent une excellente stabilité pour les débutants et des performances pour les paddlers expérimentés.",
    // Prices
    ourPrices: "Nos Prix",
    affordable: "Des aventures abordables pour tous",
    includeLife: "Les prix incluent un gilet de sauvetage et une pagaie.",
    allEquipment: "Tout l'équipement inclus.",
    type: "Type",
    oneHour: "1 Heure",
    twoHours: "2 Heures",
    halfDay: "Demi-Journée",
    day: "Journée",
    thirtyMinutes: "30 Minutes",
    kayakForTwo: "Kayak (1-2 personnes)",
    paddleBoard: "Planche de Paddle (1-2 personnes)",
    twoPersonKayak: "Kayak de 2 Personnes",
    onePersonKayak: "Kayak de 1 Personne",
    waterBike: "Vélo Aquatique",
    kayakRental: "Location de Kayak",
    waterBikeRental: "Location de Vélo Aquatique",
    // Business hours
    businessHours: "Heures d'Ouverture",
    whenVisit: "Quand vous pouvez nous rendre visite",
    openingTimes: "Heures d'Ouverture",
    seasonInfo: "Ouvert tous les jours",
    dailyHours: "Horaires Quotidiens",
    everyday: "Tous les jours",
    pleaseNote: "Veuillez Noter",
    weatherNote: "Les horaires peuvent varier selon les conditions météorologiques.",
    // Location
    findUs: "Trouvez-Nous",
    locationSubtitle: "Nous sommes situés sur la magnifique plage d'Almuñecar",
    address: "Paseo Miguel Ángel Blanco, 2, 18690 Almuñécar, Grenade, Espagne",
    howToFindUs: "Comment nous trouver",
    locationDescription: "Nous sommes situés sur la plage de San Cristóbal, juste à côté de la zone pavillon bleu. Cherchez nos drapeaux bleus et blancs avec le logo OpenSea.",
    getDirections: "Obtenir l'Itinéraire",
    // Footer
    quickLinks: "Liens Rapides",
    allRightsReserved: "Tous droits réservés.",
    // Reservation modal
    makeReservation: "Faire une Réservation",
    selectActivity: "Sélectionner l'Activité",
    selectDuration: "Sélectionner la Durée",
    selectDate: "Sélectionner la Date",
    kayak: "Kayak",
    paddleSurf: "Paddle Surf",
    price: "Prix",
    reserve: "Réserver",
    cancel: "Annuler",
    yourDetails: "Vos Coordonnées",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    selectTime: "Sélectionner l'Heure",
    company: "Entreprise",
    message: "Message",
    businessInquiryPlaceholder: "Bonjour, c'est l'Hôtel Alcazar. Je voudrais réserver 10 kayaks pour...",
    send: "Envoyer"
  }
};
const LanguageContext = createContext(void 0);
const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = deriveLanguage(location.pathname);
  const setLanguage = (newLanguage) => {
    const currentPath = location.pathname;
    let routeType = "home";
    if (currentPath.includes("kayak")) {
      routeType = "kayak";
    } else if (currentPath.includes("paddle")) {
      routeType = "paddle";
    }
    const newPath = routePaths[newLanguage][routeType];
    navigate(newPath);
  };
  const t = (key) => {
    return translations[language][key] || key;
  };
  const getLocalizedPath = (path) => {
    if (language === "en") return path;
    return `/${language}${path}`;
  };
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value: { language, setLanguage, t, getLocalizedPath, routePaths }, children });
};
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === void 0) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" }
];
const LanguageSelector = ({ tone = "dark" }) => {
  const { language, setLanguage } = useLanguage();
  const color = tone === "light" ? "#ffffff" : "#11313E";
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        "aria-label": "Idioma",
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color,
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: "15px",
          padding: "4px",
          transition: "color .35s ease"
        },
        children: [
          /* @__PURE__ */ jsx(Globe, { style: { width: 18, height: 18 } }),
          /* @__PURE__ */ jsx("span", { children: language.toUpperCase() })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", className: "bg-white", children: languages.map((lang) => /* @__PURE__ */ jsx(
      DropdownMenuItem,
      {
        onClick: () => setLanguage(lang.code),
        className: `cursor-pointer ${language === lang.code ? "font-semibold text-[#0E7C99]" : ""}`,
        children: lang.label
      },
      lang.code
    )) })
  ] });
};
const Navbar = () => {
  const { t, routePaths: routePaths2, language } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const paths = routePaths2[language];
  const isHome = location.pathname === paths.home;
  const solid = scrolled || !isHome;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  const navColor = solid ? "#11313E" : "#ffffff";
  const links = [
    { to: paths.home, label: t("home") },
    { to: paths.kayak, label: t("kayakRentals") },
    { to: paths.paddle, label: t("paddleBoardNav") }
  ];
  const linkStyle = (to) => ({
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: "15px",
    textDecoration: "none",
    color: navColor,
    opacity: location.pathname === to ? 1 : 0.62,
    transition: "color .35s ease"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "nav",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(14px,2vw,20px) clamp(20px,6vw,96px)",
          background: solid ? "rgba(246,243,236,0.92)" : "transparent",
          boxShadow: solid ? "0 1px 0 rgba(17,49,62,0.10)" : "none",
          backdropFilter: "saturate(140%) blur(10px)",
          WebkitBackdropFilter: "saturate(140%) blur(10px)",
          transition: "background .35s ease, box-shadow .35s ease"
        },
        children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: paths.home,
              style: { display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: navColor, transition: "color .35s ease" },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/logo.png",
                    alt: "OpenSea Almuñécar logo",
                    width: 42,
                    height: 42,
                    style: { width: 42, height: 42, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 10px rgba(17,49,62,.18)" }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-display", style: { fontWeight: 800, fontSize: "20px", letterSpacing: "-.01em" }, children: "OPEN SEA" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "os-desktop-nav", style: { display: "flex", alignItems: "center", gap: "clamp(20px,2.4vw,40px)" }, children: [
            links.map((l) => /* @__PURE__ */ jsx(Link, { to: l.to, style: linkStyle(l.to), children: l.label }, l.to)),
            /* @__PURE__ */ jsx(LanguageSelector, { tone: solid ? "dark" : "light" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "os-burger",
              onClick: () => setMenuOpen((o) => !o),
              "aria-label": "Menú",
              "aria-expanded": menuOpen,
              style: { border: "none", background: "transparent", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" },
              children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx("span", { style: { display: "block", width: 26, height: 2.5, background: navColor, borderRadius: 2, transition: ".3s" } }, i))
            }
          )
        ]
      }
    ),
    menuOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "os-mobile-menu",
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "#0A5E74",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "8px",
          padding: "0 clamp(28px,8vw,64px)",
          animation: "osFadeUp .35s ease"
        },
        children: [
          links.map((l, i) => /* @__PURE__ */ jsx(
            Link,
            {
              to: l.to,
              onClick: () => setMenuOpen(false),
              className: "font-display",
              style: {
                fontWeight: 800,
                fontSize: "clamp(34px,9vw,52px)",
                letterSpacing: "-.02em",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: i < links.length - 1 ? "1px solid rgba(255,255,255,.16)" : "none"
              },
              children: l.label
            },
            l.to
          )),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMenuOpen(false),
              "aria-label": "Cerrar",
              style: { position: "absolute", top: 24, right: "clamp(20px,6vw,40px)", border: "none", background: "transparent", color: "#fff", fontSize: 34, lineHeight: 1, cursor: "pointer" },
              children: "×"
            }
          )
        ]
      }
    )
  ] });
};
const SITE_URL = "https://opensea-almunecar.es";
const BUSINESS = {
  name: "OpenSea Kayak & Paddle Surf",
  // NAP matches the Google Business Profile (the source of truth) for local-SEO
  // consistency. Keep these in sync with the GBP listing.
  telephone: "+34722172004",
  telephoneDisplay: "+34 722 17 20 04",
  streetAddress: "Paseo Miguel Ángel Blanco, 2",
  addressLocality: "Almuñécar",
  addressRegion: "Granada",
  postalCode: "18690",
  addressCountry: "ES",
  // Precise coordinates of Playa de San Cristóbal pitch.
  latitude: 36.7294014,
  longitude: -3.695261,
  opens: "11:00",
  closes: "20:00",
  priceRange: "€€",
  // Real social URLs go here when available. The Google Business Profile is the
  // CID link below — listed in sameAs so Google ties this site to that entity.
  sameAs: ["https://maps.google.com/?cid=4081209814812519440"]
};
const GBP_URL = "https://maps.google.com/?cid=4081209814812519440";
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.latitude},${BUSINESS.longitude}`;
const Hero = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxs(
    "header",
    {
      style: {
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "#0A5E74"
      },
      children: [
        /* @__PURE__ */ jsxs("picture", { children: [
          /* @__PURE__ */ jsx(
            "source",
            {
              type: "image/webp",
              srcSet: "/images/paddle-800w.webp 800w, /images/paddle-1200w.webp 1200w, /images/paddle-1600w.webp 1600w",
              sizes: "100vw"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/paddle-1200w.jpg",
              alt: "Paddle surf en el mar Mediterráneo de Almuñécar, Costa Tropical",
              ...{ fetchpriority: "high" },
              decoding: "async",
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(8,40,52,.5) 0%, rgba(8,40,52,.05) 32%, rgba(8,40,52,.82) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              position: "relative",
              width: "100%",
              maxWidth: 1280,
              margin: "0 auto",
              padding: "clamp(120px,16vh,180px) clamp(20px,6vw,96px) clamp(56px,9vw,110px)",
              color: "#fff"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "font-display",
                  style: { fontWeight: 700, letterSpacing: ".3em", fontSize: 13, textTransform: "uppercase", opacity: 0.9, marginBottom: "clamp(18px,3vw,28px)" },
                  children: t("heroEyebrow")
                }
              ),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  className: "font-display",
                  style: { fontWeight: 800, fontSize: "clamp(42px,9vw,112px)", lineHeight: 0.9, letterSpacing: "-.025em", maxWidth: "15ch", margin: "0 0 clamp(20px,3vw,30px)", textWrap: "balance" },
                  children: t("tagline")
                }
              ),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.6, maxWidth: "54ch", opacity: 0.92, margin: "0 0 clamp(28px,4vw,40px)" }, children: t("description") }),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 14 }, children: [
                /* @__PURE__ */ jsx("a", { href: "#precios", style: { background: "#fff", color: "#11313E", padding: "16px 30px", borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: "none" }, children: t("viewPricesButton") }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: MAPS_DIRECTIONS_URL,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: { border: "1.5px solid rgba(255,255,255,.55)", color: "#fff", padding: "16px 30px", borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: "none" },
                    children: t("getDirections")
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#servicios",
            "aria-label": t("services"),
            style: { position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", color: "#fff", textDecoration: "none", animation: "osFloat 2.4s ease-in-out infinite" },
            children: /* @__PURE__ */ jsx(ArrowDown, { style: { width: 34, height: 34 } })
          }
        )
      ]
    }
  );
};
const stripExt = (p) => p.substring(0, p.lastIndexOf(".")) || p;
const OptimizedImage = ({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  style
}) => {
  const base = stripExt(src);
  const webpSrcSet = `${base}-400w.webp 400w, ${base}-800w.webp 800w, ${base}-1200w.webp 1200w`;
  const jpgFallback = `${base}-1200w.jpg`;
  return /* @__PURE__ */ jsxs("picture", { className, children: [
    /* @__PURE__ */ jsx("source", { type: "image/webp", srcSet: webpSrcSet, sizes }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: jpgFallback,
        alt,
        loading: priority ? "eager" : "lazy",
        decoding: "async",
        ...priority ? { fetchpriority: "high" } : {},
        className: cn(imgClassName),
        style: { display: "block", width: "100%", height: "100%", objectFit: "cover", ...style }
      }
    )
  ] });
};
const SectionEyebrow = ({
  number,
  label,
  labelColor = "#0E7C99"
}) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(14px,2vw,22px)" }, children: [
  /* @__PURE__ */ jsx("span", { className: "font-display", style: { fontWeight: 700, color: "#E8623D", fontSize: 14, letterSpacing: ".2em" }, children: number }),
  /* @__PURE__ */ jsx("span", { className: "font-display", style: { fontWeight: 700, color: labelColor, fontSize: 14, letterSpacing: ".22em", textTransform: "uppercase" }, children: label })
] });
const Services = () => {
  const { t } = useLanguage();
  const cards = [
    {
      img: "/images/kayak.png",
      alt: "Alquiler de kayaks dobles e individuales en la playa de Almuñécar para explorar la Costa Tropical",
      title: t("kayakTitle"),
      lead: t("kayakDescription"),
      body: t("kayakDetails")
    },
    {
      img: "/images/paddle.png",
      alt: "Alquiler de tablas de paddle surf SUP en Almuñécar para principiantes y expertos en el Mediterráneo",
      title: t("paddleTitle"),
      lead: t("paddleDescription"),
      body: t("paddleDetails")
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "servicios", style: { scrollMarginTop: 80, padding: "clamp(72px,11vw,150px) clamp(20px,6vw,96px)", background: "#F6F3EC" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx(SectionEyebrow, { number: "01", label: t("ourServices") }),
    /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(32px,6vw,68px)", lineHeight: 0.98, letterSpacing: "-.02em", margin: "0 0 clamp(40px,6vw,72px)", maxWidth: "18ch", textWrap: "balance" }, children: t("experienceDescription") }),
    /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(20px,3vw,40px)" }, children: cards.map((c) => /* @__PURE__ */ jsxs("article", { style: { background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -32px rgba(17,49,62,.4)" }, children: [
      /* @__PURE__ */ jsx("div", { style: { aspectRatio: "4 / 3", overflow: "hidden" }, children: /* @__PURE__ */ jsx(OptimizedImage, { src: c.img, alt: c.alt, sizes: "(max-width: 880px) 100vw, 50vw" }) }),
      /* @__PURE__ */ jsxs("div", { style: { padding: "clamp(24px,3vw,40px)" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-.01em", margin: "0 0 10px" }, children: c.title }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 18, fontWeight: 600, color: "#0E7C99", margin: "0 0 16px" }, children: c.lead }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 16, lineHeight: 1.65, color: "rgba(17,49,62,.74)", margin: 0 }, children: c.body })
      ] })
    ] }, c.title)) })
  ] }) });
};
const PRODUCTS = {
  twoPersonKayak: {
    nameKey: "twoPersonKayak",
    noteKey: "includeLife",
    rows: [
      { labelKey: "oneHour", price: "€15" },
      { labelKey: "twoHours", price: "€25" },
      { labelKey: "halfDay", price: "€35" },
      { labelKey: "day", price: "€60" }
    ]
  },
  onePersonKayak: {
    nameKey: "onePersonKayak",
    noteKey: "includeLife",
    rows: [
      { labelKey: "oneHour", price: "€10" },
      { labelKey: "twoHours", price: "€18" },
      { labelKey: "halfDay", price: "€30" },
      { labelKey: "day", price: "€50" }
    ]
  },
  paddleSurf: {
    nameKey: "paddleSurf",
    noteKey: "allEquipment",
    rows: [
      { labelKey: "oneHour", price: "€12" },
      { labelKey: "twoHours", price: "€20" },
      { labelKey: "halfDay", price: "€30" },
      { labelKey: "day", price: "€50" }
    ]
  },
  waterBike: {
    nameKey: "waterBike",
    noteKey: "allEquipment",
    rows: [
      { labelKey: "thirtyMinutes", price: "€15" },
      { labelKey: "oneHour", price: "€20" },
      { labelKey: "halfDay", price: "€50" },
      { labelKey: "day", price: "€90" }
    ]
  }
};
const HOME_PRODUCTS = [
  PRODUCTS.twoPersonKayak,
  PRODUCTS.onePersonKayak,
  PRODUCTS.paddleSurf,
  PRODUCTS.waterBike
];
const Prices = () => {
  const { t } = useLanguage();
  const products = HOME_PRODUCTS.map((p) => ({
    name: t(p.nameKey),
    note: t(p.noteKey),
    rows: p.rows.map((r) => [t(r.labelKey), r.price])
  }));
  return /* @__PURE__ */ jsx("section", { id: "precios", style: { scrollMarginTop: 80, padding: "clamp(72px,11vw,150px) clamp(20px,6vw,96px)", background: "#11313E", color: "#fff" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx(SectionEyebrow, { number: "02", label: t("ourPrices"), labelColor: "#6FC5DC" }),
    /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(32px,6vw,68px)", lineHeight: 0.98, letterSpacing: "-.02em", margin: "0 0 clamp(40px,6vw,72px)", textWrap: "balance" }, children: t("affordable") }),
    /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(16px,2vw,28px)" }, children: products.map((p) => /* @__PURE__ */ jsxs("div", { style: { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: "clamp(24px,2.6vw,36px)" }, children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(22px,2.4vw,28px)", margin: "0 0 24px", letterSpacing: "-.01em" }, children: p.name }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }, children: p.rows.map(([label, price]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em", color: "#6FC5DC", marginBottom: 8, lineHeight: 1.2, minHeight: "2.4em", display: "flex", alignItems: "flex-end" }, children: label }),
        /* @__PURE__ */ jsx("div", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(22px,2.4vw,30px)" }, children: price })
      ] }, label)) }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "rgba(255,255,255,.55)", margin: "22px 0 0" }, children: p.note })
    ] }, p.name)) })
  ] }) });
};
const BusinessHours = () => {
  const { t } = useLanguage();
  const hours = `${BUSINESS.opens} – ${BUSINESS.closes}`;
  return /* @__PURE__ */ jsx("section", { id: "horarios", style: { scrollMarginTop: 80, padding: "clamp(72px,11vw,150px) clamp(20px,6vw,96px)", background: "#F6F3EC" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,5vw,72px)", alignItems: "center" }, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(SectionEyebrow, { number: "03", label: t("businessHours") }),
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(32px,6vw,68px)", lineHeight: 0.98, letterSpacing: "-.02em", margin: "0 0 20px", textWrap: "balance" }, children: t("whenVisit") }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: 18, lineHeight: 1.65, color: "rgba(17,49,62,.74)", margin: 0, maxWidth: "42ch" }, children: t("hoursIntro") })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: 24, padding: "clamp(28px,3.4vw,48px)", boxShadow: "0 24px 60px -34px rgba(17,49,62,.4)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "font-display", style: { fontWeight: 700, fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", color: "#0E7C99", marginBottom: 14 }, children: t("dailyHours") }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingBottom: 24, borderBottom: "1px solid rgba(17,49,62,.12)" }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: 20, fontWeight: 600 }, children: t("everyday") }),
        /* @__PURE__ */ jsx("span", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(24px,3vw,38px)", color: "#11313E", letterSpacing: "-.01em" }, children: hours })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: 22, background: "#FBF1DD", border: "1px solid #F0DFB8", borderRadius: 14, padding: "18px 20px" }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, fontWeight: 700, color: "#9A6B17", margin: "0 0 4px" }, children: t("pleaseNote") }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 14, color: "#9A6B17", margin: 0, lineHeight: 1.5 }, children: t("weatherNote") })
      ] })
    ] })
  ] }) });
};
const Location = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id: "ubicacion", style: { scrollMarginTop: 80, padding: "clamp(72px,11vw,150px) clamp(20px,6vw,96px)", background: "#E3EEF1" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx(SectionEyebrow, { number: "04", label: t("findUs") }),
    /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(32px,6vw,68px)", lineHeight: 0.98, letterSpacing: "-.02em", margin: "0 0 clamp(36px,5vw,60px)", maxWidth: "20ch", textWrap: "balance" }, children: t("locationSubtitle") }),
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(20px,3vw,40px)", alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: 24, padding: "clamp(28px,3.4vw,48px)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 28 }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", margin: "0 0 12px", letterSpacing: "-.01em" }, children: "Open Sea" }),
          /* @__PURE__ */ jsxs("p", { style: { fontSize: 18, lineHeight: 1.6, color: "rgba(17,49,62,.8)", margin: 0 }, children: [
            "Paseo Miguel Ángel Blanco, 2",
            /* @__PURE__ */ jsx("br", {}),
            "18690 Almuñécar",
            /* @__PURE__ */ jsx("br", {}),
            "Granada, España"
          ] }),
          /* @__PURE__ */ jsxs("p", { style: { fontSize: 16, lineHeight: 1.65, color: "rgba(17,49,62,.74)", margin: "22px 0 0" }, children: [
            /* @__PURE__ */ jsxs("strong", { style: { color: "#11313E" }, children: [
              t("howToFindUs"),
              ":"
            ] }),
            " ",
            t("locationDescription")
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: MAPS_DIRECTIONS_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            style: { alignSelf: "flex-start", background: "#0E7C99", color: "#fff", padding: "15px 28px", borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: "none" },
            children: [
              t("getDirections"),
              " →"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { style: { borderRadius: 24, overflow: "hidden", minHeight: 340, boxShadow: "0 24px 60px -34px rgba(17,49,62,.4)" }, children: /* @__PURE__ */ jsx(
        "iframe",
        {
          title: "Mapa de OpenSea en la Playa de San Cristóbal, Almuñécar",
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.3!2d-3.695261!3d36.7294014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7189a876287c0f:0x38a35eb411bcec10!2sOpen+Sea!5e0!3m2!1ses!2ses!4v1716400674084!5m2!1ses!2ses",
          width: "100%",
          height: "100%",
          style: { border: 0, display: "block", minHeight: 340 },
          allowFullScreen: true,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade"
        }
      ) })
    ] })
  ] }) });
};
const Footer = () => {
  const { t, routePaths: routePaths2, language } = useLanguage();
  const paths = routePaths2[language];
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const linkStyle = { color: "rgba(255,255,255,.78)", textDecoration: "none", fontSize: 15 };
  const headingStyle = {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: "#6FC5DC",
    margin: "0 0 18px"
  };
  return /* @__PURE__ */ jsx("footer", { style: { background: "#0A2832", color: "rgba(255,255,255,.78)", padding: "clamp(56px,8vw,96px) clamp(20px,6vw,96px) clamp(32px,4vw,48px)" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(32px,4vw,56px)" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-display", style: { fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-.01em", marginBottom: 16 }, children: "OPEN SEA" }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: "38ch" }, children: t("description") })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display", style: headingStyle, children: t("quickLinks") }),
        /* @__PURE__ */ jsxs("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: paths.kayak, style: linkStyle, children: t("kayakRentals") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: paths.paddle, style: linkStyle, children: t("paddleBoardNav") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: MAPS_DIRECTIONS_URL, target: "_blank", rel: "noopener noreferrer", style: linkStyle, children: t("location") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display", style: headingStyle, children: t("businessHours") }),
        /* @__PURE__ */ jsxs("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }, children: [
          /* @__PURE__ */ jsxs("li", { style: { fontSize: 15 }, children: [
            /* @__PURE__ */ jsx("span", { style: { display: "block", color: "#fff", fontWeight: 600 }, children: t("everyday") }),
            BUSINESS.opens,
            " – ",
            BUSINESS.closes
          ] }),
          /* @__PURE__ */ jsx("li", { style: { fontSize: 15 }, children: t("address") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { borderTop: "1px solid rgba(255,255,255,.14)", marginTop: "clamp(40px,5vw,64px)", paddingTop: 24, textAlign: "center", fontSize: 14 }, children: [
      "© ",
      year,
      " OpenSea Kayak & Paddle Surf. ",
      t("allRightsReserved")
    ] })
  ] }) });
};
const stripTrailingSlash = (p) => p.length > 1 ? p.replace(/\/$/, "") : p;
const SEO = ({
  title,
  description,
  keywords,
  image = `${SITE_URL}/logo.png`,
  type = "website",
  structuredData
}) => {
  const location = useLocation();
  const { language, routePaths: routePaths2 } = useLanguage();
  const path = stripTrailingSlash(location.pathname);
  const currentUrl = `${SITE_URL}${path}`;
  const types = ["home", "kayak", "paddle"];
  const langs = ["en", "es", "fr"];
  let routeType = "home";
  for (const t of types) {
    if (langs.some((l) => stripTrailingSlash(routePaths2[l][t]) === path)) {
      routeType = t;
      break;
    }
  }
  const hreflangUrls = {
    en: `${SITE_URL}${routePaths2.en[routeType]}`,
    es: `${SITE_URL}${routePaths2.es[routeType]}`,
    fr: `${SITE_URL}${routePaths2.fr[routeType]}`
  };
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    image,
    url: currentUrl,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude
    },
    hasMap: GBP_URL,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: BUSINESS.opens,
      closes: BUSINESS.closes
    },
    ...BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}
  };
  const finalStructuredData = structuredData || defaultStructuredData;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: currentUrl }),
    /* @__PURE__ */ jsx("html", { lang: language }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "en", href: hreflangUrls.en }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "es", href: hreflangUrls.es }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "fr", href: hreflangUrls.fr }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: hreflangUrls.es }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: currentUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: language === "es" ? "es_ES" : language === "fr" ? "fr_FR" : "en_US" }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: BUSINESS.name }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: BUSINESS.name }),
    /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "ES-AN" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: "Almuñécar" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.position", content: `${BUSINESS.latitude};${BUSINESS.longitude}` }),
    /* @__PURE__ */ jsx("meta", { name: "ICBM", content: `${BUSINESS.latitude}, ${BUSINESS.longitude}` }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(finalStructuredData) })
  ] });
};
const AboutUs = () => {
  const { t, language } = useLanguage();
  const content = {
    en: {
      title: "About OpenSea — Your Local Water Sports Experts",
      subtitle: "Operating on Playa de San Cristóbal since 2015",
      description: "Founded by passionate water sports enthusiasts, OpenSea has been introducing visitors and locals to the beauty of the Costa Tropical's coastline. We rent quality kayaks and paddle boards right on the beach so everyone can enjoy the Mediterranean safely.",
      certifications: "We specialize in kayak and paddle surf rentals for all ages and skill levels, with stable equipment and life jackets included. We prioritize safety and fun on the water.",
      commitment: "We are committed to sustainable tourism and protecting our beautiful marine environment. All our kayak and paddle surf activities follow eco-friendly practices to preserve the Costa Tropical for future generations.",
      caption: "Quality kayaks and paddle boards on Playa de San Cristóbal, ready for your Mediterranean day out"
    },
    es: {
      title: "Sobre OpenSea — Tus Expertos Locales en Deportes Acuáticos",
      subtitle: "Operando en Playa de San Cristóbal desde 2015",
      description: "Fundada por apasionados de los deportes acuáticos, OpenSea lleva años acercando a visitantes y locales a la belleza de la costa de la Costa Tropical. Alquilamos kayaks y tablas de paddle de calidad en la misma playa para que todos disfruten del Mediterráneo con seguridad.",
      certifications: "Nos especializamos en el alquiler de kayaks y paddle surf para todas las edades y niveles, con equipo estable y chaleco salvavidas incluido. Priorizamos la seguridad y la diversión en el agua.",
      commitment: "Estamos comprometidos con el turismo sostenible y la protección de nuestro hermoso entorno marino. Todas nuestras actividades de kayak y paddle surf siguen prácticas eco-amigables para preservar la Costa Tropical para las futuras generaciones.",
      caption: "Kayaks y tablas de paddle de calidad en la Playa de San Cristóbal, listos para tu día en el Mediterráneo"
    },
    fr: {
      title: "À Propos d'OpenSea — Vos Experts Locaux en Sports Nautiques",
      subtitle: "Présents sur la Playa de San Cristóbal depuis 2015",
      description: "Fondée par des passionnés de sports nautiques, OpenSea initie depuis des années les visiteurs et les locaux à la beauté du littoral de la Costa Tropical. Nous louons des kayaks et des planches de paddle de qualité directement sur la plage pour que chacun profite de la Méditerranée en toute sécurité.",
      certifications: "Nous sommes spécialisés dans la location de kayaks et de paddle surf pour tous les âges et niveaux, avec un matériel stable et un gilet de sauvetage inclus. Nous priorisons la sécurité et le plaisir sur l'eau.",
      commitment: "Nous sommes engagés dans un tourisme durable et la protection de notre magnifique environnement marin. Toutes nos activités de kayak et paddle surf suivent des pratiques éco-responsables pour préserver la Costa Tropical pour les générations futures.",
      caption: "Kayaks et planches de paddle de qualité sur la Playa de San Cristóbal, prêts pour votre journée en Méditerranée"
    }
  };
  const data = content[language];
  return /* @__PURE__ */ jsx("section", { id: "sobre", style: { scrollMarginTop: 80, padding: "clamp(72px,11vw,150px) clamp(20px,6vw,96px)", background: "#F6F3EC" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx(SectionEyebrow, { number: "05", label: t("aboutUs") }),
    /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(30px,5vw,60px)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 6px", maxWidth: "22ch", textWrap: "balance" }, children: data.title }),
    /* @__PURE__ */ jsx("p", { style: { fontSize: "clamp(18px,2vw,22px)", color: "#0E7C99", fontWeight: 600, margin: "0 0 clamp(40px,6vw,64px)" }, children: data.subtitle }),
    /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,5vw,72px)", alignItems: "start" }, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 18, lineHeight: 1.7, margin: "0 0 22px", color: "#11313E" }, children: data.description }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: 16, lineHeight: 1.7, margin: "0 0 22px", color: "rgba(17,49,62,.74)" }, children: data.certifications }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: 16, lineHeight: 1.7, margin: 0, color: "rgba(17,49,62,.74)", fontStyle: "italic" }, children: data.commitment })
    ] }) }),
    /* @__PURE__ */ jsxs("figure", { style: { margin: "clamp(40px,6vw,72px) 0 0" }, children: [
      /* @__PURE__ */ jsx("div", { style: { borderRadius: 24, overflow: "hidden", aspectRatio: "16 / 8", boxShadow: "0 30px 70px -38px rgba(17,49,62,.45)" }, children: /* @__PURE__ */ jsx(
        OptimizedImage,
        {
          src: "/images/kayak.png",
          alt: "Kayaks de alquiler de OpenSea en la Playa de San Cristóbal, Almuñécar",
          sizes: "(max-width: 1280px) 100vw, 1280px"
        }
      ) }),
      /* @__PURE__ */ jsx("figcaption", { style: { fontSize: 14, color: "rgba(17,49,62,.6)", marginTop: 14, textAlign: "center" }, children: data.caption })
    ] })
  ] }) });
};
const FAQ = {
  es: [
    {
      q: "¿Qué actividades acuáticas hay disponibles en Almuñécar?",
      a: "Alquilamos kayaks individuales y dobles, tablas de paddle surf (SUP) y bicicletas de agua en la Playa de San Cristóbal, Almuñécar."
    },
    {
      q: "¿Necesito experiencia para los deportes acuáticos en Almuñécar?",
      a: "¡No se necesita experiencia! Nuestro equipo estable y las aguas tranquilas de la bahía son perfectos para principiantes. Te explicamos lo básico antes de salir y proporcionamos todo el equipo de seguridad."
    },
    {
      q: "¿Qué incluye el precio del alquiler?",
      a: "Todos los alquileres incluyen el equipo (kayak o tabla de SUP), el remo y el chaleco salvavidas."
    },
    {
      q: "¿Cuáles son las mejores condiciones para los deportes acuáticos en la Costa Tropical?",
      a: "La Costa Tropical disfruta de más de 300 días de sol al año. Las mañanas suelen ofrecer las aguas más tranquilas; las tardes traen brisas suaves ideales para remar con más aventura."
    },
    {
      q: "¿Cómo reservo actividades acuáticas en Almuñécar?",
      a: "Puedes visitarnos directamente en la Playa de San Cristóbal en Almuñécar. Recomendamos venir con antelación durante la temporada alta (julio y agosto)."
    }
  ],
  en: [
    {
      q: "What water activities are available in Almuñécar?",
      a: "We rent single and double kayaks, stand-up paddle boards (SUP), and water bikes on Playa de San Cristóbal, Almuñécar."
    },
    {
      q: "Do I need experience for water sports in Almuñécar?",
      a: "No experience needed! Our stable equipment and the calm bay waters are perfect for beginners. We show you the basics before you set off and provide all safety equipment."
    },
    {
      q: "What does the rental price include?",
      a: "Every rental includes the equipment (kayak or SUP board), paddle, and life jacket."
    },
    {
      q: "What are the best conditions for water sports on the Costa Tropical?",
      a: "The Costa Tropical enjoys over 300 days of sunshine a year. Mornings usually offer the calmest water; afternoons bring gentle breezes ideal for more adventurous paddling."
    },
    {
      q: "How do I book water activities in Almuñécar?",
      a: "Visit us directly on Playa de San Cristóbal in Almuñécar. We recommend arriving early during high season (July and August)."
    }
  ],
  fr: [
    {
      q: "Quelles activités nautiques sont disponibles à Almuñécar ?",
      a: "Nous louons des kayaks simples et doubles, des planches de paddle surf (SUP) et des vélos aquatiques sur la Playa de San Cristóbal, Almuñécar."
    },
    {
      q: "Ai-je besoin d'expérience pour les sports nautiques à Almuñécar ?",
      a: "Aucune expérience requise ! Notre matériel stable et les eaux calmes de la baie sont parfaits pour les débutants. Nous vous expliquons les bases avant le départ et fournissons tout l'équipement de sécurité."
    },
    {
      q: "Que comprend le prix de la location ?",
      a: "Chaque location comprend le matériel (kayak ou planche SUP), la pagaie et le gilet de sauvetage."
    },
    {
      q: "Quelles sont les meilleures conditions pour les sports nautiques sur la Costa Tropical ?",
      a: "La Costa Tropical bénéficie de plus de 300 jours de soleil par an. Les matins offrent les eaux les plus calmes ; les après-midis apportent de légères brises idéales pour pagayer."
    },
    {
      q: "Comment réserver des activités nautiques à Almuñécar ?",
      a: "Rendez-nous visite directement sur la Playa de San Cristóbal à Almuñécar. Nous recommandons de venir tôt en haute saison (juillet et août)."
    }
  ]
};
const SchemaMarkup = () => {
  const { language } = useLanguage();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    alternateName: "OpenSea Almuñécar",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.telephone,
      contactType: "customer service",
      areaServed: "ES",
      availableLanguage: ["Spanish", "English", "French"]
    },
    ...BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: BUSINESS.name,
    description: "Alquiler de kayak y paddle surf en Almuñécar, Granada. Costa Tropical.",
    image: [
      `${SITE_URL}/logo.png`,
      `${SITE_URL}/images/kayak-1200w.jpg`,
      `${SITE_URL}/images/paddle-1200w.jpg`
    ],
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude
    },
    hasMap: GBP_URL,
    areaServed: { "@type": "Place", name: "Costa Tropical, Granada" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: BUSINESS.opens,
      closes: BUSINESS.closes
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Water Sports Rentals",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kayak Rental",
            description: "Single and double kayak rentals for exploring the Costa Tropical"
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "10.00",
            priceCurrency: "EUR"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Stand Up Paddle Board Rental",
            description: "SUP board rentals with all equipment included"
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "12.00",
            priceCurrency: "EUR"
          }
        }
      ]
    },
    ...BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ[language].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a }
    }))
  };
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(organizationSchema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqSchema) })
  ] });
};
const Index = () => {
  const { language } = useLanguage();
  const seoData = {
    en: {
      title: "OpenSea Kayak & Paddle Surf Almuñécar | Water Sports Costa Tropical",
      description: "Rent kayaks, paddle boards (SUP), and water bikes in Almuñécar, Granada. Calm-bay conditions for all ages on the Costa Tropical. Open daily 11:00–20:00.",
      keywords: "kayak rental Almuñécar, paddle surf Almuñécar, water sports Costa Tropical, SUP rental Granada, kayak Almuñécar, beach activities Almuñécar"
    },
    es: {
      title: "OpenSea Kayak y Paddle Surf Almuñécar | Deportes Acuáticos Costa Tropical",
      description: "Alquila kayaks, tablas de paddle surf (SUP) y bicicletas de agua en Almuñécar, Granada. Aguas tranquilas para todas las edades en la Costa Tropical. Abierto todos los días 11:00–20:00.",
      keywords: "alquiler kayak Almuñécar, paddle surf Almuñécar, deportes acuáticos Costa Tropical, alquiler SUP Granada, kayak Almuñécar, actividades playa Almuñécar"
    },
    fr: {
      title: "OpenSea Kayak et Paddle Surf Almuñécar | Sports Nautiques Costa Tropical",
      description: "Louez kayaks, planches de paddle (SUP) et vélos aquatiques à Almuñécar, Grenade. Eaux calmes pour tous les âges sur la Costa Tropical. Ouvert tous les jours 11h–20h.",
      keywords: "location kayak Almuñécar, paddle surf Almuñécar, sports nautiques Costa Tropical, location SUP Grenade, kayak Almuñécar, activités plage Almuñécar"
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoData[language].title,
        description: seoData[language].description,
        keywords: seoData[language].keywords
      }
    ),
    /* @__PURE__ */ jsx(SchemaMarkup, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Services, {}),
    /* @__PURE__ */ jsx(Prices, {}),
    /* @__PURE__ */ jsx(BusinessHours, {}),
    /* @__PURE__ */ jsx(Location, {}),
    /* @__PURE__ */ jsx(AboutUs, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_not_found", {
        "page_location": location.pathname,
        "event_category": "navigation"
      });
    }
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
const PageHero = ({ image, imageAlt = "", eyebrow, title, subtitle, pricesAnchor }) => {
  const { t } = useLanguage();
  const base = image ? image.substring(0, image.lastIndexOf(".")) : "";
  return /* @__PURE__ */ jsxs(
    "header",
    {
      style: {
        position: "relative",
        minHeight: image ? "clamp(440px,64svh,660px)" : "clamp(420px,60svh,620px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: image ? "#0A5E74" : "linear-gradient(155deg, #0A2832 0%, #0A5E74 55%, #0E7C99 100%)"
      },
      children: [
        image ? /* @__PURE__ */ jsxs("picture", { children: [
          /* @__PURE__ */ jsx("source", { type: "image/webp", srcSet: `${base}-800w.webp 800w, ${base}-1200w.webp 1200w, ${base}-1600w.webp 1600w`, sizes: "100vw" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `${base}-1200w.jpg`,
              alt: imageAlt,
              ...{ fetchpriority: "high" },
              decoding: "async",
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0, opacity: 0.5, background: "radial-gradient(120% 80% at 80% 10%, rgba(111,197,220,.4) 0%, transparent 55%)" } }),
        image && /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,40,52,.55) 0%, rgba(8,40,52,.2) 40%, rgba(8,40,52,.82) 100%)" } }),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto", padding: "clamp(110px,15vh,170px) clamp(20px,6vw,96px) clamp(48px,7vw,84px)", color: "#fff" }, children: [
          /* @__PURE__ */ jsx("div", { className: "font-display", style: { fontWeight: 700, letterSpacing: ".28em", fontSize: 13, textTransform: "uppercase", opacity: 0.9, marginBottom: 18 }, children: eyebrow }),
          /* @__PURE__ */ jsx("h1", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(34px,6.5vw,80px)", lineHeight: 0.94, letterSpacing: "-.025em", maxWidth: "20ch", margin: "0 0 18px", textWrap: "balance" }, children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { style: { fontSize: "clamp(17px,1.8vw,22px)", fontWeight: 600, opacity: 0.92, margin: pricesAnchor ? "0 0 28px" : 0, maxWidth: "48ch" }, children: subtitle }),
          pricesAnchor && /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 14 }, children: [
            /* @__PURE__ */ jsx("a", { href: pricesAnchor, style: { background: "#fff", color: "#11313E", padding: "15px 28px", borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: "none" }, children: t("viewPricesButton") }),
            /* @__PURE__ */ jsx("a", { href: MAPS_DIRECTIONS_URL, target: "_blank", rel: "noopener noreferrer", style: { border: "1.5px solid rgba(255,255,255,.55)", color: "#fff", padding: "15px 28px", borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: "none" }, children: t("getDirections") })
          ] })
        ] })
      ]
    }
  );
};
const KayakRental = () => {
  const { t, language } = useLanguage();
  const kayakContent = {
    en: {
      eyebrow: "Kayak Rental · Almuñécar",
      title: "Kayak Rental Almuñécar — Explore the Costa Tropical",
      subtitle: "Premium Kayak Rentals on the Mediterranean Coast",
      intro: "Discover the stunning coastline of Almuñécar, Granada with our high-quality kayak rentals. Perfect for exploring hidden coves, crystal-clear waters, and the beautiful beaches of the Costa Tropical.",
      whyTitle: "Why Choose Our Kayak Rentals",
      pricesTitle: "Kayak Rental Prices",
      locationTitle: "Find Us in Almuñécar",
      features: [
        { title: "Stable & Safe Kayaks", desc: "Modern sit-on-top kayaks suitable for beginners and experts" },
        { title: "All Equipment Included", desc: "Life jackets and paddles provided with every rental" },
        { title: "Family Friendly", desc: "Double kayaks perfect for couples or parent-child outings" }
      ]
    },
    es: {
      eyebrow: "Alquiler de Kayak · Almuñécar",
      title: "Alquiler de Kayak Almuñécar — Explora la Costa Tropical",
      subtitle: "Alquiler Premium de Kayaks en la Costa Mediterránea",
      intro: "Descubre la impresionante costa de Almuñécar, Granada con nuestro alquiler de kayaks de alta calidad. Perfecto para explorar calas ocultas, aguas cristalinas y las hermosas playas de la Costa Tropical.",
      whyTitle: "Por Qué Elegir Nuestro Alquiler de Kayaks",
      pricesTitle: "Precios de Alquiler de Kayak",
      locationTitle: "Encuéntranos en Almuñécar",
      features: [
        { title: "Kayaks Estables y Seguros", desc: "Kayaks modernos tipo sit-on-top aptos para principiantes y expertos" },
        { title: "Todo el Equipo Incluido", desc: "Chalecos salvavidas y remos incluidos en cada alquiler" },
        { title: "Ideal para Familias", desc: "Kayaks dobles perfectos para parejas o salidas en familia" }
      ]
    },
    fr: {
      eyebrow: "Location de Kayak · Almuñécar",
      title: "Location de Kayak Almuñécar — Explorez la Costa Tropical",
      subtitle: "Location Premium de Kayaks sur la Côte Méditerranéenne",
      intro: "Découvrez le magnifique littoral d'Almuñécar, Grenade avec nos locations de kayaks de haute qualité. Parfait pour explorer les criques cachées, les eaux cristallines et les belles plages de la Costa Tropical.",
      whyTitle: "Pourquoi Choisir Nos Locations de Kayaks",
      pricesTitle: "Prix de Location de Kayak",
      locationTitle: "Trouvez-nous à Almuñécar",
      features: [
        { title: "Kayaks Stables et Sûrs", desc: "Kayaks modernes sit-on-top adaptés aux débutants et experts" },
        { title: "Tout l'Équipement Inclus", desc: "Gilets de sauvetage et pagaies fournis avec chaque location" },
        { title: "Convivial pour les Familles", desc: "Kayaks doubles parfaits pour couples ou sorties en famille" }
      ]
    }
  };
  const content = kayakContent[language];
  const seoData = {
    en: {
      title: "Kayak Rental Almuñécar | OpenSea Costa Tropical Granada",
      description: "Rent single and double kayaks in Almuñécar, Granada. Explore the Costa Tropical's hidden beaches and crystal-clear waters. Life jackets and paddles included.",
      keywords: "kayak rental Almuñécar, kayak hire Granada, Costa Tropical kayaking, sea kayak Almuñécar, double kayak Almuñécar"
    },
    es: {
      title: "Alquiler de Kayak Almuñécar | OpenSea Costa Tropical Granada",
      description: "Alquila kayaks individuales y dobles en Almuñécar, Granada. Explora las playas ocultas y aguas cristalinas de la Costa Tropical. Chalecos y remos incluidos.",
      keywords: "alquiler kayak Almuñécar, alquiler kayak Granada, kayak Costa Tropical, kayak de mar Almuñécar, kayak doble Almuñécar"
    },
    fr: {
      title: "Location de Kayak Almuñécar | OpenSea Costa Tropical Grenade",
      description: "Louez des kayaks simples et doubles à Almuñécar, Grenade. Explorez les plages cachées et les eaux cristallines de la Costa Tropical. Gilets et pagaies inclus.",
      keywords: "location kayak Almuñécar, location kayak Grenade, kayak Costa Tropical, kayak de mer Almuñécar, kayak double Almuñécar"
    }
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Kayak Rental",
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        postalCode: BUSINESS.postalCode,
        addressCountry: BUSINESS.addressCountry
      }
    },
    areaServed: { "@type": "Place", name: "Costa Tropical, Granada" },
    offers: [
      { "@type": "Offer", name: "Single Kayak Rental (1 hour)", price: "10.00", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Double Kayak Rental (1 hour)", price: "15.00", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Double Kayak Rental (full day)", price: "60.00", priceCurrency: "EUR" }
    ]
  };
  const kayakProducts = [PRODUCTS.twoPersonKayak, PRODUCTS.onePersonKayak].map((p) => ({
    name: t(p.nameKey),
    rows: p.rows.map((r) => [t(r.labelKey), r.price])
  }));
  return /* @__PURE__ */ jsxs("div", { style: { background: "#F6F3EC", color: "#11313E", overflowX: "hidden" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoData[language].title,
        description: seoData[language].description,
        keywords: seoData[language].keywords,
        structuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        image: "/images/kayak.png",
        imageAlt: "Kayaks de colores en la playa de San Cristóbal en Almuñécar listos para alquilar, Costa Tropical",
        eyebrow: content.eyebrow,
        title: content.title,
        subtitle: content.subtitle,
        pricesAnchor: "#precios-kayak"
      }
    ),
    /* @__PURE__ */ jsx("section", { style: { padding: "clamp(64px,9vw,120px) clamp(20px,6vw,96px)", background: "#F6F3EC" }, children: /* @__PURE__ */ jsx("p", { style: { maxWidth: "62ch", margin: "0 auto", textAlign: "center", fontSize: "clamp(19px,2.2vw,26px)", lineHeight: 1.55, color: "#11313E", fontWeight: 500 }, children: content.intro }) }),
    /* @__PURE__ */ jsx("section", { style: { padding: "clamp(64px,9vw,130px) clamp(20px,6vw,96px)", background: "#E3EEF1" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(28px,4.5vw,54px)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 clamp(36px,5vw,60px)", textWrap: "balance" }, children: content.whyTitle }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(16px,2vw,24px)" }, children: content.features.map((f) => /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: 18, padding: "clamp(24px,2.6vw,34px)" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display", style: { fontWeight: 800, fontSize: 21, margin: "0 0 10px", letterSpacing: "-.01em" }, children: f.title }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 16, lineHeight: 1.6, color: "rgba(17,49,62,.74)", margin: 0 }, children: f.desc })
      ] }, f.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "precios-kayak", style: { scrollMarginTop: 80, padding: "clamp(64px,9vw,130px) clamp(20px,6vw,96px)", background: "#11313E", color: "#fff" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 980, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(28px,4.5vw,54px)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 clamp(32px,4vw,48px)", textAlign: "center" }, children: content.pricesTitle }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(16px,2vw,28px)" }, children: kayakProducts.map((product) => /* @__PURE__ */ jsxs("div", { style: { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: "clamp(24px,2.6vw,36px)" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(22px,2.4vw,28px)", margin: "0 0 24px", letterSpacing: "-.01em" }, children: product.name }),
        /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }, children: product.rows.map(([label, price]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em", color: "#6FC5DC", marginBottom: 8, lineHeight: 1.2, minHeight: "2.4em", display: "flex", alignItems: "flex-end" }, children: label }),
          /* @__PURE__ */ jsx("div", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(22px,2.4vw,30px)" }, children: price })
        ] }, label)) })
      ] }, product.name)) }),
      /* @__PURE__ */ jsx("p", { style: { textAlign: "center", fontSize: 14, color: "rgba(255,255,255,.55)", margin: "22px 0 0" }, children: t("includeLife") })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: { padding: "clamp(64px,9vw,120px) clamp(20px,6vw,96px)", background: "#F6F3EC" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(26px,4vw,46px)", letterSpacing: "-.02em", margin: "0 0 clamp(28px,4vw,44px)" }, children: content.locationTitle }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14, alignItems: "center", fontSize: 18, color: "#11313E" }, children: [
        /* @__PURE__ */ jsx("p", { style: { margin: 0 }, children: /* @__PURE__ */ jsx("strong", { children: t("address") }) }),
        /* @__PURE__ */ jsxs("p", { style: { margin: 0, color: "rgba(17,49,62,.74)" }, children: [
          t("everyday"),
          ": ",
          BUSINESS.opens,
          " – ",
          BUSINESS.closes
        ] }),
        /* @__PURE__ */ jsx("p", { style: { margin: 0, color: "rgba(17,49,62,.74)" }, children: BUSINESS.telephoneDisplay })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const PaddleBoard = () => {
  const { t, language } = useLanguage();
  const paddleContent = {
    en: {
      eyebrow: "Paddle Surf · SUP · Almuñécar",
      title: "Paddle Board Almuñécar — SUP Rentals Costa Tropical",
      subtitle: "Stand Up Paddle Board Rentals in Granada",
      intro: "Experience the Mediterranean Sea like never before with our paddle board rentals in Almuñécar. Perfect conditions for SUP with calm waters, stunning views of the Sierra Nevada, and year-round sunshine.",
      whyTitle: "Why Choose Our SUP Rentals",
      pricesTitle: "Paddle Surf Prices",
      locationTitle: "SUP Location in Almuñécar",
      benefits: [
        { title: "Beginner Friendly", desc: "Stable boards and calm bay perfect for first-timers" },
        { title: "All Equipment Included", desc: "Life jackets and paddles provided with every board" },
        { title: "Easy to Paddle", desc: "Stable boards suited to the calm waters of our bay" }
      ]
    },
    es: {
      eyebrow: "Paddle Surf · SUP · Almuñécar",
      title: "Paddle Board Almuñécar — Alquiler SUP Costa Tropical",
      subtitle: "Alquiler de Tablas de Paddle Surf en Granada",
      intro: "Experimenta el Mar Mediterráneo como nunca antes con nuestro alquiler de paddle board en Almuñécar. Condiciones perfectas para SUP con aguas tranquilas, vistas impresionantes de Sierra Nevada y sol todo el año.",
      whyTitle: "Por Qué Elegir Nuestro Alquiler SUP",
      pricesTitle: "Precios de Paddle Surf",
      locationTitle: "Ubicación SUP en Almuñécar",
      benefits: [
        { title: "Ideal para Principiantes", desc: "Tablas estables y bahía tranquila perfecta para novatos" },
        { title: "Todo el Equipo Incluido", desc: "Chalecos salvavidas y remos incluidos con cada tabla" },
        { title: "Fácil de Remar", desc: "Tablas estables ideales para las aguas tranquilas de nuestra bahía" }
      ]
    },
    fr: {
      eyebrow: "Paddle Surf · SUP · Almuñécar",
      title: "Paddle Board Almuñécar — Location SUP Costa Tropical",
      subtitle: "Location de Stand Up Paddle à Grenade",
      intro: "Découvrez la Mer Méditerranée comme jamais avec nos locations de paddle board à Almuñécar. Conditions parfaites pour le SUP avec des eaux calmes, des vues époustouflantes sur la Sierra Nevada et du soleil toute l'année.",
      whyTitle: "Pourquoi Choisir Nos Locations SUP",
      pricesTitle: "Prix de Stand Up Paddle",
      locationTitle: "Emplacement SUP à Almuñécar",
      benefits: [
        { title: "Adapté aux Débutants", desc: "Planches stables et baie calme parfaites pour les novices" },
        { title: "Tout l'Équipement Inclus", desc: "Gilets de sauvetage et pagaies fournis avec chaque planche" },
        { title: "Facile à Pagayer", desc: "Planches stables idéales pour les eaux calmes de notre baie" }
      ]
    }
  };
  const content = paddleContent[language];
  const seoData = {
    en: {
      title: "Paddle Board Rental Almuñécar | SUP Costa Tropical Granada",
      description: "Rent stand up paddle boards (SUP) in Almuñécar, Granada. Perfect conditions for beginners and experts. Life jackets and paddles included.",
      keywords: "paddle board rental Almuñécar, SUP hire Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Granada"
    },
    es: {
      title: "Alquiler Paddle Surf Almuñécar | SUP Costa Tropical Granada",
      description: "Alquila tablas de paddle surf (SUP) en Almuñécar, Granada. Condiciones perfectas para principiantes y expertos. Chalecos salvavidas y remos incluidos.",
      keywords: "alquiler paddle surf Almuñécar, alquiler SUP Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle board Granada"
    },
    fr: {
      title: "Location Paddle Board Almuñécar | SUP Costa Tropical Grenade",
      description: "Louez des planches de stand up paddle (SUP) à Almuñécar, Grenade. Conditions parfaites pour débutants et experts. Gilets de sauvetage et pagaies inclus.",
      keywords: "location paddle board Almuñécar, location SUP Grenade, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Grenade"
    }
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Stand Up Paddle Board Rental",
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        postalCode: BUSINESS.postalCode,
        addressCountry: BUSINESS.addressCountry
      }
    },
    areaServed: { "@type": "Place", name: "Costa Tropical, Granada" },
    offers: [
      { "@type": "Offer", name: "1 Hour SUP Rental", price: "12.00", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Full Day SUP Rental", price: "50.00", priceCurrency: "EUR" }
    ]
  };
  const priceRows = PRODUCTS.paddleSurf.rows.map((r) => [t(r.labelKey), r.price]);
  return /* @__PURE__ */ jsxs("div", { style: { background: "#F6F3EC", color: "#11313E", overflowX: "hidden" }, children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoData[language].title,
        description: seoData[language].description,
        keywords: seoData[language].keywords,
        structuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        image: "/images/paddle.png",
        imageAlt: "Paddle surf sobre aguas tranquilas del Mediterráneo en Almuñécar, Costa Tropical",
        eyebrow: content.eyebrow,
        title: content.title,
        subtitle: content.subtitle,
        pricesAnchor: "#precios-paddle"
      }
    ),
    /* @__PURE__ */ jsx("section", { style: { padding: "clamp(64px,9vw,120px) clamp(20px,6vw,96px)", background: "#F6F3EC" }, children: /* @__PURE__ */ jsx("p", { style: { maxWidth: "62ch", margin: "0 auto", textAlign: "center", fontSize: "clamp(19px,2.2vw,26px)", lineHeight: 1.55, color: "#11313E", fontWeight: 500 }, children: content.intro }) }),
    /* @__PURE__ */ jsx("section", { style: { padding: "clamp(64px,9vw,130px) clamp(20px,6vw,96px)", background: "#E3EEF1" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(28px,4.5vw,54px)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 clamp(36px,5vw,60px)", textWrap: "balance" }, children: content.whyTitle }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(16px,2vw,24px)" }, children: content.benefits.map((b) => /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: 18, padding: "clamp(26px,3vw,40px)", textAlign: "center" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display", style: { fontWeight: 800, fontSize: 22, margin: "0 0 12px", letterSpacing: "-.01em" }, children: b.title }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 16, lineHeight: 1.6, color: "rgba(17,49,62,.74)", margin: 0 }, children: b.desc })
      ] }, b.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "precios-paddle", style: { scrollMarginTop: 80, padding: "clamp(64px,9vw,130px) clamp(20px,6vw,96px)", background: "#11313E", color: "#fff" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 760, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(28px,4.5vw,54px)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 clamp(32px,4vw,48px)", textAlign: "center" }, children: content.pricesTitle }),
      /* @__PURE__ */ jsx("div", { style: { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, overflow: "hidden" }, children: priceRows.map(([label, price], i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px clamp(22px,3vw,34px)", borderBottom: i < priceRows.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none" }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: 18 }, children: label }),
        /* @__PURE__ */ jsx("span", { className: "font-display", style: { fontWeight: 800, fontSize: 24 }, children: price })
      ] }, label)) }),
      /* @__PURE__ */ jsx("p", { style: { textAlign: "center", fontSize: 14, color: "rgba(255,255,255,.55)", margin: "22px 0 0" }, children: t("allEquipment") })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: { padding: "clamp(64px,9vw,120px) clamp(20px,6vw,96px)", background: "#F6F3EC" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1280, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: { fontWeight: 800, fontSize: "clamp(26px,4vw,46px)", letterSpacing: "-.02em", margin: "0 0 clamp(28px,4vw,44px)" }, children: content.locationTitle }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14, alignItems: "center", fontSize: 18, color: "#11313E" }, children: [
        /* @__PURE__ */ jsx("p", { style: { margin: 0 }, children: /* @__PURE__ */ jsx("strong", { children: t("address") }) }),
        /* @__PURE__ */ jsxs("p", { style: { margin: 0, color: "rgba(17,49,62,.74)" }, children: [
          t("everyday"),
          ": ",
          BUSINESS.opens,
          " – ",
          BUSINESS.closes
        ] }),
        /* @__PURE__ */ jsx("p", { style: { margin: 0, color: "rgba(17,49,62,.74)" }, children: BUSINESS.telephoneDisplay })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const queryClient = new QueryClient();
const AppShell = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(LanguageProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/kayak-rental-almunecar", element: /* @__PURE__ */ jsx(KayakRental, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/paddle-board-almunecar", element: /* @__PURE__ */ jsx(PaddleBoard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/es", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/es/alquiler-kayak-almunecar", element: /* @__PURE__ */ jsx(KayakRental, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/es/paddle-surf-almunecar", element: /* @__PURE__ */ jsx(PaddleBoard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fr", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fr/location-kayak-almunecar", element: /* @__PURE__ */ jsx(KayakRental, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fr/paddle-board-almunecar", element: /* @__PURE__ */ jsx(PaddleBoard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/kayak", element: /* @__PURE__ */ jsx(Navigate, { to: "/kayak-rental-almunecar", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/paddle", element: /* @__PURE__ */ jsx(Navigate, { to: "/paddle-board-almunecar", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] })
] }) }) });
function render(url) {
  const helmetContext = {};
  const html = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(AppShell, {}) }) })
  );
  const helmet = helmetContext.helmet;
  const head = helmet ? [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString()
  ].filter(Boolean).join("\n") : "";
  const htmlAttributes = helmet ? helmet.htmlAttributes.toString() : "";
  return { html, head, htmlAttributes };
}
export {
  ROUTES,
  render
};
