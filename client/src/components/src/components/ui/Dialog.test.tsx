import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("should not render when isOpen is false", () => {
    render(
      <Dialog isOpen={false} onClose={() => {}} title="Test Title">
        <p>Dialog content</p>
      </Dialog>
    );

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Title">
        <p>Dialog content</p>
      </Dialog>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();

    render(
      <Dialog isOpen={true} onClose={onCloseMock} title="Test">
        <p>Content</p>
      </Dialog>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});

