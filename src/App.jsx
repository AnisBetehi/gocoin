import { ThemeProvider } from "styled-components";
import Header from "./Components/Header/Header";
import GlobalStyles from "./Styles/globalStyles";
import theme from "./Styles/theme";
import DataContextProvider from "./context/dataContext";
import {Routes, Route} from 'react-router-dom';
import CoinsTable from "./Components/CoinsTable/CoinsTable";
import CoinDetail from "./Components/CoinDetail/CoinDetail";
import GlobalStats from "./Components/GlobalStats/GlobalStats";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <DataContextProvider>
          <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/' element={
                <>
                  <GlobalStats />
                  <CoinsTable />
                </>} />
                <Route path="*" element={<Navigate to="/" />} />  
                <Route path='/coins/:id' element={<CoinDetail />} />
            </Routes>
        </DataContextProvider>
      </ThemeProvider>
  );
}

export default App;
