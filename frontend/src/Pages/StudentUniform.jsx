import React from 'react';
import main1 from '../../src/assets/main1.jpeg'
import main2 from '../../src/assets/main2.jpeg'
import uniform1 from '../../src/assets/uniform1.jpeg'
import uniform2 from '../../src/assets/uniform2.jpeg'
import uniform3 from '../../src/assets/uniform3.jpeg'
import uniform4 from '../../src/assets/uniform4.jpeg'
import uniform5 from '../../src/assets/uniform5.jpeg'
import uniform6 from '../../src/assets/uniform6.jpeg'

const StudentUniform = () => {
  // Top row images
  const topRowImages = [
    {
      id: 1,
      src: main1,
      alt: 'Student Uniform Front View',
      filename: 'student-uniform-front.jpg'
    },
    {
      id: 2,
      src: main2,
      alt: 'Student Uniform Side View',
      filename: 'student-uniform-side.jpg'
    }
  ];

  // Bottom row images
  const bottomRowImages = [
    {
      id: 3,
      src: uniform1,
      alt: 'Uniform Style 1',
      filename: 'uniform-style-1.jpg'
    },
    {
      id: 4,
      src: uniform2,
      alt: 'Uniform Style 2',
      filename: 'uniform-style-2.jpg'
    },
    {
      id: 5,
      src: uniform3,
      alt: 'Uniform Style 3',
      filename: 'uniform-style-3.jpg'
    },
    {
      id: 6,
      src: uniform4,
      alt: 'Uniform Style 4',
      filename: 'uniform-style-4.jpg'
    },
    {
      id: 7,
      src: uniform5,
      alt: 'Uniform Style 5',
      filename: 'uniform-style-5.jpg'
    },
    {
      id: 8,
      src: uniform6,
      alt: 'Uniform Style 6',
      filename: 'uniform-style-6.jpg'
    }
  ];

  // Function to handle image download
  const handleDownload = async (image) => {
    try {
      // Convert the imported image to blob
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = image.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Alternative download method
      const link = document.createElement('a');
      link.href = image.src;
      link.download = image.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Download all images
  const handleDownloadAll = async () => {
    const allImages = [...topRowImages, ...bottomRowImages];
    for (const image of allImages) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between downloads
      handleDownload(image);
    }
  };

  // Image component with loading state
const UniformImage = ({ image }) => (
  <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
    <div className="aspect-w-4 aspect-h-5">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
      <button
        onClick={() => handleDownload(image)}
        className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg border border-gray-300 hover:scale-105 cursor-pointer"
      >
        ⬇ Download
      </button>
    </div>
  </div>
);


  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-[#263675] mb-6">
            Student Uniform
          </h1>
          <p className="text-md text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Below is our school dress sample that you need to buy or get stitched at any shop. Other items such as the tie, belt, and identity card will be provided by the school. Winter clothes like the school sports dress, hoodie, and sweaters will also be given by the school.

          </p>
        </div>

        {/* Top Row - 2 Photos */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Primary Uniforms
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {topRowImages.map((image) => (
              <UniformImage key={image.id} image={image} />
            ))}
          </div>
        </div>

        {/* Bottom Row - 6 Photos */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Uniform Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {bottomRowImages.map((image) => (
              <UniformImage key={image.id} image={image} />
            ))}
          </div>
        </div>

        {/* Download All Button */}
        <div className="text-center">
          <button
            onClick={handleDownloadAll}
            className="bg-gradient-to-r from-[#263675] to-[#4E56C0] text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-[#134686] hover:to-[#31326F] focus:outline-none focus:ring-4 focus:ring-[#0046FF] focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            🡇 Download All Uniform Images
          </button>
          <p className="text-gray-500 text-sm mt-3">
            This will download all 8 uniform images one by one
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudentUniform;