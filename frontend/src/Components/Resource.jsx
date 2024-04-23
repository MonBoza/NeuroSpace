import React from 'react';

const Resource = () => {
  
  const resources = [
    { category: "Video", name: "Interview NeuroDiverse candidates", link: "https://youtu.be/KZiN85il-4g", description: "Here is a video that is helpful when interviewing neurodivergent candidates." },
    { category: "Job", name: "Neuro Diversity Hub", link: "https://www.neurodiversityhub.org/des", description: "A job board" },
    { category: "Video", name: "Acing Your Job Interview: A Guide for Neurodivergent Candidates", link: "https://youtu.be/Qqev0iq7-zQ?si=7_09oYqUNWpx7l3x", description: "A video guide on how to ace an interview" }

  ];


  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {});
  return (
    <div className="mx-auto p-4">
      {Object.entries(groupedResources).map(([category, resources]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{category} Resources</h2>
          <div className="bg-gray-100 rounded-lg shadow-lg">
            <ul className="divide-y divide-gray-200 bg-gray-300">
              {resources.map((resource, index) => (
                <li key={index} className="py-4 shadow-lg px-6">
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">{resource.name}</a>
                  <p className="text-gray-600 font-roboto">{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resource;
