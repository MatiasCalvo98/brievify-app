"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";

const userButtonAppearance = {
  elements: {
    avatarBox: "size-8",
    userButtonPopoverCard: "bg-surface border border-border shadow-none",
    userButtonPopoverActionButton: "text-text hover:bg-surface-2",
    userButtonPopoverActionButtonText: "text-text text-sm",
    userButtonPopoverFooter: "hidden",
  },
};

export function NavbarAuthSection() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="h-8 w-32 rounded-lg bg-surface-2 animate-pulse" />;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button size="sm" variant="secondary">Ir al builder</Button>
        </Link>
        <UserButton appearance={userButtonAppearance} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/sign-in"
        className="hidden cursor-pointer font-heading text-sm font-semibold text-text-2 transition-colors hover:text-text sm:block"
      >
        Iniciar sesión
      </Link>
      <Link href="/sign-up">
        <Button size="sm">Empezar gratis</Button>
      </Link>
    </div>
  );
}
