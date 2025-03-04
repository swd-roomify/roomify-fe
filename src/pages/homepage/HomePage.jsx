import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MessageSquare, Video } from "lucide-react";
import "../../assets/style/css/homepage.css";

export default function HomePage() {
  const [messages, setMessages] = useState([
    { user: "Ben", text: "Harry, this is great news! Our latest project is just the final stretch ahead of schedule!" },
    { user: "Diana", text: "That’s fantastic! I knew our team could do it. Everyone’s hard work and dedication really paid off." },
    { user: "John", text: "Absolutely! I’m so proud of our team, we overcame all roadblocks and pushed through!" },
    { user: "Alex", text: "Great job all! The pace and coordination in our virtual space made all the difference." }
  ]);

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen text-white flex flex-col items-center">
      <header className="w-full flex justify-between px-10 py-5">
        <h1 className="text-2xl font-bold">Roomify</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:underline">Product</a>
          <a href="#" className="hover:underline">Solutions</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">Resources</a>
          <Button variant="outline" className="button-outline">Get Started</Button>
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
        </nav>
      </header>

      <section className="flex flex-col items-center text-center mt-16 px-6">
        <h2 className="text-4xl font-bold">Your Virtual HQ</h2>
        <p className="text-lg text-gray-300 mt-4">
          Roomify brings the best of in-person collaboration to distributed teams.
        </p>
        <div className="mt-6 flex gap-4">
          <Button size="lg">Get Started</Button>
          <a href="#" className="text-lg underline">Or take a tour &rarr;</a>
        </div>
      </section>

      <div className="relative w-full max-w-4xl mt-10 flex bg-gray-900 p-6 rounded-xl shadow-lg">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-center"> <Video size={40} /> </div>
          <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-center"> <Video size={40} /> </div>
          <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-center"> <Video size={40} /> </div>
          <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-center"> <Video size={40} /> </div>
        </div>
        
        {/* Chat Panel */}
        <div className="w-1/3 bg-gray-800 p-4 rounded-lg ml-6">
          <h3 className="text-lg font-semibold">Chat</h3>
          <div className="mt-4 space-y-3 text-sm">
            {messages.map((msg, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-lg">
                <span className="font-bold">{msg.user}:</span> {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 px-3 py-2 rounded-l-lg bg-gray-700 text-white outline-none"
            />
            <button className="px-4 py-2 bg-green-500 rounded-r-lg text-white">
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}