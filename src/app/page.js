import AllCard from "./components/AllCard";
import Banner from "./components/Banner";
import Summary from "./components/Summary";
const getFriends = async () => {
  const res = await fetch("http://localhost:3000/data.json", {
    cache: "no-store",
  });
  return res.json();
};

const page = async () => {
  const friends = await getFriends();
  return (
    <main>
      <Banner></Banner>
      <Summary></Summary>

      <div>
        <AllCard friends={friends} />
      </div>
    </main>
  );
};

export default page;
