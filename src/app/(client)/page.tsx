"use client";
import { Hero } from "@/components/hero";
import WhoWinCard from "@/components/WhoWinCard";
import { db } from "@/firebase";
import { Selection } from "@/interface/selection";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [selections, setSelections] = useState<{
    male: Selection[];
    female: Selection[];
  }>({ male: [], female: [] });
  const [loading, setLoading] = useState(false);

  const getRealTimeData = useCallback(() => {
    setLoading(true);
    const maleQuery = query(
      collection(db, "selections"),
      where("gender", "==", "male")
    );
    const unsubscribeMale = onSnapshot(
      maleQuery,
      (snapshot) => {
        const male: Selection[] = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as Selection)
        );
        setSelections((prev) => ({ ...prev, male }));
      },
      (error) => {
        console.error("Error fetching male data: ", error);
      }
    );

    const femaleQuery = query(
      collection(db, "selections"),
      where("gender", "==", "female")
    );
    const unsubscribeFemale = onSnapshot(
      femaleQuery,
      (snapshot) => {
        const female: Selection[] = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as Selection)
        );
        setSelections((prev) => ({ ...prev, female }));
      },
      (error) => {
        console.error("Error fetching female data: ", error);
      }
    );

    setLoading(false);

    return () => {
      unsubscribeMale();
      unsubscribeFemale();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getRealTimeData();
    return () => unsubscribe(); // Cleanup on unmount
  }, [getRealTimeData]);

  const king = selections.male.find((s) => s.isKing);
  const queen = selections.female.find((s) => s.isQueen);
  const popular = selections.male.find((s) => s.isPopular);
  const innocent = selections.female.find((s) => s.isInnocent);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      
      {/* Results Section */}
      <section className="relative py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        
        <div className="relative container mx-auto px-4 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl lg:text-6xl font-bold gradient-text mb-6">
              Election Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Voting results will be announced here in real-time after the election concludes.
            </p>
          </div>
          
          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
            <div className="slide-up mt-10" style={{ animationDelay: '0.1s' }}>
              <WhoWinCard
                iconh={60}
                iconw={70}
                title="KING"
                crownSrc="/images/king-crown.png"
                person={king}
                loading={loading}
                selections={selections.male}
              />
            </div>
            
            <div className="slide-up mt-10" style={{ animationDelay: '0.2s' }}>
              <WhoWinCard
                iconh={100}
                iconw={100}
                title="QUEEN"
                crownSrc="/images/crown-normal-queen.png"
                person={queen}
                loading={loading}
                selections={selections.female}
              />
            </div>
            
            <div className="slide-up mt-10" style={{ animationDelay: '0.3s' }}>
              <WhoWinCard
                iconh={80}
                iconw={80}
                title="POPULAR"
                crownSrc="/images/star.png"
                person={popular}
                loading={loading}
                selections={selections.male}
              />
            </div>
            
            <div className="slide-up mt-10" style={{ animationDelay: '0.4s' }}>
              <WhoWinCard
                iconh={60}
                iconw={60}
                title="INNOCENT"
                crownSrc="/images/innocent.png"
                person={innocent}
                loading={loading}
                selections={selections.female}
              />
            </div>
          </div>
          
          {/* Stats section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 fade-in">
            <div className="text-center glass-card p-6 rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">
                {selections.male.length + selections.female.length}
              </div>
              <div className="text-muted-foreground">Total Candidates</div>
            </div>
            <div className="text-center glass-card p-6 rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">4</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="text-center glass-card p-6 rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-muted-foreground">Transparency</div>
            </div>
            <div className="text-center glass-card p-6 rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <div className="text-muted-foreground">Trust</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
