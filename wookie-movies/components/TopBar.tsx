import Image from "next/image";
import { useState } from "react";

type TopBarProps = {
  setSearchTerm: any;
};

export default function TopBar(props: TopBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    props.setSearchTerm(searchTerm);
  };

  const handleKeyDown = (e: any) => {
    //Enter key
    if (e.keyCode == 13) {
      props.setSearchTerm(searchTerm);
    }
  };

  return (
    <div className="h-24 border-b-4 px-4 py-3 border-secondary flex justify-between">
      <div className="tracking-widest text-3xl flex justify-center items-center ">
        WOOKIE <br /> MOVIES
      </div>
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
              onKeyDown={handleKeyDown}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
