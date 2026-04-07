import { features } from "./featuresData";

interface Props {
  feature: typeof features[number];
}

const FeatureCard = ({ feature }: Props) => {
  const Icon = feature.icon;

  return (
    <div
      className="group relative flex flex-col w-[372px] h-[420px] border border-gray-100 
      rounded-2xl overflow-hidden bg-white transition-all duration-500 
      hover:scale-[1.03]"
      style={{ boxShadow: "0px 4.14px 33.14px 0px #7B61FF1A" }}
    >
      {/* hover glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
      transition duration-500 rounded-2xl 
      bg-gradient-to-br from-purple-500/10 to-indigo-500/10" />

      {/* Top Logo Section */}
      <div
        className={`relative flex items-center justify-center h-[180px] ${feature.iconBg}
        transition-all duration-500 group-hover:brightness-110`}
      >
        <div className="bg-white/20 p-5 rounded-xl backdrop-blur-sm 
        transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30">
          <Icon className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Detail Section */}
      <div className="relative flex-1 bg-white p-8 gap-4 rounded-b-2xl 
      flex flex-col items-center justify-center space-y-4">

        <div className="h-[40px] flex items-center justify-center">
          <h3 className="text-xl font-semibold text-center text-gray-900 
          transition-colors duration-300 group-hover:text-purple-600">
            {feature.title}
          </h3>
        </div>

        <div className="min-h-[60px] flex items-center justify-center text-center">
          <p className="text-gray-600">
            {feature.description}
          </p>
        </div>

        <div className="w-[125px] h-9" />
      </div>
    </div>
  );
};

export default FeatureCard;