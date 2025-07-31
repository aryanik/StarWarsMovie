import Loader from "../components/Loader";
import Error from "../components/Error";
import BackButton from "../components/BackButton";
import InfoRow from "../components/InfoRow";
import Card from "../components/Card";
import EntitySection from "../components/EntitySection";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../utils/formatDate";
import { useMovieData } from "../hooks/useMovieData";

export default function MovieDetail() {
  const { film, isLoading, isError, details } = useMovieData();

  if (isLoading) return <Loader />;
  if (isError || !film) return <Error message="Could not fetch film details." />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-2">
          <BackButton label="Back to Films" />
        </div>
      </div>

      <div className="px-6 py-5 space-y-6">
        <header className="space-y-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Episode {film.episode_id}
          </span>
          <h1 className="text-4xl font-bold text-gray-900">{film.title}</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Opening Crawl">
              <div className="prose prose-lg max-w-none bg-gray-50 p-2">
                {film.opening_crawl
                  .split("\n")
                  .map((p, i) => (p.trim() ? <p key={i}>{p.trim()}</p> : null))}
              </div>
            </Card>

            <EntitySection title="Characters" items={details.characters} />
            <EntitySection title="Planets" items={details.planets} />
            <EntitySection title="Starships" items={details.starships} />
            <EntitySection title="Vehicles" items={details.vehicles} />
            <EntitySection title="Species" items={details.species} />
          </div>

          <div className="space-y-6">
            <Card title="Film Details">
              <dl className="space-y-4">
                <InfoRow
                  label="Release Date"
                  icon={<CalendarIcon className="w-5 h-5" />}
                  value={formatDate(film.release_date)}
                />
                <InfoRow
                  label="Director"
                  icon={<UserIcon className="w-5 h-5" />}
                  value={film.director}
                />
                <InfoRow
                  label="Producer"
                  icon={<UserIcon className="w-5 h-5" />}
                  value={film.producer}
                />
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
