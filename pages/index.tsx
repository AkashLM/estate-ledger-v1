import HomeListings from "../components/HomeListings";
import Hero from "../components/Hero";
import MarketPlace from "../components/MarketPlace";
import { useWallet } from "@meshsdk/react";
import GlowingBlob from "../components/Glowingblob";
import Maps from "../components/Maps";
import CommunityBoard from "../components/CommunityBoard";

export default function Home() {
  const { connected } = useWallet();

  return (
    <>
      <div className="z-10 relative" style={{marginBottom:"100px", height:"auto"}}>
        {/* User Routes */}
        <Hero />
        <Maps />
        {connected ? <MarketPlace /> : <></>}
        {/* Land Owner Routes */}
        <HomeListings />
        {/* Community Routes */}
        <CommunityBoard />
      </div>

      <GlowingBlob />
    </>
  );
}
