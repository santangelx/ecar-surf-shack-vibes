import React from 'react';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languages: { code: Language; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
];

// `tone` adapts the trigger color to the navbar state (white over the hero,
// ink once the nav turns solid).
const LanguageSelector = ({ tone = 'dark' }: { tone?: 'light' | 'dark' }) => {
  const { language, setLanguage } = useLanguage();
  const color = tone === 'light' ? '#ffffff' : '#11313E';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Idioma"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '15px',
            padding: '4px',
            transition: 'color .35s ease',
          }}
        >
          <Globe style={{ width: 18, height: 18 }} />
          <span>{language.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'font-semibold text-[#0E7C99]' : ''}`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
