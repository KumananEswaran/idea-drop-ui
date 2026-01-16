import Skeleton from "react-loading-skeleton";

export default function FullPageSkeleton() {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<div className="bg-white border-b">
				<div className="max-w-7xl mx-auto px-6">
					<div className="h-16 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Skeleton
								circle
								height={36}
								width={36}
								baseColor="#f3f4f6"
								highlightColor="#ececec"
							/>
							<div className="flex flex-col">
								<Skeleton width={120} height={14} />
								<Skeleton width={80} height={10} />
							</div>
						</div>

						<div className="flex-1 flex justify-center">
							<Skeleton width={64} height={14} />
						</div>

						<div className="flex items-center gap-4">
							<Skeleton width={64} height={34} />
						</div>
					</div>
				</div>
			</div>

			<main className="flex justify-center p-6">
				<div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
					<div className="md:flex md:items-start md:gap-8">
						<div className="md:w-1/2 mb-6 md:mb-0">
							<div className="mb-6">
								<Skeleton width={56} height={56} />
							</div>
							<div className="mb-4">
								<Skeleton width="80%" height={36} />
							</div>
							<div className="space-y-2">
								<Skeleton width="70%" height={12} />
								<Skeleton width="60%" height={12} />
								<Skeleton width="50%" height={12} />
							</div>
						</div>

						<div className="md:w-1/2 space-y-6">
							{[0, 1, 2].map((i) => (
								<div
									key={i}
									className="border rounded-md p-4 bg-white shadow-sm">
									<Skeleton width="65%" height={16} />
									<div className="mt-3">
										<Skeleton count={2} />
									</div>
								</div>
							))}

							<div className="mt-6 flex justify-center">
								<Skeleton width={200} height={44} />
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
