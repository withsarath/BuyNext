const ProductSkeleton = () => (
  <div className="card bg-base-200 border border-base-300">
    <div className="p-4 pb-0">
      <div className="skeleton h-48 w-full rounded-xl" />
    </div>
    <div className="card-body p-4 gap-3">
      <div className="skeleton h-5 w-2/3" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-4/5" />
      <div className="flex items-center gap-2 pt-2">
        <div className="skeleton size-6 rounded-full shrink-0" />
        <div className="skeleton h-3 w-24" />
      </div>
    </div>
  </div>
);

export default ProductSkeleton;
