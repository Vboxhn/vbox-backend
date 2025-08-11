import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Menú superior */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/sticker.png" alt="VBOX Logo" width={50} height={50} />
            <h1 className="text-2xl font-bold text-orange-600">VBOX</h1>
          </div>
          {/* Navegación */}
          <nav className="flex gap-6 text-blue-700 font-semibold items-center">
            <a href="#servicios" className="hover:text-orange-500">Servicios</a>
            <a href="#tarifas" className="hover:text-orange-500">Tarifas</a>
            <a href="#nosotros" className="hover:text-orange-500">Nosotros</a>
            {/* Enlace a la página de login */}
            <a
              href="/login"
              className="px-4 py-2 rounded border-2 border-orange-500 text-orange-500 hover:bg-orange-100 transition"
            >
              Iniciar Sesión
            </a>
            {/* Enlace al registro (crear casillero) */}
            <a
              href="/register"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Crear Casillero
            </a>
          </nav>
        </div>
      </header>

      {/* Encabezado grande */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-400 text-white text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Tu Casillero en Miami con VBOX</h2>
        <p className="text-lg md:text-xl mb-8">Compra en Amazon, Shein, Temu y recibe en Honduras fácil y rápido</p>
        <a
          href="https://wa.me/50431656247"
          target="_blank"
          className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow-md hover:bg-gray-100"
        >
          📦 Contáctanos por WhatsApp
        </a>
      </section>

      {/* Sección Servicios */}
      <section id="servicios" className="max-w-6xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">Nuestros Servicios</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <h4 className="text-xl font-bold text-orange-500 mb-2">Casillero en Miami</h4>
            <p>Recibe tus compras online en nuestra dirección en Miami.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <h4 className="text-xl font-bold text-orange-500 mb-2">Envío Aéreo y Marítimo</h4>
            <p>Elige entre velocidad o economía con nuestras opciones de envío.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <h4 className="text-xl font-bold text-orange-500 mb-2">Seguimiento en Línea</h4>
            <p>Ve fotos, estado y cobros desde tu cuenta en VBOX.</p>
          </div>
        </div>
      </section>

      {/* Sección Tarifas */}
      <section id="tarifas" className="bg-gray-100 py-16 px-4">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">Tarifas de Envío</h3>
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-4"><strong>Aéreo:</strong> L350 (0–2 lb) / $5.50 x lb (3+ lb)</p>
          <p className="mb-4"><strong>Marítimo:</strong> L350 (0–3 lb) / $2.70 x lb (4+ lb)</p>
          <p><strong>Entrega:</strong> San Pedro Sula y Tegucigalpa en oficina, resto del país envío adicional.</p>
        </div>
      </section>

      {/* Sección Nosotros */}
      <section id="nosotros" className="max-w-6xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">¿Quiénes Somos?</h3>
        <p className="text-center max-w-3xl mx-auto mb-6">
          En VBOX nos especializamos en logística internacional para Honduras. Nuestra misión es que tus compras lleguen seguras, rápidas y a bajo costo. Nuestra visión es ser la empresa líder de casilleros en el país.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-6">
        <p>© {new Date().getFullYear()} VBOX Honduras. Todos los derechos reservados.</p>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/50431656247"
        target="_blank"
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600"
      >
        💬 WhatsApp
      </a>
    </div>
  );
}
