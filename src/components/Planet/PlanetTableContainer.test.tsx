import { vi, describe, it, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlanetTableContainer from "./PlanetTableContainer";
import { usePlanets } from "../../hooks/usePlanets";
import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryObserverResult } from "@tanstack/react-query";
import { EntityDialogProvider } from "../../context/EntityDialogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the hook
vi.mock("../../hooks/usePlanets", () => ({
  usePlanets: vi.fn(),
}));

const mockUsePlanets = vi.mocked(usePlanets);

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <EntityDialogProvider>{ui}</EntityDialogProvider>
    </QueryClientProvider>
  );
}

export function createLoadingResult<T>(): QueryObserverResult<T, Error> {
  return {
    data: undefined,
    error: null,
    isLoading: true,
    isError: false,
    isSuccess: false,
    isFetching: true,
    refetch: vi.fn(),
    failureCount: 0,
    isRefetching: false,
    status: "pending",
    fetchStatus: "fetching",
    isPlaceholderData: false,
    isPaused: false,
  } as unknown as QueryObserverResult<T, Error>;
}

export function createErrorResult<T>(
  message = "Failed"
): QueryObserverResult<T, Error> {
  return {
    data: undefined,
    error: new Error(message),
    isLoading: false,
    isError: true,
    isSuccess: false,
    isFetching: false,
    refetch: vi.fn(),
    failureCount: 1,
    isRefetching: false,
    status: "error",
    fetchStatus: "idle",
    isPlaceholderData: false,
    isPaused: false,
  } as unknown as QueryObserverResult<T, Error>;
}

export function createSuccessResult<T>(data: T): QueryObserverResult<T, Error> {
  return {
    data,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: true,
    isFetching: false,
    refetch: vi.fn(),
    failureCount: 0,
    isRefetching: false,
    status: "success",
    fetchStatus: "idle",
    isPlaceholderData: false,
    isPaused: false,
  } as unknown as QueryObserverResult<T, Error>;
}

// vi.mock("./PlanetTableRow", () => ({
//   default: ({ planet }: any) => (
//     <tr data-testid="planet-row">
//       <td />
//       <td>{planet.name}</td>
//       <td>{planet.population}</td>
//     </tr>
//   ),
// }));

describe("<PlanetTableContainer />", () => {
  const setCountMock = vi.fn();
  const defaultProps = {
    page: 1,
    search: "",
    setCount: setCountMock,
  };

  const fakeData = {
    count: 2,
    results: [
      { name: "Tatooine", population: "200000", url: "1" },
      { name: "Alderaan", population: "2000000000", url: "2" },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading state", () => {
    mockUsePlanets.mockReturnValue(createLoadingResult());

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    expect(screen.getByText(/loading planets/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUsePlanets.mockReturnValue(createErrorResult());

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    expect(screen.getByText(/error loading planets/i)).toBeInTheDocument();
  });

  it("renders planet rows sorted ascending by default", () => {
    mockUsePlanets.mockReturnValue(createSuccessResult(fakeData));

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    const rows = screen.getAllByTestId("planet-row");
    expect(rows.length).toBe(2);
    expect(rows[0]).toHaveTextContent("Alderaan");
    expect(rows[1]).toHaveTextContent("Tatooine");
  });

  it("calls setCount with correct count", () => {
    mockUsePlanets.mockReturnValue(createSuccessResult(fakeData));

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    expect(setCountMock).toHaveBeenCalledWith(2);
  });

  it("toggles sort order when sort header is clicked", () => {
    mockUsePlanets.mockReturnValue(createSuccessResult(fakeData));

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    let rows = screen.getAllByTestId("planet-row");
    expect(rows[0]).toHaveTextContent("Alderaan");

    fireEvent.click(screen.getByRole("button", { name: /name/i }));
    rows = screen.getAllByTestId("planet-row");
    expect(rows[0]).toHaveTextContent("Tatooine");
  });
});
