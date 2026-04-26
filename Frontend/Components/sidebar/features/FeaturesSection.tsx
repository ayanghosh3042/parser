import FeatureCard from "./FeatureCard";
import { features } from "./featuresData";

const FeaturesSection = () => {
  return (
    <section className="pt-8 pb-14 px-5 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 mt-0">
            Features of Parseon
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-center mb-14 max-w-2xl mx-auto">
          Everything you need to extract, analyze and manage documents efficiently.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;