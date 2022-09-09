import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getQuote } from "../redux/quotes/quotesSlice";

import {
  Increase,
  Decrease,
  Wrapper,
  Ticker,
  List,
  WrapperInfo,
  ListItem,
} from "./Quote.styled";

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

  const arrowUp = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      focusable="false"
      fill="#3ba520"
    >
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
    </svg>
  );
  const arrowDown = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      focusable="false"
      fill="#cd351a"
    >
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
    </svg>
  );

  return (
    <div>
      <List>
        {stateQuotes.map((quote) => (
          <ListItem key={quote.ticker}>
            {quote.change >= 0 && true ? (
              <Wrapper>
                {arrowUp}
                <WrapperInfo>
                  <Ticker>{quote.ticker}</Ticker>
                  <Increase>{quote.price}</Increase>
                </WrapperInfo>
                <WrapperInfo>
                  <div>{`${quote.change} pts`}</div>
                  <div>{`${quote.change_percent} %`}</div>
                </WrapperInfo>
              </Wrapper>
            ) : (
              <Wrapper>
                {arrowDown}
                <WrapperInfo>
                  <Ticker>{quote.ticker}</Ticker>
                  <Decrease>{quote.price}</Decrease>
                </WrapperInfo>
                <WrapperInfo>
                  <div>{`${quote.change} pts`}</div>
                  <div>{`${quote.change_percent} %`}</div>
                </WrapperInfo>
              </Wrapper>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
