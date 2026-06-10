import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const columns = [
  {
    title: "Producto",
    links: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Features", href: "#features" },
      { label: "Precios", href: "#pricing" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Soporte", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos", href: "#" },
      { label: "Privacidad", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-text-2">
            El builder de e-commerce por chat para tiendas Shopify en LATAM.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {column.title}
            </p>
            <ul className="mt-5 flex flex-col gap-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-2 transition-colors hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6">
        <p className="text-center text-xs text-muted">
          © {new Date().getFullYear()} Brievify — Brief it. Build it. Sell it.
        </p>
      </div>
    </footer>
  );
}
