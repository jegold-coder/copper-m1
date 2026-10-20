import Image from "next/image";

export function SiteFooter() {
  return (
    <footer data-testid="site-footer" className="bg-[#1c2333] text-[#efe3d0]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <Image
          src="/brand/logo-dark.png"
          alt="Copper State Labs"
          width={1200}
          height={197}
          className="h-auto w-48"
        />
        <p className="text-sm">Fictional — for educational use.</p>
      </div>
    </footer>
  );
}
