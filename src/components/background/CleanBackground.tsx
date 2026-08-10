"use client";

/** Fundo Apple-like — branco/cinza claro com degradê azul suave */
export function CleanBackground() {
  return (
    <div className="clean-bg" aria-hidden="true">
      <div className="clean-bg__base" />
      <div className="clean-bg__glow" />
    </div>
  );
}
