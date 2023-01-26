import { useAuthContext } from "../components/context/AuthContext";
 
function Home() {
  const IfNotUser = () =>{
    return (
      <>
        <span className="font-bold px-1">Sign in </span> to start chat...
      </>
    );
  };
  const IfUser = () => {
    return <>
      click on <span className="px-2 text-slate-800 font-bold">Private Message</span> to chat
    </>
  };
  const {currentUser} = useAuthContext()

   return (

      <h2
        className="my-auto mx-auto relative h-full flex
        justify-center items-center md:text-2xl text-lg w-2/3  text-center text-zinc-700 break-words
        
        "
      >
        {currentUser ? <IfUser /> : <IfNotUser />}
      </h2>
    
  );
}

export default Home;
