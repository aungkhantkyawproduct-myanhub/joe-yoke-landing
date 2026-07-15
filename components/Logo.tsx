import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Joe Yoke home"
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl">
        <Image
          src="/logo-mark.png"
          alt="Joe Yoke logo"
          width={36}
          height={36}
          priority
          className="h-full w-full object-cover"
        />
      </span>
      <span className="font-heading text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
        Joe Yoke
      </span>
    </Link>
  );
}
