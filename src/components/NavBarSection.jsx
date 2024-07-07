import React from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { RectangleStackIcon, CommandLineIcon } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavItem({ children }) {
  return (
    <li>
      <Typography
        as="a"
        variant="paragraph"
        color="blue-gray"
        className="text-blue-gray-700 flex items-center gap-2 font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}

function NavBarSection({ feature, setfeature }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <Navbar shadow={false} fullWidth className="fixed top-0 left-0 right-0 z-50 border-0 ">
      <div className="container mx-auto flex items-center justify-between">
        <Typography color="blue-gray" className="text-lg font-bold">
          Fire Detection System
        </Typography>
        <ul className="ml-10 hidden items-center gap-6 lg:flex">
          <NavItem>
            <Button
              variant="text"
              className="flex align-middle justify-between gap-2"
              onClick={() => {
                console.log("hello");
                setfeature(true);
              }}
            >
              <CommandLineIcon className="h-4 w-5" />
              Documentation
            </Button>
          </NavItem>
          <NavItem href="/">
            <Button
              onClick={() => {
                console.log("hello");
                setfeature(true);
              }}
              className="flex align-middle justify-between gap-2"
            >
              <RectangleStackIcon className="h-4 w-5" />
              Simulator
            </Button>
          </NavItem>
        </ul>
        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            <NavItem>
              <Button
                onClick={() => {
                  console.log("hello");
                  setfeature(true);
                }}
                className="flex align-middle justify-between gap-2"
              >
                <RectangleStackIcon className="h-4 w-5" />
                Simulator
              </Button>
            </NavItem>
            <NavItem>
              <CommandLineIcon className="h-5 w-5" />
              Documentation
            </NavItem>
          </ul>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavBarSection;
