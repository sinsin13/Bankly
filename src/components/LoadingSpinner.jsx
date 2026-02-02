export default function LoadingSpinner({ size = 'medium', fullScreen = false }) {
    const sizes = {
      small: 'w-4 h-4 border-2',
      medium: 'w-8 h-8 border-4',
      large: 'w-12 h-12 border-4'
    };
  
    const spinner = (
      <div className={`${sizes[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`} />
    );
  
    if (fullScreen) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            {spinner}
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="flex items-center justify-center p-4">
        {spinner}
      </div>
    );
  }