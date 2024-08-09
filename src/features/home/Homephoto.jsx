import home from "/home.mp4";

function Homephoto() {
  return (
    <div>
      <div
        className="relative text-slate-200
      "
      >
        <video className="object-cover w-full h-80" autoPlay muted loop>
          <source src={home} type="video/mp4" />
          {/* Fallback image for browsers that do not support the video tag */}
          <img
            src="/src/images/homebg.jfif"
            alt="company"
            className="w-screen auto"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl sm:text-5xl font-extrabold">
            Discover Your New Home
          </p>
          <p className="text-lg">Helping many renters find their perfect fit</p>
        </div>
      </div>
    </div>
  );
}

export default Homephoto;
