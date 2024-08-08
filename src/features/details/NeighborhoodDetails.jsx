function NeighborhoodDetails({ category, nearByInfos }) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="mt-8">
        <h2 className="font-bold px-4 mb-2">
          {category.replace(/_/g, " ").toUpperCase()}
        </h2>
        <div className="flex flex-wrap gap-4 px-6  text-black text-sm">
          {nearByInfos.map(
            (info) =>
              info.tags.name && (
                <div
                  key={info.id}
                  className="flex justify-center items-center px-2 py-2 gap-4
                   bg-blue-100 border border-green-500"
                >
                  <p>{info.tags?.name}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default NeighborhoodDetails;
