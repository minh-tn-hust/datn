import '@/styles/globals.css'
import NavBar from "@/shared/navbar";
import {wrapper} from "@/reducers/store";
function App({ Component, pageProps }) {
  return (
      <div>
          <NavBar/>
          <Component {...pageProps} />
      </div>
  )
};

export default wrapper.withRedux(App);
