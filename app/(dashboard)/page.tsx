import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormButton";

export default function Home() {
  return (
    <div className="container p-4 ">

      <Separator className="my-6" />

      <h2 className="text-4xl font-bold col-span-2 ml-5">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <CreateFormBtn />
      </div>
    </div>
  );
}
