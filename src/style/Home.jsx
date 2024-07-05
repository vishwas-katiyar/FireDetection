import React from 'react';
import { Button, Card, IconButton } from '@material-tailwind/react';
import { FaFire, FaRegPlayCircle, FaCheckCircle, FaBuilding, FaHome, FaIndustry, FaBolt, FaShieldAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-green-500 py-20 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Real-Time Fire Detection with YOLOv8</h1>
          <p className="text-lg mb-6">
            Experience cutting-edge fire detection technology. Ensure safety and swift response with our real-time fire detection system powered by YOLOv8.
          </p>
          <Button color="white" variant="outlined" className="mr-4">Try Demo</Button>
          <Button color="white" variant="filled">Learn More</Button>
        </div>
      </section>

      {/* Introduction to the Product */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Introduction to the Product</h2>
          <p className="text-lg mb-12">
            Our fire detection system uses YOLOv8 to provide accurate, real-time detection of fire outbreaks, ensuring timely alerts and preventing potential disasters.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 shadow-lg">
              <IconButton color="red" className="mb-4">
                <FaFire size={32} />
              </IconButton>
              <h3 className="text-2xl font-bold mb-2">Instant Detection</h3>
              <p>Provides immediate alerts upon detecting fire.</p>
            </Card>
            <Card className="p-6 shadow-lg">
              <IconButton color="green" className="mb-4">
                <FaCheckCircle size={32} />
              </IconButton>
              <h3 className="text-2xl font-bold mb-2">High Accuracy</h3>
              <p>Ensures reliable detection with minimal false alarms.</p>
            </Card>
            <Card className="p-6 shadow-lg">
              <IconButton color="blue" className="mb-4">
                <FaBolt size={32} />
              </IconButton>
              <h3 className="text-2xl font-bold mb-2">Easy Integration</h3>
              <p>Seamlessly integrates with existing systems.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Live Demo Preview</h2>
          <p className="text-lg mb-6">Watch our system in action:</p>
          <div className="mb-8">
            {/* Replace with an actual embedded video */}
            <div className="relative bg-gray-300 h-64 flex items-center justify-center">
              <FaRegPlayCircle size={64} color="white" />
              <span className="absolute text-white text-xl">Embedded Video Placeholder</span>
            </div>
          </div>
          <Button color="blue" className="mr-4">Interactive Demo</Button>
        </div>
      </section>

      {/* Benefits and Use Cases */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Benefits and Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Benefits:</h3>
              <ul className="list-disc list-inside text-left text-lg">
                <li>Enhance Safety</li>
                <li>Fast Response Times</li>
                <li>Reliable Detection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Use Cases:</h3>
              <ul className="list-disc list-inside text-left text-lg">
                <li>
                  <FaHome className="inline-block mr-2" /> Residential
                </li>
                <li>
                  <FaBuilding className="inline-block mr-2" /> Commercial
                </li>
                <li>
                  <FaIndustry className="inline-block mr-2" /> Industrial
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Technical Details</h2>
          <p className="text-lg mb-12">
            Our fire detection system is built using the latest technologies to ensure top performance and reliability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-lg">
              <IconButton color="purple" className="mb-4">
                <FaShieldAlt size={32} />
              </IconButton>
              <h3 className="text-2xl font-bold mb-2">Technology Stack</h3>
              <ul className="list-disc list-inside text-left text-lg">
                <li>YOLOv8</li>
                <li>React</li>
                <li>Material Tailwind</li>
              </ul>
            </Card>
            <Card className="p-6 shadow-lg">
              <IconButton color="orange" className="mb-4">
                <FaBolt size={32} />
              </IconButton>
              <h3 className="text-2xl font-bold mb-2">Performance Metrics</h3>
              <ul className="list-disc list-inside text-left text-lg">
                <li>98% Detection Accuracy</li>
                <li>Real-time Processing</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials and Case Studies */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Testimonials and Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Customer Testimonials:</h3>
              <p className="text-lg">"The best fire detection system we've ever used!" - John Doe</p>
            </Card>
            <Card className="p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Case Studies:</h3>
              <p className="text-lg">Successful implementation in an office building, reducing response time by 50%.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-lg mb-12">
            We are dedicated to providing innovative solutions to ensure safety and security. Our mission is to leverage technology to create safer environments.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <form className="mx-auto max-w-lg">
            <div className="mb-4">
              <input type="text" placeholder="Name" className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <textarea placeholder="Message" className="w-full p-3 border rounded" rows="4"></textarea>
            </div>
            <Button color="blue" className="w-full">Submit</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-white">
        <div className="container mx-auto text-center">
        <p>&copy; 2024 Fire Detection System. All Rights Reserved.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">About Us</a>
            <a href="#" className="text-white">Contact</a>
            <a href="#" className="text-white">Privacy Policy</a>
            <a href="#" className="text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

