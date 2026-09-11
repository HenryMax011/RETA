import Image from "next/image";

export type SiteMarkShape = "circle" | "hexagon" | "diamond";

export interface SiteProject {
  name: string;
  image?: string;
  slogan?: string;
  tone?: "vela" | "selavie" | "phoenix" | "nexo" | "tavora";
  mark?: SiteMarkShape;
  letter?: string;
}

/** Tablet 16:10. Receita isolada: copie e troque `project`. */
export function SiteDevice({
  project,
  priority = false,
  className = "",
}: {
  project: SiteProject;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={`fan-card ${className}`.trim()}>
      <SiteScreen project={project} priority={priority} />
    </article>
  );
}

export function SiteScreen({
  project,
  priority = false,
}: {
  project: SiteProject;
  priority?: boolean;
}) {
  const letter = project.letter ?? project.name.trim().charAt(0);
  const tone = project.tone ?? "vela";
  const mark = project.mark ?? "circle";

  return (
    <div className={`site-preview ${tone}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 540px) 72vw, 540px"
          quality={75}
          className="object-contain object-center"
          draggable={false}
          priority={priority}
        />
      ) : (
        <>
          <div className="site-chrome">
            <b>{project.name}</b>
            <div className="site-chrome-links">
              <i />
              <i />
              <i />
            </div>
            <em>VER SITE ↗</em>
          </div>
          <div className="site-hero">
            <div className={`site-mark ${mark}`}>
              <span>{letter}</span>
            </div>
            <strong>{project.name}</strong>
            {project.slogan ? <span>{project.slogan}</span> : null}
          </div>
        </>
      )}
    </div>
  );
}
