const Offline = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="px-40 py-20 rounded-md shadow-xl bg-black-100">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-darkblue text-9xl">Offline</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-white md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-white md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offline;
