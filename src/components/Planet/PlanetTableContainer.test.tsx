import { vi, describe, it, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlanetTableContainer from "./PlanetTableContainer";
import { usePlanets } from "../../hooks/usePlanets";
import type { UseQueryResult } from "@tanstack/react-query";
import { EntityDialogProvider } from "../../context/EntityDialogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type PlanetRow = { name: string; population: string; url: string };
type PlanetsListApi = { count: number; results: PlanetRow[] };

function fullResult<T>(
  patch: Partial<UseQueryResult<T, Error>>
): UseQueryResult<T, Error> {
  return {
    data: undefined as unknown as T,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isFetching: false,
    status: "success",
    fetchStatus: "idle",
    refetch: vi.fn() as any,
    ...patch,
  } as unknown as UseQueryResult<T, Error>;
}

export const loading = <T,>() =>
  fullResult<T>({
    isLoading: true,
    status: "pending",
    fetchStatus: "fetching",
  });

export const errored = <T,>(msg = "Failed") =>
  fullResult<T>({
    isError: true,
    error: new Error(msg),
    status: "error",
    fetchStatus: "idle",
  });

export const success = <T,>(data: T) =>
  fullResult<T>({
    data,
    isSuccess: true,
    isFetching: false,
    status: "success",
    fetchStatus: "idle",
  });

vi.mock("../../hooks/usePlanets", () => ({
  usePlanets: vi.fn(),
}));

const mockUsePlanets = vi.mocked(usePlanets);

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <EntityDialogProvider>{ui}</EntityDialogProvider>
    </QueryClientProvider>
  );
}

describe("<PlanetTableContainer />", () => {
  const setCountMock = vi.fn();
  const defaultProps = { page: 1, search: "", setCount: setCountMock };

  const fakeData: PlanetsListApi = {
    count: 2,
    results: [
      { name: "Tatooine", population: "200000", url: "1" },
      { name: "Alderaan", population: "2000000000", url: "2" },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
    setCountMock.mockReset();
  });

  it("shows loading state", () => {
    mockUsePlanets.mockReturnValue(loading<PlanetsListApi>());

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    expect(screen.getByText(/loading planets/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUsePlanets.mockReturnValue(errored<PlanetsListApi>());

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    expect(screen.getByText(/error loading planets/i)).toBeInTheDocument();
  });

  it("renders planet rows sorted ascending by default", () => {
    mockUsePlanets.mockReturnValue(success<PlanetsListApi>(fakeData));

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    const rows = screen.getAllByTestId("planet-row");
    expect(rows.length).toBe(2);
    expect(rows[0]).toHaveTextContent("Alderaan");
    expect(rows[1]).toHaveTextContent("Tatooine");
  });

  it("calls setCount with correct count", () => {
    mockUsePlanets.mockReturnValue(success<PlanetsListApi>(fakeData));

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    expect(setCountMock).toHaveBeenCalledWith(2);
  });

  it("toggles sort order when sort header is clicked", () => {
    mockUsePlanets.mockReturnValue(success<PlanetsListApi>(fakeData));

    renderWithProviders(<PlanetTableContainer {...defaultProps} />);
    let rows = screen.getAllByTestId("planet-row");
    expect(rows[0]).toHaveTextContent("Alderaan");

    fireEvent.click(screen.getByRole("button", { name: /name/i }));
    rows = screen.getAllByTestId("planet-row");
    expect(rows[0]).toHaveTextContent("Tatooine");
  });
});
