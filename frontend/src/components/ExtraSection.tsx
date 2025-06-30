import React from 'react'

const ExtraSection = () => {
  return (
    <>

      {/* Why Choose Us Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-800">Why Choose Eventify?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "All-in-One Platform", desc: "Manage, join, and create events with ease." },
            { title: "Real-Time Updates", desc: "Stay up to date with instant notifications and changes." },
            { title: "Community Focused", desc: "Connect with like-minded people and grow your network." },
          ].map((item, i) => (
            <div key={i} className="bg-white/80 rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default ExtraSection