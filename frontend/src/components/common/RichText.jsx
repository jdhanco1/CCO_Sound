/**
 * Simple serializer for Payload CMS Lexical rich text JSON → React JSX.
 * Handles: paragraphs, headings (h1-h6), bold, italic, underline, strikethrough,
 * inline code, blockquote, ordered/unordered lists, links, line breaks.
 */

import React from 'react';

function renderText(node, i) {
  let el = node.text;
  if (!el) return null;

  // Format flags: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
  if (node.format & 16) el = <code key={i} className="rounded bg-gray-100 px-1 font-mono text-sm">{el}</code>;
  if (node.format & 8)  el = <u key={i}>{el}</u>;
  if (node.format & 4)  el = <s key={i}>{el}</s>;
  if (node.format & 2)  el = <em key={i}>{el}</em>;
  if (node.format & 1)  el = <strong key={i}>{el}</strong>;

  return <React.Fragment key={i}>{el}</React.Fragment>;
}

function renderChildren(children) {
  if (!children) return null;
  return children.map((child, i) => renderNode(child, i));
}

function renderNode(node, i) {
  if (!node) return null;

  switch (node.type) {
    case 'text':
      return renderText(node, i);

    case 'linebreak':
      return <br key={i} />;

    case 'paragraph':
      return (
        <p key={i} className="mb-4 leading-relaxed text-gray-700">
          {renderChildren(node.children)}
        </p>
      );

    case 'heading': {
      const Tag = node.tag || 'h2';
      const classes = {
        h1: 'mb-4 mt-8 font-serif text-3xl font-bold text-brand-dark',
        h2: 'mb-3 mt-8 font-serif text-2xl font-bold text-brand-dark',
        h3: 'mb-3 mt-6 font-serif text-xl font-bold text-brand-dark',
        h4: 'mb-2 mt-6 font-serif text-lg font-bold text-brand-dark',
        h5: 'mb-2 mt-4 font-serif text-base font-bold text-brand-dark',
        h6: 'mb-2 mt-4 font-serif text-sm font-bold text-brand-dark',
      };
      return (
        <Tag key={i} className={classes[Tag] || classes.h2}>
          {renderChildren(node.children)}
        </Tag>
      );
    }

    case 'quote':
      return (
        <blockquote key={i} className="my-6 border-l-4 border-accent pl-4 font-serif text-lg italic text-gray-600">
          {renderChildren(node.children)}
        </blockquote>
      );

    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul';
      const classes = node.listType === 'number'
        ? 'mb-4 ml-6 list-decimal space-y-1 text-gray-700'
        : 'mb-4 ml-6 list-disc space-y-1 text-gray-700';
      return (
        <Tag key={i} className={classes}>
          {renderChildren(node.children)}
        </Tag>
      );
    }

    case 'listitem':
      return (
        <li key={i} className="leading-relaxed">
          {renderChildren(node.children)}
        </li>
      );

    case 'link': {
      const href = node.fields?.url || node.url || '#';
      const newTab = node.fields?.newTab || false;
      return (
        <a
          key={i}
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className="text-brand underline transition hover:text-accent"
        >
          {renderChildren(node.children)}
        </a>
      );
    }

    case 'horizontalrule':
      return <hr key={i} className="my-8 border-gray-200" />;

    default:
      // Fallback: just render children
      return <React.Fragment key={i}>{renderChildren(node.children)}</React.Fragment>;
  }
}

export default function RichText({ content, className = '' }) {
  if (!content) return null;

  // Payload wraps content in { root: { children: [...] } }
  const nodes = content?.root?.children || (Array.isArray(content) ? content : []);

  return (
    <div className={className}>
      {nodes.map((node, i) => renderNode(node, i))}
    </div>
  );
}
