import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TopBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    if (!searchTerm) return router.push(`/`);
    router.push(`/?search=${searchTerm}`);
  };

  const handleOnKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      handleClick();
    }
  };

  return (
    <div className="h-28 border-b-4 px-4 py-3 border-secondary flex justify-between">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="tracking-widest text-3xl flex justify-center items-center"
      >
        WOOKIE <br /> MOVIES
      </button>
      <div className="flex gap-2 items-end ">
        <div>
          <div className="flex items-center gap-2 h-full">
            <button
              onClick={handleClick}
              className="relative hover:p-4 w-4 h-4"
            >
              <Image
                style={{ objectFit: "cover" }}
                fill
                src="/assets/search.png"
                alt={"Search Icon"}
              />
            </button>
            <input
              placeholder="Search..."
              className="border-[1px] border-secondary p-3 py-1 w-64"
              onChange={handleChange}
              onKeyDown={handleOnKeyDown}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
