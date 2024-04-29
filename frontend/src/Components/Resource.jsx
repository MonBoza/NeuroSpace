import React from 'react';

const Resource = () => {
  
  const resources = [
    { category: "Video", name: "Interview NeuroDiverse candidates", link: "https://youtu.be/KZiN85il-4g", description: "Here is a video that is helpful when interviewing neurodivergent candidates." },
    { category: "Job", name: "Neuro Diversity Hub", link: "https://www.neurodiversityhub.org/des", description: "A job board" },
    { category: "Video", name: "Acing Your Job Interview: A Guide for Neurodivergent Candidates", link: "https://youtu.be/Qqev0iq7-zQ?si=7_09oYqUNWpx7l3x", description: "A video guide on how to ace an interview" },
    { category: "Service", name: "Beyond Booksmart", link: "https://www.beyondbooksmart.com/how-it-works", description: "Beyond BookSmart offers Executive Function coaching to help children and adults improve their lives and achieve daily goals at school, work, and home with one-on-one, virtual coaching."},
    {category: "Game", name: "Feelu: Social-Emotional Tool", link: "https://apps.apple.com/us/app/feelu-social-emotional-tool/id1462795455", description: "A game to teach kids emotional intelligence"},
    {category: "Game", name: "Wisdom: The world of emotions", link: "https://apps.apple.com/us/app/wisdom-the-world-of-emotions/id1182494093", description: "Wisdom offers practice activities and discussions you can lead with your child, as well as beautiful printable templates that foster skills like gratitude, problem solving and more! A collection of parenting tips and resources is also available to help you support your child's emotional growth. Explore topics like challenging behaviors, sleep, and independence to learn useful exercises you can do together."}
  ];

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {});

  return (
    <div className="container mx-auto py-8">
      {Object.entries(groupedResources).map(([category, resources]) => (
        <div key={category} className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{category} Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">{resource.name}</a>
                <p className="text-gray-600 font-roboto">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resource;
