import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
	Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";

import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchIdeas } from "@/api/ideas";
import FullPageSkeleton from "@/components/FullPageSkeleton";

type RouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{
				name: "description",
				content:
					"Share, explore and build on the best startup ideas and side hustles",
			},
			{
				title: "IdeaDrop - Your Idea Hub",
			},
		],
	}),
	component: RootLayout,
	notFoundComponent: NotFound,
});

<FullPageSkeleton />;

function RootLayout() {
	const queryClient = useQueryClient();
	const isFetching = useIsFetching();

	const queryKey = ["ideas", { limit: 3 }];
	const cachedIdeas = queryClient.getQueryData(queryKey);
	const ideasState = queryClient.getQueryState(queryKey);

	const DATA_AGE_MS = 30_000; // 30s threshold
	const dataUpdatedAt = ideasState?.dataUpdatedAt ?? 0;
	const isDataStale = Date.now() - dataUpdatedAt > DATA_AGE_MS;

	const isFetchingIdeas =
		ideasState?.fetchStatus === "fetching" || isFetching > 0;

	// Prefetch on mount only if there's no cached data and it's not already fetching.
	useEffect(() => {
		if (!cachedIdeas && ideasState?.fetchStatus !== "fetching") {
			void queryClient.ensureQueryData({
				queryKey,
				queryFn: () => fetchIdeas(3),
			});
		}
	}, [queryClient, cachedIdeas, ideasState?.fetchStatus]);

	if (
		(!cachedIdeas && isFetchingIdeas) ||
		(cachedIdeas && isDataStale && isFetchingIdeas)
	) {
		return <FullPageSkeleton />;
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<HeadContent />
			<Header />
			<main className="flex justify-center p-6">
				<div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
					<Outlet />
				</div>
			</main>
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</div>
	);
}

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center text-center py-20">
			<h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
			<p className="text-lg text-gray-600 mb-6">
				Ooops! The page you are looking for does not exist
			</p>
			<Link
				to="/"
				className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
				Go Back Home
			</Link>
		</div>
	);
}
