import { useState, useEffect } from 'react';
import viteLogo from '/birding-logo.png';
import greenLogo from '/birding-logo-green.png';
import apimage from '/iphone-briding.png';
import birdtable from '/Image.jpg';
import google from '/googleplay.png';
import apple from '/appstore.png';
import './App.css';
import birdsData from './birds.json';
import { FaArrowDown, FaRulerVertical, FaWeightHanging, FaFeather, FaTimes, FaArrowUp, FaBars } from 'react-icons/fa';
import ContactForm from './ContactForm';

function App() {
  const [bird, setBird] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const randomBird = birdsData.birds[Math.floor(Math.random() * birdsData.birds.length)];
    setBird(randomBird);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setShowBackToTop(window.scrollY > 300); // Visa knappen efter 300px scrollning
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Denna rad är valfri eftersom vi redan har satt scroll-behavior i CSS
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center px-4 md:px-20 py-4 
              transition-all duration-100
              ${isScrolled ? "bg-white text-green-900 shadow-lg" : "backdrop-blur-md bg-black/10 text-white"}`}
      >
        <div className="flex items-center justify-between w-full">
          <a href="#">
            <img src={isScrolled ? greenLogo : viteLogo} alt="Logo" className="h-12 md:h-16" />
          </a>

          {/* Hamburger Menu Button (Only on Mobile) */}
          <button
            className="md:hidden text-3xl text-current focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Menu (Hidden on Mobile by Default) */}
        <nav
          className={`absolute top-full left-0 w-full shadow-md md:shadow-none md:bg-transparent md:text-current md:relative md:flex md:items-center md:justify-end 
                transition-all duration-100
                ${menuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-5 scale-95 pointer-events-none"} 
                md:opacity-100 md:translate-y-0 md:scale-100 md:pointer-events-auto
                ${menuOpen ? (isScrolled ? "bg-white text-green-900" : "backdrop-blur-md bg-black/10 text-white") : "bg-transparent md:bg-transparent"}`}
        >
          <ul className="flex flex-col md:flex-row items-center md:justify-end space-y-4 md:space-y-0 md:space-x-10 uppercase font-bold tracking-wide py-4 md:py-0">
            <li><a href="#" className="hover:opacity-75" onClick={() => setMenuOpen(false)}>Hem</a></li>
            <li><a href="#aboutapp" className="hover:opacity-75" onClick={() => setMenuOpen(false)}>FåglaAppen</a></li>
            <li><a href="#privacy-policy" className="hover:opacity-75" onClick={() => setMenuOpen(false)}>Integritetspolicy</a></li>
            <li><a href="#contact" className="hover:opacity-75" onClick={() => setMenuOpen(false)}>Kontakt</a></li>
          </ul>
        </nav>
      </header>



      <main
        className="h-screen relative bg-cover bg-center bg-no-repeat bg-fixed"
        style={
          bird?.bilder?.length
            ? { backgroundImage: `url(${new URL(`./assets/birds/${bird.bilder[0]}`, import.meta.url).href})` }
            : {}
        }
      >
        <div className="absolute inset-0 bg-black/60"></div>

        {bird && (
          <div
            className="absolute bottom-40 md:bottom-20 left-1/2 transform -translate-x-1/2 text-white cursor-pointer space-y-2 
             text-center md:text-right md:left-auto md:right-20 md:translate-x-0"
            onClick={() => setShowDetails(!showDetails)}
          >
            <h1 className="text-lg sm:text-xl md:text-3xl font-extrabold drop-shadow-xl">{bird.namn}</h1>
            <h2 className="text-sm sm:text-lg md:text-xl italic text-gray-200">{bird.latinskt_namn}</h2>
          </div>


        )}

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ease-out ${showDetails ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="bg-gradient-to-br from-white to-yellow-50 ring-2 ring-yellow-300 ring-offset-2 ring-offset-white 
                backdrop-blur-md rounded-3xl p-8 max-w-xl w-full mx-4 text-slate-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative">
            <button
              className="text-yellow-700 text-xl font-bold mb-4 float-right hover:text-yellow-900 cursor-pointer"
              onClick={() => setShowDetails(false)}
            >
              <FaTimes className="text-2xl mb-2 text-yellow-700" />
            </button>
            {bird && (
              <>
                <h3 className="text-2xl md:text-4xl font-extrabold text-center mb-4 tracking-wider text-yellow-700">
                  {bird.namn}
                </h3>
                <p className="text-center text-base md:text-lg italic text-slate-600 mb-6">
                  {bird.latinskt_namn}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-yellow-700">Beskrivning</h4>
                  <p>{bird.beskrivning}</p>
                  <br className="hidden md:block" />
                  <p className="hidden md:block">{bird.övrig_information}</p>
                </div>
                <div className="mb-4 hidden md:block">
                  <h4 className="font-semibold text-yellow-700">Utbredning i Sverige</h4>
                  <p>{bird.utbredning_i_sverige}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-yellow-700">Lätbeskrivning</h4>
                  <p>{bird.lätbeskrivning}</p>
                </div>
                <div className="flex justify-around mt-8">
                  <div className="flex flex-col items-center text-center hidden md:flex">
                    <FaRulerVertical className="text-3xl mb-2 text-yellow-700" />
                    <p>{bird.längd}</p>
                  </div>
                  <div className="flex flex-col items-center text-center hidden md:flex">
                    <FaFeather className="text-3xl mb-2 text-yellow-700" />
                    <p>{bird.vingbredd}</p>
                  </div>
                  <div className="flex flex-col items-center text-center hidden md:flex">
                    <FaWeightHanging className="text-3xl mb-2 text-yellow-700" />
                    <p>{bird.vikt}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bouncing Scroll Down Button */}
        <a
          href="#aboutapp"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 delayed-bounce bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition duration-800"
        >
          <FaArrowDown className="text-green-700 text-2xl" />
        </a>
      </main>



      {/* Birding App Information Section */}
      <section id="aboutapp" className="w-full bg-gray-100 py-20 md:py-50 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">Upptäck glädjen med fågelskådning</h2>
            <p className="text-lg text-gray-700">
              Fågelskådning är mer än bara en hobby – det är en chans att komma närmare naturen, upptäcka fantastiska arter och njuta av lugnet utomhus. Med vår Birding-app kan du spara de fåglar du spanar in, markera dina favoriter och samla coola utmärkelser för dina upptäckter.
            </p>
            <p>
              Ju fler fåglar du hittar, desto fler badges kan du låsa upp – en perfekt motivation för att utforska ännu mer! Oavsett om du är nybörjare eller en erfaren skådare blir varje promenad till ett äventyr med Birding.
            </p>
            <p className="text-lg text-gray-700">
              Gör dig redo att ge dig ut i naturen, hitta sällsynta arter och ha kul på vägen!
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex flex-col items-center mt-10 md:mt-0">
  <img src={apimage} alt="Birding App" className="w-full" />

  <div className="flex gap-4 mt-4">
    <a href="https://play.google.com/store/apps/details?id=your.app.id" target="_blank" rel="noopener noreferrer">
      <img src={google} alt="Get it on Google Play" className="w-40" />
    </a>
    <a href="https://apps.apple.com/app/idyourappid" target="_blank" rel="noopener noreferrer">
      <img src={apple} alt="Download on the App Store" className="w-40" />
    </a>
  </div>
</div>
        </div>
      </section>

      {/* Fågelbordet - Heltäckande bild med text till höger */}
      <section
        className="relative w-full bg-cover bg-center py-20 md:py-50"
        style={{ backgroundImage: `url(${birdtable})` }}
      >
        {/* Mörk overlay på höger sida */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>

        {/* Textinnehåll på höger sida */}
        <div className="relative z-10 h-full flex items-center justify-end max-w-6xl mx-auto px-10">
          <div className="text-white space-y-4 w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold">Vad ska du ha på fågelbordet?</h2>
            <p className="text-lg">
              Ett fågelbord kan locka många olika fåglar beroende på vad du lägger ut.
              Solrosfrön, jordnötter, hampfrön och talgbollar är perfekta för att attrahera arter som
              talgoxar, blåmesar och grönfinkar. Äpplen och havre kan även locka trastar och sidensvansar.
            </p>
            <p className="text-lg">
              Se till att placera fågelbordet på en säker plats, gärna nära buskar eller träd,
              där fåglarna kan känna sig trygga från rovdjur. Glöm inte att hålla mataren ren
              för att undvika sjukdomar.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy-policy" className="w-full bg-white py-20 md:py-50 px-10 border-t border-gray-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-6">Integritetspolicy</h2>
          <p className="text-gray-600 text-sm text-center mb-8">Senast uppdaterad: [Datum]</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
            {/* Left Column */}
            <div className="space-y-6">
              <p>
                <strong>[App Namn]</strong> ("vi," "vår," eller "oss") respekterar din integritet. Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar din information när du använder vår app.
              </p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">1. Information vi samlar in</h3>
              <p>Vi samlar endast in data som är nödvändig för appens funktion:</p>
              <ul className="list-disc list-inside">
                <li>Din e-postadress</li>
                <li>ID-nummer för fåglar du har observerat</li>
                <li>Utmärkelser du har tjänat</li>
                <li>Måltider du har loggat</li>
              </ul>
              <p>Ingen annan personlig information, såsom namn eller känslig information, samlas in.</p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">2. Hur vi använder din information</h3>
              <p>
                Informationen används endast för att tillhandahålla och förbättra din upplevelse i appen. Din e-postadress kan användas för inloggning och appkommunikation. Vi säljer eller delar aldrig din information.
              </p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">3. Dataskydd och säkerhet</h3>
              <p>
                Vi lagrar din data säkert och skyddar den mot obehörig åtkomst. Dock kan inget system garantera 100 % säkerhet.
              </p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">4. Tredjepartstjänster</h3>
              <p>
                Vi delar inte din data med tredje parter eller annonsörer. Vissa externa tjänster som **Firebase** eller **Appwrite** kan användas för backend-funktioner men har endast åtkomst till nödvändig information för appens drift.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-800 mb-1">5. Efterlevnad av App Store och Google Play Store riktlinjer</h3>
              <p>
                Vi följer alla integritetskrav från **Apple App Store** och **Google Play Store** för att säkerställa att användardata hanteras på ett säkert och transparent sätt.
              </p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">6. Policy för datalagring</h3>
              <p>
                Vi lagrar din data endast så länge den behövs för appens funktionalitet. Om du vill radera din e-post eller annan data, kontakta oss på <strong>[Din kontaktmail]</strong>. Du kan också avinstallera appen när som helst för att radera lokal data.
              </p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">7. Barns integritet</h3>
              <p>
                Denna app är **lämplig för barn** och innehåller inget olämpligt innehåll eller någon datainsamling utöver vad som anges i denna policy.
              </p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">8. Ändringar i denna policy</h3>
              <p>
                Vi kan uppdatera denna integritetspolicy vid behov. Eventuella ändringar återspeglas i detta dokument, och fortsatt användning av appen innebär att du godkänner den uppdaterade policyn.
              </p>

              <h3 className="text-xl font-semibold text-green-800 mb-1">9. Kontakta oss</h3>
              <p>
                Har du frågor om vår integritetspolicy? Kontakta oss på <strong>[Din kontaktmail]</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <footer id="footer" className="h-20 w-full bg-white text-grey flex items-center justify-center">
        <p>© 2025 Birding App. All rights reserved.</p>
      </footer>

      {/* Tillbaka till toppen-knapp */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition-colors duration-300"
          aria-label="Tillbaka till toppen"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default App;
