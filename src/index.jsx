import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/config/configStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalFont from "./styles/GlobalFont";

const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <React.StrictMode>
          <GlobalStyle />
          <GlobalFont />
          <Header />
          <App />
          <Footer />
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
