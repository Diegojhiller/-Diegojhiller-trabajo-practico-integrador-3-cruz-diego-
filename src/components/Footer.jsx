const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-6 mt-auto border-t border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Trabajo Práctico Integrador III
        </p>
        <p className="text-xs text-orange-500 mt-2 font-semibold">
          Desarrollado por: Diego Jota
        </p>
      </div>
    </footer>
  );
};

export default Footer;
