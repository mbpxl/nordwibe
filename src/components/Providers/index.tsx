import { useTypedSelector } from "@/hooks/selector.hook";
import { store } from "@/store";
import { Provider } from "react-redux";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

