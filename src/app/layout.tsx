import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/base.scss";
import Layout from "@/components/Layout";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Главная | Nordwibe",
  description: "Сайт для сдачи квартир в аренду и поиска соседей",
  keywords: ["dwellings", "flats", "neighbours"],
  robots: {
    follow: true,
    index: true,
  },
};

const MyComponent = ({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default MyComponent;
