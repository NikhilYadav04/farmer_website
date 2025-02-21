import { timeLineElements } from './timeLineElements';
const FeatureSection = () => {
  console.log(localStorage.getItem('userdata'));

  return (
    <div className="relative w-[90vw] border-neutral-800">
      <div className="text-center">
        <span className="h-6 rounded-full bg-neutral-900 px-2 py-1 text-sm font-medium uppercase text-green-400">
          Feature
        </span>
        <h2 className="mx-10 mt-10 text-center text-3xl tracking-wide sm:text-4xl lg:mt-20 lg:text-6xl">
          Revolutionize Agriculture with
          <span className="bg-gradient-to-r from-green-500 to-green-900 bg-clip-text text-center text-transparent">
            {'  '}
            AI-Powered Disease Prediction
          </span>
        </h2>
      </div>
      <div className="mt-10 flex flex-wrap items-start justify-center lg:mt-20">
        {timeLineElements.map((timeLineElement, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex rounded-xl">
              <div className="mx-6 h-10 w-10 rounded-full bg-neutral-900 p-2 text-green-500">
                {timeLineElement.icons}
              </div>
              <div>
                <h5 className="mb-6 mt-1 text-xl">{timeLineElement.title}</h5>
                <p className="text-md mb-20 w-11/12 p-2 text-neutral-500">
                  {timeLineElement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
