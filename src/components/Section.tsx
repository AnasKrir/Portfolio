export default function Section({ id, title, subtitle, children }:{
  id: string; title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="container-l py-14 md:py-20">
      <h2 className="h1-grad">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
