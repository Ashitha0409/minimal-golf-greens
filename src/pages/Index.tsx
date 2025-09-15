import { MinigolfScene } from "@/components/minigolf/MinigolfScene";

const Index = () => {
  return (
    <div className="w-full h-screen">
      <MinigolfScene />
      
      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            Minigolf Scene
          </h1>
          <p className="text-muted-foreground text-sm">
            Drag to rotate • Scroll to zoom • Right-click to pan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
