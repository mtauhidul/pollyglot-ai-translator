import Image from "next/image";
import navImage from "../../public/nav_bg.png";

export function Navbar() {
  return (
    <nav className="lg:mb-1 mb-1 py-5">
      <div className="flex justify-center">
        <Image className="w-full" src={navImage} alt="PollyGlot" />
      </div>
    </nav>
  );
}
