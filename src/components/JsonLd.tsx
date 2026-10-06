/** Server-rendered structured data. `<` is escaped so content can never break out of the script tag. */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
