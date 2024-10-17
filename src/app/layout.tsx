import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/base.scss";
import Layout from "@/components/Layout";
import auth from "@/store/slices/auth";
import { useTypedSelector } from "@/hooks/selector.hook";
import { RootState } from "@/store";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Главная | Nordwibe",
  description: "Сайт для сдачи квартир в аренду и поиска соседей",
  keywords: ["dwellings", "flats", "neighbours"],
  robots: {
    follow: true,
    index: true
  }
};

export default ({ children, params }: { children: React.ReactNode, params: any }) => {
  
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};
