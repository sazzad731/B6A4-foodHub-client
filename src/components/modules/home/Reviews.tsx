export default function Reviews() {
  
  const reviews = [
    {
      id: "r1",
      customerId: "c1",
      customerName: "Rashed Ahmed",
      mealId: "3",
      mealName: "Premium Salmon Roll",
      rating: 5,
      comment:
        "The food arrived hot and exactly as described. The salmon sushi was absolutely divine — will definitely reorder from Sakura Restaurant.",
      createdAt: "2025-01-18T16:00:00Z",
    },
    {
      id: "r2",
      customerId: "c2",
      customerName: "Sabrina Mirza",
      mealId: "2",
      mealName: "Double Smash Burger",
      rating: 5,
      comment:
        "Finally a food app that actually shows real estimated times! My burger arrived in 22 minutes. The smash burger is next level.",
      createdAt: "2025-01-17T14:00:00Z",
    },
    {
      id: "r3",
      customerId: "c3",
      customerName: "Karim Hossain",
      mealId: "1",
      mealName: "Wood-fired Margherita",
      rating: 4,
      comment:
        "As a provider, the dashboard is brilliant. I can manage my menu and update order statuses instantly. My sales have increased 3× since joining.",
      createdAt: "2025-01-16T10:00:00Z",
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-0 py-20 bg-white">
      <div className="mb-10">
        <span className="block text-[11px] font-bold tracking-[2px] uppercase text-fh-coral mb-2.5">Happy Customers</span>
        <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight">
          What people are <em className="font-light text-fh-green-muted">saying</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-fh-cream rounded-2xl border-[1.5px] border-fh-cream-dark p-7 hover:-translate-y-1 hover:shadow-xl transition-all">
            <div className="flex gap-0.5 mb-4 text-fh-amber text-base">{"★".repeat(review.rating)}</div>
            <p className="font-display italic text-[15px] text-fh-green-muted leading-relaxed mb-6 font-light">&ldquo;{review.comment}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-fh-green-soft flex items-center justify-center text-sm font-bold text-white">{review.customerName.split(" ").map(n=>n[0]).join("")}</div>
              <div>
                <p className="text-sm font-semibold text-fh-green-deep">{review.customerName}</p>
                <p className="text-xs text-fh-green-light">Customer · Chattogram</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
