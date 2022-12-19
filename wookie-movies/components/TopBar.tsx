import Image from "next/image";

export default function TopBar() {
  return (
    <div className="h-24 border-b-4 px-4 py-3 border-secondary flex justify-between">
      <div className="tracking-widest text-3xl flex justify-center items-center ">
        WOOKIE <br /> MOVIES
      </div>
      <div className="flex gap-2 items-end ">
        <div className="relative w-6 h-6">
          <Image
            style={{ objectFit: "cover" }}
            fill
            src="/assets/search.png"
            alt={"Search Icon"}
          />
        </div>

        <input
          placeholder="Search..."
          className="border-2 border-secondary pl-1 h-7"
        ></input>
      </div>
    </div>
  );
}
