import '@/styles/global.css';
import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import store from "@/redux/store";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </ThemeProvider>
  );
}
export default App;
