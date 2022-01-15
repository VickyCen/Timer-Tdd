import React from "react";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Timer from "./timer";

afterEach(cleanup);

describe("render correctly", () => {
  it("should render the component", () => {
    let TimerComponent = render(<Timer />);
    expect(TimerComponent).toBeTruthy();
  });

  it("should render start, pause, resume, reset buttons", () => {
    let { getByText } = render(<Timer />);
    expect(getByText("Start")).toBeTruthy();
    expect(getByText("Reset")).toBeTruthy();
  });

  it("should show initial value as 0", () => {
    let { getByText } = render(<Timer />);
    const displayValue = document.getElementById("display-value");
    expect(displayValue.textContent).toBe("0");
  });
});

describe("start function runs correctly", () => {
  it("start is called when clicking 'Start' button", () => {
    let TimerComponent = render(<Timer />);
    const displayValue = document.getElementById("display-value");
    expect(displayValue.textContent).toBe("0");
    act(() => {
      fireEvent.click(screen.getByText("Start"));
    });
    expect(displayValue.textContent).toBe("0");
  });

  it("pause button should show after clicking 'Start' button", async () => {
    let { getByText } = render(<Timer />);
    const displayValue = document.getElementById("display-value");
    jest.useFakeTimers();
    await act(async () => {
      fireEvent.click(screen.getByText("Start"));
    });
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(getByText("Pause")).toBeTruthy();
    expect(displayValue.textContent).toBe("1");
  });

  it("Pause should work", async () => {
    let { getByText } = render(<Timer />);
    const displayValue = document.getElementById("display-value");
    jest.useFakeTimers();
    await act(async () => {
      fireEvent.click(screen.getByText("Start"));
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Pause"));
    });
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(getByText("Start")).toBeTruthy();
    expect(displayValue.textContent).toBe("5");
  });

  it("Reset should work", async () => {
    jest.useFakeTimers();
    let { getByText } = render(<Timer />);
    const displayValue = document.getElementById("display-value");
    await act(async () => {
      // Can't put them together
      fireEvent.click(screen.getByText("Start"));
      jest.advanceTimersByTime(5000);
      fireEvent.click(screen.getByText("Reset"));
      jest.advanceTimersByTime(5000);
    });

    expect(displayValue.textContent).toBe("0");
  });
});
