import Breadcrumbs from "@/ui/breadcrumbs";
import Navigation from "@/ui/navigation";

export default function Header() {
  return (
    <header>
      <div className="px-4 pb-4 font-poppins text-2xl font-semibold text-green-700">
        <span className="flex h-full w-full items-center justify-start">
          entrada
        </span>
      </div>
      <div className="shadow-lg">
        <Navigation>
          <Breadcrumbs />
        </Navigation>
        <div className="h-2.5 rounded-b-sm bg-green-700"></div>
      </div>
    </header>
  );
}
