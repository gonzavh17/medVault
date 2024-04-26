import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Component() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand  href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link href="#" active>
          Home
        </Link>
        <Link href="#">
          About
        </Link>
        <Link href="#">Services</Link>
        <Link href="#">Pricing</Link>
        <Link href="#">Contact</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}