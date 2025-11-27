const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      {/* CAMBIO: Borde naranja (border-orange-500) */}
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
