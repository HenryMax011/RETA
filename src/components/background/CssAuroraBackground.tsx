export function CssAuroraBackground({ withStars = true }: { withStars?: boolean }) {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-bg__orb aurora-bg__orb--1" />
      <div className="aurora-bg__orb aurora-bg__orb--2" />
      <div className="aurora-bg__orb aurora-bg__orb--3" />
      <div className="aurora-bg__ribbon aurora-bg__ribbon--1" />
      <div className="aurora-bg__ribbon aurora-bg__ribbon--2" />
      <div className="aurora-bg__ribbon aurora-bg__ribbon--3" />
      {withStars && <div className="aurora-bg__stars" />}
      <div className="aurora-bg__vignette" />
    </div>
  );
}
