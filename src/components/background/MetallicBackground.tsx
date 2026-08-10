"use client";

/**
 * Fundo metalizado — mesma paleta, com movimento contínuo.
 */
export function MetallicBackground() {
  return (
    <div className="metal-bg" aria-hidden="true">
      <div className="metal-bg__base" />
      <div className="metal-bg__orb metal-bg__orb--1" />
      <div className="metal-bg__orb metal-bg__orb--2" />
      <div className="metal-bg__orb metal-bg__orb--3" />
      <div className="metal-bg__sweep" />
      <div className="metal-bg__sparkle" />
      <div className="metal-bg__vignette" />
    </div>
  );
}
