function Home() {
  const dftxt = "login to start chat";

  return (
    <div className="w-2/3 mx-auto h-2/3 flex items-center">
      <p className="w-fit text-3xl  mx-auto tracking-widest font-mono text-center animate-pulse ">
        {dftxt}
      </p>
    </div>
  );
}

export default Home;
