"use client";

import { useState } from 'react';

type Guest = {
  id: number;
  name: string;
  createdAt: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGuests = async (currentPassword = password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: currentPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        setGuests(data.guests);
        setAuthenticated(true);
        setError('');
      } else {
        if (!authenticated) setError('Contraseña incorrecta');
      }
    } catch (err) {
      if (!authenticated) setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchGuests(password);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Panel de Administración</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9b4c] focus:border-transparent outline-none"
                placeholder="Ingresa la clave..."
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#cc9b4c] text-white font-semibold py-2 rounded-lg hover:bg-[#b88534] transition-colors disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Modal de Total de Invitados */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden mb-8 flex flex-col items-center justify-center py-8 border-t-4 border-[#cc9b4c]">
          <h2 className="text-gray-500 text-lg font-medium mb-1 tracking-wide uppercase">Total Confirmados</h2>
          <div className="text-7xl font-extrabold text-[#112a46] drop-shadow-sm">{guests.length}</div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-[#112a46]">
            <div className="flex items-center gap-3">
              <h3 className="text-xl leading-6 font-medium text-white">
                Lista de Invitados
              </h3>
              <button 
                onClick={() => fetchGuests()}
                disabled={loading}
                className="p-1.5 bg-white/10 hover:bg-white/25 rounded-full transition-all disabled:opacity-50"
                title="Refrescar lista"
              >
                <svg className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            <button 
              onClick={() => {
                setAuthenticated(false);
                setPassword('');
              }}
              className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition-colors"
            >
              Salir
            </button>
          </div>
          <div className="px-6 py-5">
            {guests.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aún no hay invitados confirmados.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {guests.map((guest) => (
                  <li key={guest.id} className="py-4 flex justify-between items-center hover:bg-gray-50 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#cc9b4c]/20 flex items-center justify-center text-[#cc9b4c] font-bold">
                        {guest.name.charAt(0).toUpperCase()}
                      </div>
                      <p className="text-lg font-medium text-gray-900">{guest.name}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(guest.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
