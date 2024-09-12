import Link, {LinkProps} from "next/link";
import {FaBug} from "react-icons/fa";

export default function NavBar() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({label, href}) => {
          return (
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors duration-300"
              key={href}
              href={href}
            >
              {label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
