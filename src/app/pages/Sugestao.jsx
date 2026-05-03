import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageSquarePlus } from 'lucide-react';

export default function Sugestao() {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Sugestão enviada com sucesso! Obrigado pelo feedback.');
    setSuggestion('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName="João Silva" />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <MessageSquarePlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Envie sua sugestão
          </h1>
          <p className="text-muted-foreground">
            Sua opinião é muito importante para melhorarmos a Insper Store
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Descreva sua sugestão
              </label>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Digite aqui sua sugestão de produto, melhoria ou qualquer outro feedback..."
                className="w-full h-48 px-4 py-3 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-full">
                Enviar Sugestão
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}