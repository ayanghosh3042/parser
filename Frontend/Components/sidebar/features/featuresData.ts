import { FileText, Layers, Download, Brain, Shield, Zap } from "lucide-react";

export const features = [
  {
    title: "Smart Text Extraction",
    description: "Extract structured data from documents using AI OCR.",
    icon: FileText,
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-400"
  },
  {
    title: "Batch Processing",
    description: "Upload and process multiple files simultaneously.",
    icon: Layers,
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-400"
  },
  {
    title: "Export Options",
    description: "Download results in CSV, JSON, or Excel formats.",
    icon: Download,
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-400"
  },
  {
    title: "AI Classification",
    description: "Automatically categorize documents intelligently.",
    icon: Brain,
    iconBg: "bg-gradient-to-br from-pink-500 to-purple-400"
  },
  {
    title: "Secure Processing",
    description: "Enterprise-grade security and encryption.",
    icon: Shield,
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-400"
  },
  {
    title: "Real-time Parsing",
    description: "Instant results with lightning fast processing.",
    icon: Zap,
    iconBg: "bg-gradient-to-br from-orange-500 to-pink-400"
  }
];