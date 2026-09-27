/**
 * Skeleton Shimmer — pure CSS (see .skeleton in index.css).
 *
 * A 200%-wide gradient (dark-light-dark) sweeps left-to-right on a linear
 * loop. Because the gradient is double-width and the sweep is exactly
 * 200% → -200%, the loop is seamless: the light band exits right just as
 * the next one enters left.
 */
export function SkeletonShimmer() {
  return (
    <div className="w-full max-w-[240px] p-4">
      <div className="rounded-xl border border-line bg-panel p-4">
        <div className="flex items-center gap-3">
          <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-3/4 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-5/6 rounded" />
          <div className="skeleton h-3 w-2/3 rounded" />
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-fog">fetching…</p>
    </div>
  )
}
