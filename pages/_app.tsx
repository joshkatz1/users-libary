import "@/styles/globals.css";
import { setupStore } from "../redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const store = setupStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
