export default function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${isVeg ? "border-success" : "border-primary"}`}>
      <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-success" : "bg-primary"}`} />
    </div>
  );
}
