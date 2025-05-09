"use client";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full mx-auto p-10 flex flex-col items-center">
        <Search />
      </div>
    </div>
  );
};

export default Home;
