import Home from "@/page/Home";
import dynamic from "next/dynamic";
import { memo } from "react";

const HomePageNoSSR = dynamic(() => import("@/page/Home"), { ssr: false });

const HomePage = () => <HomePageNoSSR />;

export default memo(HomePage);
