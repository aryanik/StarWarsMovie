StarWars Movie App – High- & Low-Level Design

Name : Ravi Kumar

1 Introduction
This document describes the architecture of the StarWars Movie App built
with React, TypeScript, Redux Toolkit, RTK Query, and React Router v6.
It covers both high-level (component & layer) and low-level (class / slice)
designs, including UML diagrams.

2 Technology Stack and Motivation
• React 18 + TypeScript - modern hooks/API and compile-time type safety to catch errors early.
• Redux Toolkit `configureStore`
    – RTK Query (`createApi`) for **server state** - Provides declarative data fetching, caching, and
built-in loading/error handling.
    – Classic slices (`createSlice`) for **UI state** - Keeps local UI concerns (like sort order)
isolated
• React Router v6 (`createBrowserRouter`) - Simplifies route definitions, nested layouts, and 404
handling
• `React-error-boundary` for runtime error capture - Catches uncaught render errors and presents a
user-friendly fallback UI.
• Tailwind CSS & Heroicons for styling - Utility-first styling for rapid, consistent layouts;
Heroicons for clean, scalable SVG icons.


3 High-Level Component Diagram

<img width="2305" height="1042" alt="high Level design" src="https://github.com/user-attachments/assets/5e22af52-e478-422b-8624-6f31c66bf65d" />

4 High-Level Data & Control Flow

1. **Home page loads** `Home` calls `useGetFilmsQuery()` → RTK Query requests `/films`
→ response cached in Redux → selectors provide data to `Home`.
2. **User toggles sort** `FilmTable` triggers `Clicking a column header in FilmTable invokes
dispatch(toggleSort(newKey))`→ sortSlice updates sortKey and asc → selectSortedFilms
selector recomputes the list; Home re-renders the table.
3. **Row click** `Home` navigates to `/movie/:id` using `useNavigate`.
4. **MovieDetail** `useMovieData` custom hook runs multiple queries (film, characters,
planets, ...) → data displayed in detail cards.
5. **Failures / exceptions** Network error → `isError` flag shows `<Error>` component.
Runtime error → `ErrorBoundary` renders `ErrorPage`.

5 Low-Level Class / Slice Class diagram

<img width="1106" height="482" alt="low level" src="https://github.com/user-attachments/assets/84c6c7db-216e-4c89-8a5d-f4b3dcc5546a" />

6. Sequence Diagram (Home Page)
   
<img width="712" height="433" alt="Screenshot 2025-07-31 at 9 44 05 PM" src="https://github.com/user-attachments/assets/0ced8a21-9ff9-4896-ab22-6fb075a1ee1c" />

7. Sequence Diagram (Movie Detail Page)

<img width="1033" height="705" alt="Movie Detail Sequence Diagram" src="https://github.com/user-attachments/assets/835953fc-5f45-41f9-9c20-b9859fa318ac" />

8. Responsibilities Matrix

<img width="665" height="299" alt="Matrix" src="https://github.com/user-attachments/assets/550f9495-3260-4991-b124-171b1379a716" />

9. Error Handling Strategy
1. **Compile-time** – TypeScript eliminates many type errors.
2. **Runtime (render/lifecycle)** – `ErrorBoundary` wraps the app.
3. **Network** – RTK Query exposes `isError`, `error`; views render the `<Error>`
component with retry links if desired.
4. **404** – Catch-all `path="*"` route shows `<NotFound>`.
5. Loading States - While RTK Query is pending, components display a <Loader> spinner to
indicate progress.


10. Manual Testing -
API Failures: Simulate network errors → <Error> displays with retry option
Invalid Film ID: /movie/9999 → Error screen shown, no crash
Empty Data: SWAPI returns [] → Section hides or shows “No data available”
Slow Network: Throttled connection → <Loader> appears until data loads
Unknown Route: /random-path → <NotFound> page rendered
Rapid Navigation: Click Back mid-fetch → Returns to list without errors




