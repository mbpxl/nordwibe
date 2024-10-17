import Home from "@/page/Home";
import dynamic from "next/dynamic";

const HomePageNoSSR = dynamic(() => import("@/page/Home"), { ssr: false });

const HomePage = () => <HomePageNoSSR />;

export default HomePage;
