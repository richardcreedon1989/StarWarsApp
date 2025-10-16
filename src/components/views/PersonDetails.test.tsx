import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import PersonDetails from "./PersonDetails";
import { Mock } from "vitest";
import { useResident } from "../../hooks/useResidents";
import { useResidentsFilms } from "../../hooks/useResidentsFilms";
import { useStarshipsMany } from "../../hooks/useStarships";
import { usePlanets } from "../../hooks/usePlanets";

vi.mock("../../hooks/useResidents", () => ({
  useResident: vi.fn(),
}));
vi.mock("../../hooks/useResidentsFilms", () => ({
  useResidentsFilms: vi.fn(),
}));
vi.mock("../../hooks/useStarships", () => ({
  useStarshipsMany: vi.fn(),
}));
vi.mock("../../hooks/usePlanets", () => ({
  usePlanets: vi.fn(),
}));

const mockUseResident = useResident as Mock;
const mockUseResidentsFilms = useResidentsFilms as Mock;
const mockUseStarshipsMany = useStarshipsMany as Mock;
const mockUsePlanets = usePlanets as Mock;

describe("<PersonDetails />", () => {
  const url = "https://swapi.dev/api/people/1/";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading state", () => {
    mockUseResident.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    mockUseResidentsFilms.mockReturnValue({
      titles: [],
      isLoading: true,
      isError: false,
    });
    mockUseStarshipsMany.mockReturnValue([]);
    mockUsePlanets.mockReturnValue({ data: undefined });

    render(<PersonDetails url={url} />);
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUseResident.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    mockUseResidentsFilms.mockReturnValue({
      titles: [],
      isLoading: false,
      isError: true,
    });
    mockUseStarshipsMany.mockReturnValue([]);
    mockUsePlanets.mockReturnValue({ data: undefined });

    render(<PersonDetails url={url} />);
    expect(screen.getByText(/Failed to load\./i)).toBeInTheDocument();
  });

  it("handles useResidentsFilms error gracefully", () => {
    mockUseResident.mockReturnValue({
      data: {
        name: "Obi-Wan Kenobi",
        homeworld: "https://swapi.dev/api/planets/20/",
        starships: [],
        films: ["https://swapi.dev/api/films/1/"],
      },
      isLoading: false,
      isError: false,
    });

    mockUseResidentsFilms.mockReturnValue({
      titles: [],
      isError: true,
      isLoading: false,
    });

    mockUseStarshipsMany.mockReturnValue([]);
    mockUsePlanets.mockReturnValue({
      data: { name: "Stewjon" },
    });

    render(<PersonDetails url={url} />);
    expect(screen.getByText(/obi-wan kenobi/i)).toBeInTheDocument();
    expect(screen.getByText(/films:/i).closest("p")).toHaveTextContent("None");
  });

  it("renders person details (name, homeworld, films, starships)", () => {
    mockUseResident.mockReturnValue({
      data: {
        name: "Luke Skywalker",
        homeworld: "https://swapi.dev/api/planets/1/",
        starships: [
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/22/",
        ],
        films: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
        ],
      },
      isLoading: false,
      isError: false,
    });

    mockUseResidentsFilms.mockReturnValue({
      titles: ["A New Hope", "The Empire Strikes Back"],
      isLoading: false,
      isError: false,
    });

    mockUseStarshipsMany.mockReturnValue([
      {
        data: { name: "X-wing", url: "https://swapi.dev/api/starships/12/" },
        isError: false,
      },
      {
        data: {
          name: "Imperial shuttle",
          url: "https://swapi.dev/api/starships/22/",
        },
        isError: false,
      },
    ]);

    mockUsePlanets.mockReturnValue({
      data: { name: "Tatooine", url: "https://swapi.dev/api/planets/1/" },
    });

    render(<PersonDetails url={url} />);
    expect(
      screen.getByText(/name:/i, { selector: "strong" })
    ).toBeInTheDocument();
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(
      screen.getByText(/homeworld:/i, { selector: "strong" })
    ).toBeInTheDocument();
    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
    expect(
      screen.getByText(/films:/i, { selector: "strong" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a new hope, the empire strikes back/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/starships:/i, { selector: "strong" })
    ).toBeInTheDocument();
    expect(screen.getByText(/x-wing, imperial shuttle/i)).toBeInTheDocument();
  });
});
