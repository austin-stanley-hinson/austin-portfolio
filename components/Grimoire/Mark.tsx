import React from "react";

// The grimoire's seal: the Adinkra symbol Nea Onnim No Sua A, Ohu
// ("one who does not know can know through learning").
//
// Geometry from "Nea onnim no sua a ohu.svg" by Pablo Busatto, Wikimedia
// Commons, CC BY-SA 4.0:
// https://commons.wikimedia.org/wiki/File:Nea_onnim_no_sua_a_ohu.svg
// Recolored to currentColor. The footer carries the visible credit.
const Mark = ({ className = "w-6 h-6", title }: { className?: string; title?: string }) => {
  return (
    <svg
      viewBox="0 0 390 390"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="30"
      strokeMiterlimit="10"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <g strokeLinecap="square">
        <rect x="15" y="135" width="360" height="120" />
        <path d="M255 15 V375 M135 15 V375 M195 15 V135 M195 255 V375 M75 135 V255 M315 135 V255 M135 195 H255" />
        <path d="M255 15 H375 M135 15 H15 M135 375 H15 M255 375 H375" />
      </g>
      <path d="M255 75 H360 M135 315 H30 M255 315 H360 M30 75 H135" />
    </svg>
  );
};

export default Mark;
