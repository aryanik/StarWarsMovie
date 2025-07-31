import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import type { Film } from "../services/filmsApi";
import { formatDate } from "../utils/formatDate";

export type SortKey = "title" | "release_date" | "director" | "episode_id";

interface FilmTableProps {
  films: Film[];
  sortKey: SortKey;
  asc: boolean;
  onRowClick: (film: Film) => void;
  onSort: (key: SortKey) => void;
}

const thBase =
  "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none";

export function FilmTable({
  films,
  sortKey,
  asc,
  onRowClick,
  onSort,
}: FilmTableProps) {
  const columns = [
    { key: "episode_id", label: "Episode" },
    { key: "title", label: "Title" },
    { key: "director", label: "Director" },
    { key: "release_date", label: "Release Date" },
  ];

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    return asc ? (
      <ArrowUpIcon className="w-4 h-4 ml-2" />
    ) : (
      <ArrowDownIcon className="w-4 h-4 ml-2" />
    );
  };


  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key as SortKey)}
                  className={thBase}
                >
                  <div className="flex items-center">
                    {col.label} {getSortIcon(col.key as SortKey)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {films.map((film) => (
              <tr
                key={film.episode_id}
                onClick={() => onRowClick(film)}
                className="hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-800 font-semibold text-sm">
                        {film.episode_id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                    {film.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {film.opening_crawl.replace(/\r?\n/g, " ").substring(0, 80)}
                    ...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{film.director}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(film.release_date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1 group-hover:text-blue-700 transition-colors">
                    View Details <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
