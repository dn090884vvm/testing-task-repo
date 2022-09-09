// import logo from "./logo.svg";
import "./App.css";
import Quotes from "./components/Quote";
import { GlobalStyle } from "./GlobalStyle/GlobalStyle";
import { SectionWrapper } from "./components/App.styled";

function App() {
  return (
    <SectionWrapper>
      <div className="App">
        <GlobalStyle />
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <Quotes />
      </div>
    </SectionWrapper>
  );
}

export default App;
