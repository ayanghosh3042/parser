import React from "react";

const DocumentationPage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 mt-16">
        📄 Documentation
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <iframe
          src="/docs/Final Year Project Report.pdf"
          title="Documentation PDF"
          className="w-full h-[85vh]"
        />
      </div>
    </div>
  );
};

export default DocumentationPage;