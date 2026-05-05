import { Link } from 'react-router-dom';

export function Footer() {
const pageLinks = [
  { label: 'Home', to: '/' },
  { label: 'Perfil', to: '/perfil' },
  { label: 'Configurações', to: '/configuracoes' },
  { label: 'Histórico', to: '/historico' },
  { label: 'Sugestões', to: '/sugestao' },
];

  return (
    <footer className="bg-[#3A3A41] dark:bg-[#121212] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="grid md:grid-cols-3 gap-10">
          
          <div className="space-y-4">
            <img
              src="/loja-insper.png"
              alt="Loja Insper"
              className="h-12 w-auto invert brightness-0"
            />

            <div className="text-sm text-white/80 leading-relaxed">
              <p>Rua Quatá, 300</p>
              <p>Vila Olímpia</p>
              <p>São Paulo/SP</p>
              <p>CEP 04546-042</p>
              <p className="mt-2">(11) 4504-2400</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Páginas
            </h3>

            <ul className="flex flex-col space-y-2">
              {pageLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Sobre a loja
            </h3>

            <p className="text-sm text-white/80 leading-relaxed">
              Produtos oficiais do Insper com qualidade e identidade
              institucional. Explore nossa coleção exclusiva.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}