const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {children}

      <div className="w-2/3 bg-gradient-to-br from-purple-500 to-indigo-400 flex items-center justify-center text-white relative overflow-hidden">
        {/* soft circles background */}
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full top-[-100px] left-[20%]" />
        <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full bottom-[-120px] right-[10%]" />

        <div className="absolute w-[300px] h-[300px] bg-white/5 rounded-full top-[20%] right-[25%]" />
        <div className="absolute w-[250px] h-[250px] bg-white/5 rounded-full bottom-[15%] left-[30%]" />
        
        <div className="absolute w-[600px] h-[600px] bg-white/5 rounded-full top-[40%] left-[55%]" />
        <div className="absolute w-[200px] h-[200px] bg-white/10 rounded-full top-[10%] left-[55%]" />
        
        <div className="absolute w-[350px] h-[350px] bg-white/5 rounded-full bottom-[-50px] left-[60%]" />
        <div className="absolute w-[150px] h-[150px] bg-white/10 rounded-full top-[60%] left-[10%]" />

        <div className="text-center z-10">
          <h1 className="text-9xl font-semibold mb-4">
            Parseon
          </h1>
          <p className="bg-black/40 px-8 py-4 rounded-md text-xl font-semibold">
            Your All-In-One Document Parser
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;