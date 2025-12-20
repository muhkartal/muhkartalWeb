import { Mail, MapPin, Phone, Linkedin, Github } from 'lucide-react';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          <div>
            <h1 className="text-black mb-2">John Doe</h1>
            <p className="text-neutral-600">Senior Software Engineer</p>
          </div>
          
          <Separator className="bg-neutral-200" />
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-neutral-600">
            <a href="mailto:john.doe@email.com" className="flex items-center gap-2 hover:text-black transition-colors">
              <Mail className="w-4 h-4" />
              <span>john.doe@email.com</span>
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-black transition-colors">
              <Phone className="w-4 h-4" />
              <span>+1 (234) 567-890</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
            <a href="https://linkedin.com/in/muhammed-ibrahim-kartal" className="flex items-center gap-2 hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/muhkartal" className="flex items-center gap-2 hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
