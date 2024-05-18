"use client";
import React from "react";
import { Search } from "lucide-react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link as NavbarLink,
  Button,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import Logo from "./Logo";
import { Input } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { useAuth } from "@/utils/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "next-usequerystate";
import { useEffect, Suspense } from "react";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { handleGoogleLogin, handleSignIn, fUser, logout } = useAuth();
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Schools",
      link: "/farmers",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <>
      <Navbar
        // isBordered

        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className=" sm:hidden bb"
      >
        <NavbarContent className="sm:hidden " justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          as={Link}
          href="/schools"
          className="sm:hidden "
          justify="end"
        >
          {/* <Button className="bg-transparent" onClick={onOpen}> */}
          <Search className="cursor-pointer  " />
          {/* </Button> */}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavbarLink
                as={Link}
                className="w-full"
                onPress={() => {
                  setIsMenuOpen(false);
                }}
                color={item.link === pathname ? "warning" : "foreground"}
                href={item.link}
                size="lg"
              >
                {item.name}
              </NavbarLink>
            </NavbarMenuItem>
          ))}
          <>
            <NavbarMenuItem>
              <NavbarLink
                // onPress={() => {
                //   handleGoogleLogin();
                //   setIsMenuOpen(false);
                // }}
                as={Link}
                href=""
                color="foreground"
                className="w-full"
                size="lg"
              >
                Login
              </NavbarLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavbarLink
                onPress={() => {
                  // handleSignIn();
                  setIsMenuOpen(false);
                }}
                as={Link}
                href=""
                color="danger"
                className="w-full"
                size="lg"
              >
                Register
              </NavbarLink>
            </NavbarMenuItem>
          </>

          {/* {isAdmin && ( */}
          <NavbarMenuItem>
            <NavbarLink
              as={Link}
              href="/admin"
              color="danger"
              className="w-full"
              size="lg"
            >
              Admin
            </NavbarLink>
          </NavbarMenuItem>
          {/* )} */}
        </NavbarMenu>
      </Navbar>
      <div className="hidden sm:flex py-4 px-8  justify-between items-center">
        <div className="flex items-center gap-1">
          <Logo />
        </div>
        <div className="flex items-center justify-center flex-1 ">
          <Button
            as={Link}
            href="/farmers"
            className="bg-transparent  text-base"
          >
            Farmers
          </Button>

          <Button
            as={Link}
            href="/contact"
            className="bg-transparent text-base"
          >
            Contact Us
          </Button>
        </div>
        <div className="flex gap-1">
          <div className="flex gap-1">
            {!fUser && (
              <Button
                onPress={handleGoogleLogin}
                color="primary"
                variant="bordered"
              >
                Log In
              </Button>
            )}
            {!fUser && (
              <Button onPress={handleSignIn} color="primary">
                Sign In
              </Button>
            )}
            {fUser && (
              <Button as={Link} href="/profile" color="primary">
                Profile
              </Button>
            )}
            {fUser && (
              <Button as={Link} href="/seller" color="primary">
                Sell
              </Button>
            )}
            {fUser && (
              <Button onPress={logout} color="primary">
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
