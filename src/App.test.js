import { render, screen } from "@testing-library/react";
import App from "./App";
import selectionReducer, { initialState } from "./features/selectionReducer";
import { StateProvider } from "./components/StateProvider";

describe("App", () => {
  it("should render the App component", () => {
    render(
      <StateProvider initialState={initialState} reducer={selectionReducer}>
        <App />
      </StateProvider>
    );
    expect(screen.getByRole("heading")).toHaveTextContent(/movie ranking/i);
  });
});
