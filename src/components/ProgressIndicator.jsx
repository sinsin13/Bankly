function ProgressIndicator({ currentStep, totalSteps = 3 }) {
    return (
      <div className="flex justify-center items-center mb-8 gap-3">
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          
          return (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-colors duration-300 ${
                  isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              >
                {isCompleted ? '✓' : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`w-10 h-0.5 mx-1 transition-colors duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
  
  export default ProgressIndicator;