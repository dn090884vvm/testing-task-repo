import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getQuote } from "../redux/quotes/quotesSlice";
import s from "../components/Quote.css";
import { Increase, Decrease, Wrapper, Ticker, Stock } from "./Quote.styled";

export default function Quotes() {
  const dispatch = useDispatch();

  const stateQuotes = useSelector((state) => state.quotes.quotes);

  useEffect(() => {
    const socket = io("http://localhost:4000/");
    socket.on("connect", () => {
      console.log(socket.connected);
      socket.emit("start");
    });

    socket.on("ticker", function (quotes) {
      dispatch(getQuote(quotes));
    });
  }, [dispatch]);

  return (
    <div>
      <ul>
        {stateQuotes.map((quote) => (
          <li
            key={quote.ticker}
            className={`${
              quote.change >= 0 && true ? "s.increase" : "s.decrease"
            }`}
          >
            {quote.change >= 0 && true ? (
              <Wrapper>
                <Ticker>{quote.ticker}</Ticker>
                <Stock>{quote.exchange}</Stock>
                <Increase>{quote.price}</Increase>
              </Wrapper>
            ) : (
              <Wrapper>
                <Ticker>{quote.ticker}</Ticker>
                <Stock>{quote.exchange}</Stock>
                <Decrease>{quote.price}</Decrease>
              </Wrapper>
            )}
            {/* {`Bonds -${quote.ticker} BondsMarket- ${quote.exchange} Price- ${quote.price} changeIs(${quote.change})`} */}
          </li>
        ))}
      </ul>
    </div>
  );
}
