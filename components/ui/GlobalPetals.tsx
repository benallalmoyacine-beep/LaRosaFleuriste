"use client";

import PetalAnimation from "./PetalAnimation";

export default function GlobalPetals() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <PetalAnimation count={16} />
    </div>
  );
}
